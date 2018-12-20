const md5 = require('md5');


const create = (req, res) => {
    if (req.body.confirm_password != req.body.password) {
        res.status(400).json('confirm password should be same')
    } else {
        let password = md5(req.body.password);
        return (Object.assign(req.body, { password }))
    }
}

module.exports = { create }