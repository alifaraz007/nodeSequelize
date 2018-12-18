const userProvider = require('../provider/user_provider');
const baseController = require('./base_controller');

class UserController extends baseController {
    create(req, res) {
        userProvider.create(this._db.User, req.body, res)
            .then((user) => {
                this._db.User.create(user)
                    .then(() => console.log("hi"))
            })
    }
}

const controller = new UserController();
module.exports = controller