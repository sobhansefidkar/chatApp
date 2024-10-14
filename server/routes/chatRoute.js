import express from "express"
import { createChat, findUser, findUserChats } from "../controller/chatController.js"

const router = express.Router()

router.post("/createChat" , createChat)
router.get("/findUserChats/:userId" , findUserChats)
router.get("/findUser/:firstId/:secondId" , findUser)

export default router