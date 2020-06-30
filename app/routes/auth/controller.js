const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const User = require('../../models/user');
const constants = require('../../../constants/index');

const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(constants.STATUS.BadValidation).json(constants.BAD_EMAIL);
    if (!password) return res.status(constants.STATUS.BadValidation).json(constants.PASSWORD_NOT_CORRECT);

    const user = await new User().getByEmail(email);
    if (!user) return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
    const userData = {
        id: user.id,
        email: user.email
    }

    const isValid = await new User().checkPassword(password, user.password);
    if (isValid){
        jwt.sign({userData}, config.jwt.secretKey,(err,token)=> {
            res.json({
                token
            })
        });
    }else{
        res.status(constants.STATUS.BadValidation).json(constants.PASSWORD_NOT_CORRECT);
    }
    
}

const singUp = async (req, res) => {
   const userData = req.body;

   try {
        const findOne = await new User().getByEmail(userData.email);
        if (findOne) return res.status(constants.STATUS.BadValidation).json(constants.USER_EXIST);
        const user = await new User().createUser(userData);
        return res.status(constants.STATUS.Ok).json(user);
   } catch (err) {
        return res.status(constants.STATUS.BadValidation).json(err.message);
   }
}

module.exports = {
     logIn,
     singUp
}