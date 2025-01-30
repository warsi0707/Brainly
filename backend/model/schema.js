const {z, string} = require("zod")


const UserSchema= z.object({
    username: z.string().min(3, "Username required").max(100,"Maximum username"),
    password: z.string().min(3,"Username required").max(50,"Max password")
})


module.exports = {
    UserSchema
}
