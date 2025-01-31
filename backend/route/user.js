const express = require("express")
const userRouter = express.Router()
const  bcrypt = require("bcrypt");
const { User } = require("../model/db");
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
userRouter.get("/auth-check", Auth, (req, res) =>{
    const token = req.cookies.token
    try{
        if(!token){
            return res.status(500).json({
                isLogin: false
            })
        }
        return res.status(200).json({
            isLogin: true
        })
        
    }catch(e){
        res.status(500).json({
            isLogin: false
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