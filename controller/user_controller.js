const userProvider = require('../provider/user_provider');
const db = require('../config/database')


module.exports = async (req, res) => {
    const user = await userProvider.create(req.body, res)
    const result = await db.User.create(user)
    res.json(result);
}