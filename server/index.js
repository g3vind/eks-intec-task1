import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("CONNECTED TO DATABASE")
  })
  .catch(() => {
    console.log("ERROR IN CONNECTING TO DB")
  })

const app = express()
app.use(express.json())
const PORT = 5000

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})

app.get("/", (req, res) => {
  res.json({ message: "Success" })
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
