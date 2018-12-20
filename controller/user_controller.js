const userProvider = require('../provider/user_provider');
const db = require('../config/database')
const { check, validationResult } = require('express-validator/check');


module.exports = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
    } else {
        const user = await userProvider.create(req, res)
        const result = await db.User.create(user)
        res.json(result);
    }
}