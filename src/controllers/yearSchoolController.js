const YearSchools = require("../models/YearSchool");

const getAllYearSchools = async (req, res) => {
    const {limit = 10, page = 1} = req.query;

    const [yearSchools, total] = await Promise.all([
        YearSchools.find().limit(Number(limit)).skip((Number(page) - 1) * limit),
        YearSchools.countDocuments()
    ]);

    res.json({
        yearSchools,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
    });
};

const createYearSchool = async (req, res) => {
    res.json({
        msg: "registar nuevo año escolar"
    });
};

module.exports = {
    getAllYearSchools,
    createYearSchool,
};