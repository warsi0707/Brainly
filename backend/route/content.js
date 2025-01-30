const express = require("express")
const { Content, Link } = require("../model/db")
const { Auth } = require("../middleware/authMidleware")
const contentRouter = express.Router()



contentRouter.get("/content", async(req, res) =>{
    const userid = req.user;
    try{
        const contents = await Content.find({
            // userid: userid
        })
        res.status(200).json({
            content: contents
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})
contentRouter.post("/content", Auth, async(req, res) =>{
    const id = req.user; 
    const {link, type, title, tags} = req.body;
    try{
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        const timeStamp = `${day},${month},${year}`
        const newContent = await Content.create({
            link, type, title,userid:id,createdAt: timeStamp
        })

        return res.status(200).json({
            message: "Content created!",
            content: newContent
        })
    }catch(e){
        res.status(500).json({
            message: "Error while adding content"
        })
    }
    
})
contentRouter.delete("/content/:id", Auth,async(req, res) =>{
    const userId = req.user;
    const {id} = req.params;

    const deleteContent = await Content.findByIdAndDelete(id)
    if(deleteContent){
        return res.status(200).json({
            message: "Content deleted"
        })
    }else{
        return res.status(403).json({
            message: "Error while deleting"
        })
    }
})
contentRouter.post("/brain/share", Auth, async(req, res) =>{
    const id = req.user;
    try{
            const existingHash = await Link.findOne({
                userId: id
            })
            if(existingHash){
                return res.status(200).json({
                    link: `http://localhost:3000/api/v1/brain/${existingHash.hash}` 
                })
            }
            const hash = 'brain2313'
            const createHash = await Link.create({
                hash: hash,
                userId: id
            })
            return res.status(200).json({
                link: `http://localhost:3000/api/v1/brain/${createHash.hash}` 
            })
    }catch(error){
        res.status(404).json({
            message: error
        })
    }
   
})
contentRouter.get("/brain/:hash", async(req, res) =>{
    const {hash} = req.params
   
    try{
        const link = await Link.findOne({
            hash:hash
        })
        if(!link){
            return res.status(404).json({
                message: "Data not found"
            })
        }
        const userid = link.userId
        if(link){
            const content = await Content.find({
                userid: userid
            }).populate()
            return res.json({
                content: content
            })
        }
        return res.status(404).json({
            message: "Data not found"
        })
    }catch(error){
        res.status(404).json({
            message: "Error"
        })
    }
})
module.exports = {
    contentRouter
}