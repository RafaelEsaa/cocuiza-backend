const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassRoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const ClassRoom = mongoose.model("ClassRoom", ClassRoomSchema);
module.exports = ClassRoom;
