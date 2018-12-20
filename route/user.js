const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller')
const validation = require('../middleware/validator');

router.post('/register', validation, userController);


module.exports = router;