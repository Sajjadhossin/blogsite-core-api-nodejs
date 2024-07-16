const mongoose = require("mongoose")
const {Schema} = mongoose

let categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    

})

module.exports = mongoose.model("Category", categorySchema);