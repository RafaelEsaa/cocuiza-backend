const UserModel = require("../models/User");
const RoleModel = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = async (req, res) => {
    const { email, cedula, firstName, lastName, address, phone, password, roles } = req.body;
    const data = {
        email,
        cedula,
        firstName,
        lastName,
        address,
        phone,
        roles
    };

    const user = new UserModel({
        ...data,
        password
        // No encriptar aqui, se encripta en el UserModel
        // password: bcrypt.hashSync(password, 10)
    });

    if(roles) {
        const role = await RoleModel.find({ name: {$in: roles} });
        user.roles = role.map(rol => rol._id);
    }

    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            id: savedUser._id,
            email: savedUser.email,
            roles: savedUser.roles
        }, config.JWT.SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            data: {
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email }).populate("roles");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if( !isMatch ) {    
            res.status(401).json({
                success: false,
                message: "Credentials error"
            });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            roles: user.roles.map(role => role.name)
        }, config.JWT.SECRET, { expiresIn: "1h" });

        res.setHeader("Authorization", token);
        res.status(200).json({
            success: true,
            data: {
                token,
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error to login user",
            error: error.message
        });
    }
};

module.exports = {
    signUp,
    signIn
};