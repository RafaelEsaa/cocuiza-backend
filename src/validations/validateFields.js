const { body, check } = require("express-validator");

const registerUser = [
    check("email").not().isEmpty().withMessage("El email es requerido").isEmail().withMessage("El email no es válido"),
    check("cedula").not().isEmpty().withMessage("La cedula es requerido"),
    check("firstName").not().isEmpty().withMessage("El nombre es requerido"),
    check("lastName").not().isEmpty().withMessage("El apellido es requerido"),
    check("password").not().isEmpty().withMessage("La contraseña es requerida"),
    check("password").custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
];

const loginUser = [
    body("email").not().isEmpty().withMessage("El email es requerido").isEmail().withMessage("El email no es válido"),
    check("password").not().isEmpty().withMessage("La contraseña es requerida")
];

module.exports = {
    registerUser,
    loginUser
};