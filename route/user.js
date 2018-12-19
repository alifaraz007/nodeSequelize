const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller')
const uservalidation = require('../middleware/userware')

//router for registration
router.post('/register', userController.register);

//route for login
router.post('/login', userController.login);

//route to get user data
router.get('/get', uservalidation, userController.get)

module.exports = router;