const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    payments: [
        {
            yearSchoolId: {
                ref: "YearSchool",
                type: Schema.Types.ObjectId,
                required: true,
            },
            detail: [
                {
                    month: {
                        type: String,
                        required: true,
                    },
                    amount: {
                        type: Schema.Types.Decimal128,
                        required: true,
                    },
                    paymentNumber: {
                        type: Number,
                        required: true,
                    },
                    paymentDate: {
                        type: Date,
                        required: true,
                        default: Date.now(),
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

const Payment = mongoose.model(
    "Payment",
    PaymentSchema,
);
module.exports = Payment;
