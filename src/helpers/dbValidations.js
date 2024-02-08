const User = require("../models/User");

const userExist = async (id = "") => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
};

module.exports = { userExist };