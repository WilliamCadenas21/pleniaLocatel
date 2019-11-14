const User = require('../models/user.model')

async function getUser(username) {
    return await User.findOne({user: username});
}

module.exports = {getUser};