const express = require('express');
const middleware = require('../../middleware/index');

const authController = require('../auth/controller'); 

const router = express.Router();

router
    .post('/login', authController.logIn)
    .post('/signup', authController.singUp)

    
module.exports = router;