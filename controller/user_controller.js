const userProvider = require('../provider/user_provider');
const db = require('../config/database')
const jwt = require('jsonwebtoken')

//controller for registration
const register = async (req, res) => {
    const user = await userProvider.create(req.body, res)
    if (user) {
        await db.User.create(user)
        return res.json('new data inserted');
    }
}

//controller for login
const login = async (req, res) => {
    const user = await userProvider.log(req.body, res)
    if (user) {
        const result = await db.User.findOne({ where: { email: user.email, password: user.password } })
        if (!result) {
            res.json('wrong email or password');
        } else {
            let token = jwt.sign({ token: result.id }, 'secret_key', { expiresIn: 60 * 60 })
            res.json({ status: 1, token: token, })
        }
    }
}

module.exports = {
    register,
    login
}