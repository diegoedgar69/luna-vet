const { model, Schema } = require("mongoose");

const newUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    } 
},{
    versionKey: false
})

module.exports = model("user", newUserSchema)