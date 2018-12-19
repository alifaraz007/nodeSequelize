const md5 = require('md5');

//provider for registration
const create = (body, res) => {
    if (!body.name && !body.userName && !body.email && !body.password && !body.confirm_password) {
        (res.status(400).json('All fields are required'))
    } else if (!body.name) {
        (res.status(400).json('name is required'))
    } else if (!body.userName) {
        (res.status(400).json('username is required'))
    } else if (!body.email) {
        (res.status(400).json('email is required'))
    } else if (!body.password) {
        (res.status(400).json('password is required'))
    } else if (!body.confirm_password) {
        (res.status(400).json('confirm password is required'))
    } else {
        let password = md5(body.password);
        return (Object.assign(body, { password }))
    }
}

//provider for login
const log = (body, res) => {
    if (!body.email && !body.password) {
        res.status(400).json('all fields are required')
    } else if (!body.email) {
        res.status(400).json('email is required')
    } else if (!body.password) {
        res.status(400).json('password is required')
    } else {
        let password = md5(body.password);
        return (Object.assign(body, { password }))
    }
}

module.exports = {
    create,
    log
}