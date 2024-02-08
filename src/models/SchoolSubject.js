const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    classRoomsId: [
        {
            ref: "ClassRoom",
            type: Schema.Types.ObjectId,
        },
    ],
    state: {
        type: Boolean,
        default: true
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

const SchoolSubject = mongoose.model("SchoolSubject", SchoolSubjectSchema);
module.exports = SchoolSubject;
