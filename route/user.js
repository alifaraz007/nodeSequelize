const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const { check, validationResult } = require("express-validator/check");
const md5 = require('md5')
const userController = require('../controller/user_controller')

router.post('/register', userController.create);


module.exports = router;