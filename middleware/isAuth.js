const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]

    if (token) {
        req.user = jwt.verify(token, 'supersecretlol')
        next()
    } else {
        throw new Error('Not authorized!')
    }
}