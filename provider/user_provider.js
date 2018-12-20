const md5 = require('md5');

//provider for register
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

//provider for login
const login = (req, res) => {
    return new Promise((resolve, reject) => {
        req.checkBody('password', 'password is required.').notEmpty()
        req.checkBody('email', 'email is required.').notEmpty()
        req.checkBody('email', 'email should be correct.').isEmail()

        const errors = req.validationErrors()
        if (errors) {
            reject(errors)
        } else {
            let password = md5(req.body.password);
            resolve(Object.assign(req.body, { password }))
        }
    })
}

module.exports = {
    create,
    login
}