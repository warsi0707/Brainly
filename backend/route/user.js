const express = require("express")
const userRouter = express.Router()
const  bcrypt = require("bcrypt");
const { User, Content } = require("../model/db");
const jwt = require("jsonwebtoken");
const { Auth } = require("../middleware/authMidleware");
const { InputMiddle } = require("../middleware/InputMiddle");
const { UserSchema } = require("../model/schema");


userRouter.post("/signup", async(req, res) =>{
    const {username, password} = req.body;
    try{
        if(username.length < 3 | password<3){
            return res.status(403).json({
                message: "Username or password atleast 3 char"
            })
        }
        const existingUser = await User.findOne({
            username
        })
        if(existingUser){
            return res.status(403).json({
                message : "User already registerd"
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({
            username: username,
            password: hashPassword
        })
        res.status(200).json({
            message: "Signup success"
        })
    }catch(error){
        res.status(500)
    }
    
})
userRouter.post("/signin",async(req, res) =>{
    const {username, password} = req.body;
    try{
        const findUser = await User.findOne({
            username
        })
        if(!findUser){
            return res.status(403).json({
                message: "User not found"
            })
        }
        const comparePass = await bcrypt.compare(password, findUser.password)
        if(comparePass){
            const token = jwt.sign({
                userId: findUser.id
            },process.env.USER_JWT_SECRETE)
            res.cookie("token", token,{
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
                secure:process.env.NODE_ENV==="Development"?false:true,
                
            })
            return res.status(200).json({
                message: "Login success",
                token: token
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
    
})
userRouter.get("/contents",  Auth, async(req, res)=>{
    const userId = req.user;
    try{
        const contents = await Content.find({userid: userId}).populate('userid', 'username')
        if(contents.length <= 0){
            return res.json({
                message: "No content",
                contents: []
            })
        }
        return res.json({
            contents: contents
        })
    }catch(error){
        res.json({
            message: error.message
        })
    }  
})
userRouter.get("/auth", Auth,async (req, res) =>{
    const userId = req.user;
    try{
        if(!userId){
            return res.status(500).json({
                authenticated: false
            })
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(500).json({
                authenticated: false
            })
        }
        return res.status(200).json({
            authenticated: true
        })
        
    }catch(e){
        res.status(500).json({
            authenticated: false
        })
    }
})
userRouter.post("/logout",Auth,(req, res) =>{
    res.clearCookie("token",{
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    })
    res.status(200).json({
        message: "Logout Success"
    })
})


module.exports = {
    userRouter
}