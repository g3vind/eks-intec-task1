import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { ErrorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
// SIGN UP
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  // hashing password in the database
  const hashedPassword = bcryptjs.hashSync(password, 10)

  // create a new user using our user model
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    await newUser.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    next(error)
  }
}

// SIGN IN

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(ErrorHandler(404, "User Not Found"))

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(ErrorHandler(401, "Wrong Credentials"))

    // after verifying both we'll add a jwt token to the cookie of browser
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    // seperating password from valid user so that it does'nt go to client side
    const { password: hashedPassword, ...rest } = validUser._doc

    // expiry time for the cookie
    const expiryDate = new Date(Date.now() + 3600000) // 1 hour from signing in
    // put token inside cookie of client side browser
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}
