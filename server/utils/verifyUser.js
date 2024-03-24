import jwt from "jsonwebtoken"
import { ErrorHandler } from "./error.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(ErrorHandler(401, "You are not authenticated"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(ErrorHandler(403, "Invalid token"))
    req.user = user
    next()
  })

  try {
  } catch (error) {}
}
