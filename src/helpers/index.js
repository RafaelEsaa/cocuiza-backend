const validateRol = (roles = [], user = "") => {
    const result = roles.indexOf(user);
    if(result !== -1) {
        //Encontro el rol
        return true;
    }
    //No encontro el rol
    return false;
};

module.exports = {
    validateRol,
};