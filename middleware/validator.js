const { check, validationResult } = require('express-validator/check');

const regvalidation = [check('name', 'name is require').not().isEmpty(),
check('userName', 'username is require').not().isEmpty(),
check('email', 'email is require').not().isEmpty(),
check('email', 'email should be in format').isEmail(),
check('password', 'password is require').not().isEmpty(),
check('confirm_password', 'confirm password is require').not().isEmpty()]

module.exports = regvalidation;