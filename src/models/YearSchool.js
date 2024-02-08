const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YearSchoolSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: Boolean,
        required: true,
        default: true,
    },
    paymentAmount: [
        {
            // monto de la mensualidad
            monthly_payment_amount: {
                type: Schema.Types.Decimal128,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    classRooms: [
        {
            classRoomId: {
                ref: "ClassRoom",
                type: Schema.Types.ObjectId,
                required: true,
            },
            schoolSubjectId: {
                ref: "SchoolSubject",
                type: Schema.Types.ObjectId,
                required: true,
            },
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

const YearSchool = mongoose.model("YearSchool", YearSchoolSchema);
module.exports = YearSchool;
