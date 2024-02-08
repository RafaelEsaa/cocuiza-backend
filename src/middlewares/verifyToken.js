const jwt = require("jsonwebtoken");
const config = require("../config");
const { SECRET } = config.JWT;

const verifyToken = (req, res, next) => {
    const getToken = req.headers.authorization;
    
    if(getToken) {
        try {
            const decoded = jwt.verify(getToken, SECRET);
            req.user = decoded;
            next();
            return;
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: "TOKEN_INVALID",
                data: "Token invalid"
            });
        }
    }

    return res.status(401).json({
        success: false,
        error: "TOKEN_REQUIRED",
        data: "Token required"
    });
};

module.exports = {
    verifyToken
};