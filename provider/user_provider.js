const md5 = require('md5');

const create = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.name && !body.userName && !body.email && !body.password && !body.confirm_password) {
            reject(new Error('All fields are required'))
        } else if (!body.name) {
            reject(new Error('name is required'))
        } else if (!body.userName) {
            reject(new Error('username is required'))
        } else if (!body.email) {
            reject(new Error('email is required'))
        } else if (!body.password) {
            reject(new Error('password is required'))
        } else if (!body.confirm_password) {
            reject(new Error('confirm password is required'))
        } else {
            let password = md5(body.password);
            resolve(...body, ...{ password });
        }
    })
}

module.exports = { create }