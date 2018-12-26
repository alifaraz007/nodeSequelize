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

//route to delete user data
router.put('/delete', uservalidation, userController.remove)

//route to return list of users
router.get('/list/:page/:count', userController.list)

//route to create user profile
router.post('/profile', uservalidation, userController.profile)

module.exports = router;