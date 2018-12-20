const userProvider = require('../provider/user_provider');
const db = require('../config/database')


module.exports = async (req, res, next) => {
    (async () => {
        try {
            const user = await userProvider.create(req, res)
            const result = await db.User.create(user)
            res.json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    })();
}