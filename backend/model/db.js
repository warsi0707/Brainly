const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String, unique: true, required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})
const contentSchema = new mongoose.Schema({
    link: String,
    type: {
        type: String,
        enum: ['TEXT', 'TWITTER', 'YOUTUBE', 'LINK', 'IMAGE'],
        default: 'TEXT',
        required: true
    } ,
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("User", userSchema)
const Content = mongoose.model("Content", contentSchema)


module.exports = {
    User,
    Content
}