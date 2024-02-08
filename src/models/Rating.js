//Notas escolares por materia y grado
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    yearSchoolId: {
        ref: "YearSchool",
        type: Schema.Types.ObjectId,
        required: true,
    },
    ratings: [
        {
            detail: [
                {
                    note: {
                        type: Number,
                        required: true,
                    },
                    schoolSubjectId: {
                        ref: "SchoolSubject",
                        type: Schema.Types.ObjectId,
                        required: true,
                    },
                    nameSchoolSubject: {
                        type: String,
                        required: true,
                    },
                    //lapso de la nota
                    period: {
                        type: Number,
                        required: true,
                    },
                    //Nota average de la cantidad que se tenga al momento (3 lapsos total)
                    averageNote: {
                        type: Number,
                        required: true,
                    },
                },
            ],
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

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
