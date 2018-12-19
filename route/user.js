const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller')

//router for registration
router.post('/register', userController.register);

//route for login
router.post('/login', userController.login);

module.exports = router;