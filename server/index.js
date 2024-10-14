import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import userRoute from "./routes/userRoutes.js"
import chatRoute from "./routes/chatRoute.js"
import messageRouter from "./routes/message.js"

dotenv.config()
const app = express()

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use(bodyParser.json({ limit: "1100kb" }))
app.use(bodyParser.urlencoded({ limit: "1100kb", extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGOURI)
    .then(res => console.log("database connected"))
    .catch(err => console.log("database disconnected"))


app.listen("3000", () => {
    console.log("server in connected")
})

app.use("/api", userRoute)
app.use("/api", chatRoute)
app.use("/api", messageRouter)

app.use((req, res) => {
    res.json("<h1>404</h1>")
})