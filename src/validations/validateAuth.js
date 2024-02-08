const { body, check } = require("express-validator");

const loginUser = [
    body("email")
        .not()
        .isEmpty()
        .withMessage("El email es requerido")
        .isEmail()
        .withMessage("El email no es válido"),
    check("password").not().isEmpty().withMessage("La contraseña es requerida"),
];

module.exports = {
    loginUser,
};
