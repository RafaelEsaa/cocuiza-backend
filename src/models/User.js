const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    cedula: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true,
    },
    roles: [
        {
            ref: "Role",
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
    yearsAcademy: [
        {
            ref: "YearSchool",
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
    // Donde esta actualmente el estudiante,
    // No es requerido, porque al registar un profesor no debo registar este campo
    currentClassroomId: {
        ref: "ClassRoom",
        type: Schema.Types.ObjectId,
        // required: true,
    },
    classRoomsId: [
        {
            ref: "ClassRoom",
            type: Schema.Types.ObjectId,
            // required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        const salt = bcryptjs.genSaltSync(10);
        this.password = bcryptjs.hashSync(this.password, salt);
    }
    next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.password) {
        const salt = bcryptjs.genSaltSync(10);
        this._update.password = bcryptjs.hashSync(this._update.password, salt);
    }
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;