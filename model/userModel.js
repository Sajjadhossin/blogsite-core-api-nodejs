const mongoose = require("mongoose")
const {Schema} = mongoose

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    emailVerify: {
        type: Boolean,
        default: false,
    }

})

module.exports = mongoose.model("User", userSchema);