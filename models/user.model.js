const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user: String,
    pass: String,
    type: String,
    id: String
})

module.exports = mongoose.model('User', UserSchema)