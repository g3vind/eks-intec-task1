import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import path from "path"

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("CONNECTED TO DATABASE")
  })
  .catch(() => {
    console.log("ERROR IN CONNECTING TO DB")
  })

const __dirname = path.resolve()

const app = express()

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use(express.json())
app.use(cookieParser())
const PORT = 5000

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})

app.get("/", (req, res) => {
  res.json({ message: "Success" })
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

// Middleware (for showing error)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res
    .status(statusCode)
    .json({ success: false, error: message, statusCode })
})
