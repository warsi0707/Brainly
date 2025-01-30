const mongoose = require("mongoose")
const { string } = require("zod")

const userSchema = new mongoose.Schema({
    username:{
        type: String, unique: true, required: true
    },
    password : String
})
const contentSchema = new mongoose.Schema({
    link: String,
    type: String ,
    title: {
        type: String, unique: true
    },
    createdAt: String,
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
})

const tagSchema = new mongoose.Schema({
    title: String
})
const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", userSchema)
const Content = mongoose.model("Content", contentSchema)
const Tags = mongoose.model("Tag", tagSchema)
const Link = mongoose.model("Link", linkSchema)


module.exports = {
    User,
    Content,
    Tags,
    Link
}