import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const checkLogin = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.json({ notification : {message: "you need to login", error : true} })
    try {
        const user = await verifyUser(token)
        if(user.error){
            return res.json({notification : user.error})
        }
        req.user = user
        next()
    } catch (err) {
        res.json({ notification : {error: true, message: "token is not valid"} })
    }
}

const verifyUser = async (token) => {
    try{
        const decoded = jwt.verify(token , process.env.JWT)

        const user = await User.findOne({_id : decoded.id}).select("-password")
        if(!user){
            return {error : true , message : "token is no valid"}
        }
        return user

    }catch(err){
        return {notification : {error : true , message : err.message || err}}
    }
}