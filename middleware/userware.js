const jwt = require('jsonwebtoken')

const validation = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (token) {
        jwt.verify(token, 'secret_key', (err, doc) => {
            if (err) {
                res.status(400).json('not authorized');
            } else {
                req['data'] = doc
                next();
            }
        })
    } else {
        res.status(400).json('token is required')
    }
}

module.exports = validation;