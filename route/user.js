const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller')

//router for user registration
router.post('/register', userController.register);

//router for user login
router.post('/login', userController.login);

module.exports = router;