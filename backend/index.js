require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { userRouter } = require('./route/user')
const { contentRouter } = require('./route/content')
const cors = require("cors")
const path = require('path')


app.use(express.json())
// app.use(cookieParser())
app.use(express.static(path.join(__dirname,'frontend','dist')))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.get("/", (req, res) =>{
    res.send("Hello world")
})
app.use("/api/v1/user", userRouter)
app.use("/api/v1/content",contentRouter)

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