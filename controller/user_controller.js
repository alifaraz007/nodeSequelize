const userProvider = require('../provider/user_provider');
const db = require('../config/database')


module.exports = async (req, res) => {
    const user = await userProvider.create(req.body, res)
    if (user) {
        await db.User.create(user)
        res.json('created');

    } else {
        console.log('*************')
    }

}