const ClassRoom = require("../models/ClassRoom");

const createClassroom = async (req, res) => {
    const { name, section } = req.body;

    try {
        const newClassroom = new ClassRoom({
            name,
            section
        });

        const dataSaved = await newClassroom.save();

        res.status(200).json({
            success: true,
            classRoom: dataSaved
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
};

const getAllClassroom = async (req, res) => {
    const allClassroom = await ClassRoom.find();

    if(!allClassroom) {
        res.status(404).json({
            error: true,
            message: "Not found classrooms"
        });
    }

    res.json({
        success: true,
        allClassroom
    });
};

const updateClassroom = async (req, res) => {
    const { id } = req.params;
    const { name, section } = req.body;

    try {
        const classRoomUpdated = await ClassRoom.findOneAndUpdate(id, {
            name, section
        }, { new: true });

        if(!classRoomUpdated) {
            res.status(404).json({
                error: true,
                message: "Classroom not found"
            });
        }

        res.status(200).json({
            success: true,
            classRoomUpdated
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
    createClassroom,
    getAllClassroom,
    updateClassroom,
};