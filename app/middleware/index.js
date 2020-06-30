const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const constants = require('../../constants/index');

const check = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) return res.status(constants.STATUS.Unauthorized).json(constants.UNAUTHORIZED);
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, config.jwt.secretKey);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403);
        }
    }
    const user = jwt.decode(token, config.jwt.secretKey);
    req.user = user;
    next();
}

module.exports = {
    check
};