import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const user = req.body
    try {
        const checkEmail = await User.findOne({ email: user.email })

        if (checkEmail) {
            return res.json({ notification: { error: true, message: "duplicated email" } })
        }
        if (user.password.length < 6) {
            return res.json({ notification: { error: true, message: "password must be 6 charechters at least" } })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)

        const payload = {
            username: user.username,
            password: hash,
            email: user.email,
            profilePic: user.profilePic
        }
        const newUser = new User(payload)
        const save = await newUser.save()
        res.json({ notification: { success: true, message: "you registered successfully" } })
    } catch (err) {
        res.json({ notification: { error: true, message: err.message || err } })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ notification: { error: true, message: "user not found" } })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.json({ notification: { error: true, message: "user not found" } })
        }
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.JWT, { expiresIn: "1d" })
        const tokenOptions = {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 30,
            secure: true,
        }
        res.cookie("token", token, tokenOptions).json({ notification: { success: true, message: "login successfully" } })
    } catch (err) {
        res.json({ notification: { error: true }, message: err.message || err })
    }
}


export const userInfo = async (req, res) => {
    try {
        res.json({ notification: { success: true, message: `hello ${req.user.username}` }, response: req.user })
    } catch (err) {
        res.json({ notification: { error: true }, message: err.message || err })
    }
}

export const user = async (req, res) => {
    try {
        const id = req.params.id

        const response = await User.findById(id).select("-password")
        res.json({ response })
    } catch (err) {
        res.json({ notification: { error: true }, message: err.message || err })
    }
}

export const findasideUsers = async (req , res) => {
    const body = req.body
    try {
        const response = await User.find({
            _id : {$in : body.ids}
        }).select("-password")
        res.json({response})
    } catch (err) {
        res.json({ notification: { error: true }, message: err.message || err })
    } 
}

export const updateUser = async (req, res) => {
    try {
        const user = req.body
        const response = await User.findByIdAndUpdate(req.user.id, user, { new: true }).select("-password")

        res.json({ response, notification: { success: true, message: "updated successfully" } })
    } catch (err) {
        res.json({ notification: { error: true, message: "this email has been registered" } })
    }
}

export const logout = async (req, res) => {
    try {
        const tokenOptions = {
            http: true,
            Secure: true,
            SameSite: "none",
        }
        res.cookie("token", "", tokenOptions).json({ notification: { success: true, message: "logout successfully" } })
    } catch (err) {
        res.json({ notification: { error: true, message: err.message || err } })
    }
}

export const searchUser = async (req, res) => {
    try {
        const { value } = req.query
        const query = new RegExp(value, "i", "g")

        const user = await User.find({
            "$or": [
                { username: query },
                { email: query }
            ]
        }).select("-password")

        if (!user) return res.json({ notification: { error: true, message: "user not found" } })

        res.json({ response: user })
    } catch (err) {
        res.json({ notification: { error: true, message: err.message || err } })
    }
}