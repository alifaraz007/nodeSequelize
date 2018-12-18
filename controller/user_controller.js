const userProvider = require('../provider/user_provider');
const baseController = require('./base_controller');

class UserController extends baseController {
    async create(req, res) {
        const user = await userProvider.create(this._db.User, req.body, res)
        const result = await this._db.User.create(user)
        res.json('created')
    }
}

const controller = new UserController();
module.exports = controller