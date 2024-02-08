const SchoolSubject = require("../models/SchoolSubject");
const ClassRoom = require("../models/ClassRoom");

const getAllSchoolSubject = async (req, res) => {
    try {
        const schoolSubjects = await SchoolSubject.find();
        if(!schoolSubjects) {
            res.status(404).json({
                error: true,
                message: "SchoolSubjects not found"
            });
        }

        res.status(200).json({
            success: true,
            schoolSubjects
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
};

const createSchooSubject = async (req, res) => {
    const { name, classRoomsId } = req.body;

    try {
        const findClassRoomId = await ClassRoom.find({_id: { $in: classRoomsId }});

        if(!findClassRoomId.length) {
            res.json(404).json({
                error: true,
                message: "classRoomsId not found"
            });
        }

        const newSchoolSubject = new SchoolSubject({
            name, classRoomsId
        });
    
        const dataSaved = await newSchoolSubject.save();
    
        res.json({
            success: true,
            dataSaved,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

const updateSchoolSubject = async (req, res) => {
    const { id } = req.params;
    const { name, classRoomsId } = req. body;

    //TODO: validar que existe el classRoomsId para actualizar
    //TODO: validar que existe el schoolsubject por el id para actualizar

    try {
        const updatedSchoolSubject = await SchoolSubject.findByIdAndUpdate(id, {
            name,
            classRoomsId
        }, {new: true});

        res.status(200).json({
            sucess: true,
            updatedSchoolSubject
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: true,
            message: "Server internal error"
        });
    }

};

const deleteSchoolSubject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSchoolSubject = await SchoolSubject.findByIdAndUpdate(id, { state: false }, { new: true });
        if(!deletedSchoolSubject) {
            res.staus(404).json({
                error: true,
                message: "Schoolsubject not found"
            });
        }
        res.status(200).json({
            sucess: true,
            deletedSchoolSubject
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllSchoolSubject,
    createSchooSubject,
    updateSchoolSubject,
    deleteSchoolSubject,
};