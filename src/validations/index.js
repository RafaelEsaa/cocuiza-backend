const validateUsers = require("./validateUsers");
const validateAuth = require("./validateAuth");
const validateRoles = require("./validateRoles");

module.exports = {
    ...validateUsers,
    ...validateAuth,
    ...validateRoles,
};