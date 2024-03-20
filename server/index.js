import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("CONNECTED TO DATABASE")
  })
  .catch(() => {
    console.log("ERROR IN CONNECTING TO DB")
  })

const app = express()
const PORT = 5000

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
