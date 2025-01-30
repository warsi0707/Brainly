require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { userRouter } = require('./route/user')
const cookieParser = require("cookie-parser")
const { contentRouter } = require('./route/content')
const path = require("path")
const cors = require("cors")


app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'frontend','dist')))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use("/api/v1", userRouter)
app.use("/api/v1",contentRouter)

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})
async function Main(){
    try{
        app.listen(3000)
        console.log("App running on port 3000")
        const connectDb = await mongoose.connect(process.env.DATABASE_URL)
        if(connectDb){
            console.log("Database connected")
        }else{
            console.log("DB connection failed")
        }
    }catch(e){
        console.log(e)
    }
}
Main()