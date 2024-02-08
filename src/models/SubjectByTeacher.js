const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectByTeacherSchema = new Schema({
    yearSchool: {
        ref: "YearSchool",
        type: Schema.Types.ObjectId,
        required: true,
    },
    subjectMatter: [
        {
            ref: "SchoolSubject",
            type: Schema.Types.ObjectId,
            required: true,
        },
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

const SubjectByTeacher = mongoose.model("SubjectByTeacher", SubjectByTeacherSchema);
module.exports = SubjectByTeacher;
