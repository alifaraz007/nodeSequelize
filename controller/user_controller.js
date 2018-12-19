const userProvider = require('../provider/user_provider');
const db = require('../config/database')


const register = async (req, res) => {
    const user = await userProvider.create(req.body, res)
    if (user) {
        await db.User.create(user)
        return res.json('new data inserted');
    }
}

module.exports = register;