function authorizate(roles = []) {

    if(typeof roles == "string") {
        roles = [roles];
    }

    return [
        (req, res, next) => {

            const rolesInUser = req.user.roles;
            const result = roles.filter(rol => {
                const x = rolesInUser.indexOf(rol);
                if(x !== -1) {
                    return rol;
                }
            });

            if(!result.length) return res.status(403).send({
                error: true,
                message: "You do not have the privileges"
            });
            next();
        }
    ];
}

module.exports = {
    authorizate
};