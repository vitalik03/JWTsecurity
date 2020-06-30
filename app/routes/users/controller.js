const User = require('../../models/user');
const constants = require('../../../constants/index');

const getAllUsers = async (req, res) => {
    const findAll = await new User().getAllUsers();
    return res.status(constants.STATUS.Ok).json(findAll);
}

const createUser = async (req, res) => {
    const userData = req.body;
    const user = await new User().createUser(userData);
    return res.status(constants.STATUS.Ok).json(user);
}

const deleteUser = async (req, res) => {
    const userFromToken = req.user;
    const id = req.params.id;
    if(id.toString() !== userFromToken.userData.id) return res.status(constants.STATUS.NotAllowed).json(constants.NOT_ALLOW);
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
        await new User().deleteUserById(id)
            .then(result => res.status(constants.STATUS.Ok).json(constants.SUCCESS))
            .catch(err => res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND))
}

const getOneUser = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
    const findOne = await new User().getOneUser(id);
    if (findOne) return res.status(constants.STATUS.Ok).json(findOne); 
    return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
}

const updateUser = async (req, res) => {
    const userFromToken = req.user;
    const user = req.body;
    const id = req.params.id;
    console.log(id.toString(), userFromToken.userData.id)
    if(id.toString() !== userFromToken.userData.id) return res.status(constants.STATUS.NotAllowed).json(constants.NOT_ALLOW);
        await new User().updateUser(id,user)
            .then(result => res.status(constants.STATUS.Ok).json(constants.SUCCESS))
            .catch(err => res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND))
}

module.exports = {
    getAllUsers,
    createUser,
    getOneUser,
    deleteUser,
    updateUser
}