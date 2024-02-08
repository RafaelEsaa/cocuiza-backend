const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    mount: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    yearSchool: {
        ref: "YearSchool",
        type: Schema.Types.ObjectId,
        required: true,
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

const Salary = mongoose.model("Salary", SalarySchema);
module.exports = Salary;
