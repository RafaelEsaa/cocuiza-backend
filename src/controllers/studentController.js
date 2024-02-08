const { validateRol } = require("../helpers");
const User = require("../models/User");
const Role = require("../models/Role");

const getAllStudents = async (req, res) => {
    const {page = 1, limit = 10, state = true} = req.query;

    const [students, total] = await Promise.all([
        // busca User donde los roles no sean vacios
        // $ne = no equal = no sea igual
        User.find({ roles: { $ne: [] }, state })
            .skip(Number(page - 1) * 10)
            .limit(Number(limit))
            .populate({
                path: "roles",
                match: {
                    name: { $eq: "Student" },
                },
                select: {
                    _id: 0,
                    name: 1,
                },
            }),
        User.countDocuments(),
    ]);

    if(!students.length) {
        res.status(404).json({
            error: true,
            message: "Students not found"
        });
    }

    res.status(200).json({
        students,
        totalPages: Math.ceil(total/limit),
        currentPage: page,
        total
    });
};

const getStudentById = async (req, res) => {
    const { id } = req.params;
    const { state = true } = req.query;

    try {
        const student = await User.findOne({_id: id, state }).populate({ path: "roles", match: { name: { $eq: "Student" }}}).lean();

        if(!student) {
            return res.status(404).json({
                error: true,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { state = true } = req.params;
    const { email, cedula, firstName, lastName, address, phone, avatar, roles } = req.body;
    const rolesUser = req.user.roles;

    const trueOrFalse = validateRol(rolesUser, "Admin");

    try {
        if (trueOrFalse) {
            //Es admin
            const userUpdated = await User.findOneAndUpdate(
                { _id: id, state },
                {
                    email,
                    cedula,
                    firstName,
                    lastName,
                    address,
                    phone,
                    roles,
                    avatar,
                },
                { new: true },
            );

            if (!userUpdated) {
                return res.status(404).json({
                    error: true,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                sucess: true,
                userUpdated,
            });
        }

        //Es estudiante || Directivo el rol que esta usando el endpoint
        const userUpdated = await User.findOneAndUpdate(
            { _id: id, state },
            {
                firstName,
                lastName,
                address,
                phone,
                roles,
            },
            { new: true },
        );

        if (!userUpdated) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        return res.status(200).json({
            sucess: true,
            userUpdated,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

};

const getStudentsByClassroom = async (req, res) => {
    const { classroomId } = req.params;
    const { state = true } = req.query;

    const {_id: studentRolId} = await Role.findOne({ name: "Student" });

    const studentByClassroom = await User.find(
        //campo roles != [] y en roles exista el id de student
        { $and: [{ roles: {$ne: []}}, {roles: {$in: studentRolId}} ], state} ,
        ["cedula", "firstName", "lastName", "address", "phone", "avatar"],
    )
        //Salon actualmente cursando
        .populate({
            path: "currentClassroomId",
            select: {
                _id: 1,
                name: 1,
                section: 1,
            },
        })
        //Salones que ha cursado
        .populate({
            path: "classRoomsId",
            match: {
                _id: { $in: classroomId },
            },
            select: {
                _id: 1,
                name: 1,
                section: 1,
            },
        });

    if(!studentByClassroom.length) { // No hay alumnos en ese salon
        return res.status(404).json({
            error: true,
            message: `Students not found in classroom ${classroomId}`
        });
    }

    res.status(200).json({
        studentByClassroom
    });
};

// const getStudentBySchoolsubject = async (req, res) => {};

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudent,
    getStudentsByClassroom,
    // getStudentBySchoolsubject,
};