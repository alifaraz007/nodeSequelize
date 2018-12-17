const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const { check, validationResult } = require("express-validator/check");
const md5 = require('md5')

router.post('/register', [
    check('name', 'name is required').not().isEmpty(),
    check('userName', 'userName is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('email', 'should be a email').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('confirm_password', 'confirm password is required').not().isEmpty(),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
        if (req.body.password == req.body.confirm_password) {
            const result = await User.findOne({ where: { userName: req.body.userName } })
            if (result) {
                res.status(400).json('user name already existed')
            } else {
                const response = await User.findOne({ where: { email: req.body.email } })
                if (response) {
                    res.status(400).json('email already existed')
                } else {
                    const data = await User.create({
                        name: req.body.name,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: md5(req.body.password)
                    });
                    res.json('new data inserted')
                }
            }
        } else {
            res.status(400).json('password is not matched');
        }
    }
})

router.post('/login', [
    check('userName', 'username is reguired').not().isEmpty(),
    check('password', 'password is reguired').not().isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
        const result = await User.findOne({where: {userName: req.body.userName}})
        if(result.password == md5(req.body.password)){
            res.json(result.id);
        }else{
            res.status(500).json('password or username is not correct')
        }
    }
})

module.exports = router;