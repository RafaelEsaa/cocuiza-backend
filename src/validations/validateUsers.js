const { check } = require("express-validator");
const { userExist } = require("../helpers/dbValidations");

const registerUser = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("El email es requerido")
        .isEmail()
        .withMessage("El email no es válido"),
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

const getUserById = [
    check("id").isMongoId().withMessage("No es un id valido"),
    // valida que exista el id en User
    check("id").custom(async (value) => userExist(value))
];

const updateUser = [
    check("id").isMongoId().withMessage("No es un id valido"),
    // valida que exista el id en User
    check("id").custom(async (value) => userExist(value)),
    check("firstName").isString().withMessage("firstName es requerido"),
    check("lastName").isString().withMessage("lastName es requerido"),
    check("address").isString().withMessage("address es requerido"),
    check("phone").isString().withMessage("phone es requerido"),
    check("rolId").isArray().withMessage("No es un array con los id del rol"),
];

module.exports = {
    registerUser,
    getUserById,
    updateUser,
};
