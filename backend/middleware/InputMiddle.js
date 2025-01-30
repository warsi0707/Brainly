const {z} = require("zod")


const InputMiddle =(schema) =>(req, res, next)=>{
    const inputScuccess =schema.safeParse(req.body);

    if(!inputScuccess){
        return res.status(500).json({
            message: inputScuccess.message
        })
    }
    req.body = inputScuccess.data
    next()
}


module.exports = {
    InputMiddle
}