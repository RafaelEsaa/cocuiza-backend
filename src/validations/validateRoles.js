const {check} = require("express-validator");

const getRolById = [
    check("id")
        .isMongoId()
        .withMessage("No es un id valido")
];

const registerRole = [
    check("name").not().isEmpty().withMessage("Campo nombre es requerido"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("Campo nombre es requerido"),
];

module.exports = {
    getRolById,
    registerRole,
};