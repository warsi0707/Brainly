const jwt = require("jsonwebtoken")

 function Auth(req, res, next){
    const token = req.headers.token
    try{
        if(!token){
            return res.status(500).json({
                message: "Login Required"
            })
        }
        const decode =  jwt.verify(token, process.env.USER_JWT_SECRETE)
        if(!decode){
            return res.status(500).json({
                message: "Login required"
            })
        }
        req.user = decode.userId
        next()
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    } 
}

module.exports = {
    Auth
}