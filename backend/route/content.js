const express = require("express")
const { Content } = require("../model/db")
const contentRouter = express.Router()



contentRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const contents = await Content.findById({_id:id}).populate('userId', 'username')
        res.status(200).json({
            content: contents
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = {
    contentRouter
}