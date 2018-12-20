const md5 = require('md5');

const create = (req, res, next) => {
    return new Promise((resolve, reject) => {
        req.checkBody('name', 'name is required.').notEmpty()
        req.checkBody('userName', 'user name is required.').notEmpty()
        req.checkBody('email', 'email is required.').notEmpty()
        req.checkBody('email', 'email should be correct.').isEmail()
        req.checkBody('password', 'password is required.').notEmpty()
        req.checkBody('confirm_password', 'confirm_password is required.').notEmpty()

        const errors = req.validationErrors()
        if (errors) {
            reject(errors)
        } else if (req.body.confirm_password != req.body.password) {
            reject('confirm password should be same')
        } else {
            let password = md5(req.body.password);
            resolve(Object.assign(req.body, { password }))
        }
    })
}

module.exports = { create }