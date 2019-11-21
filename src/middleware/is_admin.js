const isAdmin = (req, res, next) => {
    if (req.user.type !== 'admin') {
        throw new Error ('Access denied.')
    }
    next()
}

module.exports = isAdmin