import express from "express"
import { userInfo, login, logout, register, searchUser, updateUser , user, findasideUsers} from "../controller/userControler.js"
import { checkLogin } from "../middleware/auth.js"

const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.get("/userInfo" , checkLogin , userInfo)
router.get("/user/:id" , checkLogin , user)
router.put("/updateUser" , checkLogin , updateUser)
router.get('/logout' , logout)
router.get("/searchUser" , searchUser)
router.post("/findasideUsers" , findasideUsers)


export default router