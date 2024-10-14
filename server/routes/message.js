import express from "express"
import { createMessage, getMessage } from "../controller/message.js"

const router = express.Router()

router.post("/createMessage" , createMessage)
router.get("/getMessage/:chatId" , getMessage)



export default router