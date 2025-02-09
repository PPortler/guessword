const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
}, {
    collaction: "user"
})

module.exports = mongoose.model("Users", userSchema)