const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt");
const { User, Content } = require("../model/db");
const jwt = require("jsonwebtoken");
const { Auth } = require("../middleware/authMidleware");


userRouter.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
        if (!passwordRegex.test(password)) {
            return res.status(404).json({
                error: "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
            })
        }
        if (password.length < 8) {
            return res.status(404).json({
                error: "Password must 8 char or more"
            })
        }
        if (password !== confirmPassword) {
            return res.status(404).json({
                error: "Password and confirmPassword not matched"
            })
        }
        const existingUser = await User.findOne({
            username
        })
        if (existingUser) {
            return res.status(403).json({
                error: "User already registerd"
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        })
        res.status(200).json({
            message: "Signup success"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})
userRouter.post("/signin", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(404).json({
                error: "Password not matched"
            })
        }
        const findUser = await User.findOne({
            email
        })
        if (!findUser) {
            return res.status(403).json({
                message: "User not found"
            })
        }
        const comparePass = await bcrypt.compare(password, findUser.password)
        if (comparePass) {
            const token = jwt.sign({
                userId: findUser._id
            }, process.env.USER_JWT_SECRETE)
            // res.cookie("token", token,{
            //     maxAge: 7 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
            //     secure:process.env.NODE_ENV==="Development"?false:true,

            // })
            return res.status(200).json({
                message: "Login success",
                token: token
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})
userRouter.post("/content", Auth, async (req, res) => {
    const { link, type, title, description } = req.body;
    try {
        if (!title) {
            return res.status(500).json({
                error: "All input required"
            })
        }
        const newContent = await Content.create({
            link, type, title, userId: req.user, description
        })

        return res.status(200).json({
            message: "Content created!"
        })
    } catch (e) {
        res.status(500).json({
            error: "Error while adding content"
        })
    }

})
userRouter.get("/content", Auth, async (req, res) => {
    try {
        const contents = await Content.find({ userId: req.user }).populate('userId', 'username')
        if (contents.length <= 0) {
            return res.json({
                contents: []
            })
        }
        return res.json({
            contents: contents
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
userRouter.get("/content/:id", Auth, async (req, res) => {
    try {
        const content = await Content.findById({ _id: req.params })
        if (content) {
            return res.json({
                content: content
            })
        } else {
            return res.json({
                content: {},
                message: "No content listed"
            })
        }
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
})
userRouter.delete("/content/:id", Auth, async (req, res) => {
    const { id } = req.params;
    try {
        const content = await Content.findByIdAndDelete(id)
        if (!content) {
            return res.status(404).json({
                error: "Not found"
            })
        }
        return res.json({
            message: "Content Delete",
            content: content
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
})
userRouter.get("/auth", Auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('username email')
        if (!user) {
            return res.status(404).json({
                authenticated: false,
                user: {}
            })
        }
        return res.status(200).json({
            authenticated: true,
            user: user
        })

    } catch (e) {
        res.status(404).json({
            authenticated: false
        })
    }
})
userRouter.post("/logout", Auth, (req, res) => {
    res.clearCookie("token", {
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    res.status(200).json({
        message: "Logout Success"
    })
})


module.exports = {
    userRouter
}