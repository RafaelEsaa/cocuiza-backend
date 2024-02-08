const UserModel = require("../models/User");
const RolModel = require("../models/Role");

const getAllUsers = async (req, res) => {
    const { page = 1, limit = 10, state = true} = req.query;
    try {
        const [users, total] = await Promise.all([
            UserModel.find({ state }).limit(Number(limit)).skip((Number(page) - 1) * limit),
            UserModel.countDocuments()
        ]);

        if (!users)
            res.status(404).json({
                error: true,
                message: "Users not found",
            });

        res.json({
            users,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id).populate("roles", {
            name: 1,
            description: 1
        });
        if(!user) {
            res.status(404).send({
                error: true,
                message: "User not found",
            });
        }

        res.status(200).send({
            error: false,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { firstName, lastName, address, phone, rolId } = req.body;
    const { id } = req.params;

    try {
        const roles = await RolModel.find({ _id: { $in: rolId }});
        
        if(!roles.length) {
            return res.status(404).json({ error: true, message: "Rol not found" });
        }

        const user = await UserModel.findByIdAndUpdate(id, {firstName, lastName, address, phone, roles}, { new: true });

        return res.json({
            error: false,
            user
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = UserModel.findByIdAndUpdate(id, { state: false }, { new: true });
    
    res.status(200).json({
        error: false,
        user
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
