const userProvider = require('../provider/user_provider');
const db = require('../config/database')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const user = await userProvider.create(req, res)
        const result = await db.User.create(user)
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}

const login = async (req, res) => {
    try {
        const user = await userProvider.log(req, res)
        const result = await db.User.findOne({
            where: { email: user.email, password: user.password }
        })
        if (!result) {
            res.json('entered wrong email or password');
        } else {
            let token = jwt.sign({ token: result.id }, 'secret_key', { expiresIn: 60 * 60 })
            res.json({ status: 1, token: token, })
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    register,
    login
}