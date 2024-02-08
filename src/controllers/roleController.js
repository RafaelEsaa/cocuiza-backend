const Role = require("../models/Role");

const registerRole = async (req, res) => {
    try {
        const { name, description } = req.body;
    
        const role = new Role({
            name,
            description
        });
    
        await role.save();
    
        res.status(201).json({
            success: true,
            data: {
                role
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el rol",
            error: error.message
        });
    }
};

const getAllRoles = async (req, res) => {

    try {
        const roles = await Role.find();
        if(!roles) {
            res.status(404).json({
                error: true,
                message: "Dont exist roles"
            });
        }
        res.status(200).json({
            roles
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

const getRoleById = async (req, res) => {
    const { id } = req.params;

    const roles = await Role.findById(id);
    res.json({
        error: false, roles
    });
};

module.exports = {
    registerRole,
    getAllRoles,
    getRoleById,
};