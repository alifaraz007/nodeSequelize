const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller')
const uservalidation = require('../middleware/userware')

//router for user registration
router.post('/register', userController.register);

//router for user login
router.post('/login', userController.login);

//route to get user data
router.get('/get', uservalidation, userController.get)

module.exports = router;