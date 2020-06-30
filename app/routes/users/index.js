const express = require('express');

const userController = require('./controller');
const middleware = require('../../middleware/index');

const router = express.Router();

router
  
    .get('/', userController.getAllUsers)

    .get('/:id', userController.getOneUser)

    .delete('/:id', middleware.check , userController.deleteUser)
    
    .put('/:id', middleware.check , userController.updateUser)

module.exports = router;