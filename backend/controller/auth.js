import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/User.js'
import AppError from '../utils/appError.js'

import { catchAsync } from '../utils/catchAsync.js'
import sendEmail from '../utils/sendEmail.js'

const signToken = (id, email) => {
    const secret = process.env.JWT_SECRET
    // const expire = process.env.JWT_EXPIRE

    const payload = {
        email,
        id
    }

    return jwt.sign(payload, secret, {expiresIn:'1h'})

}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id, user.email)

    res.cookie('token', token, {httpOnly:true} )

    //remove password from output i.e. response
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data:{
            user
        }
    })
}

export const login = catchAsync(async (req, res, next) =>{

       const {email, password} = req.body
    
        const existingUser = await User.findOne({email})

        if(!existingUser) return next(new AppError('Invalid credentials', 400))

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return next(new AppError('Invalid credentials', 400))

        createSendToken(existingUser, 200, req, res)
})

export const register = catchAsync(async (req, res, next) => {

   const {username, email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) return next(new AppError('Email already in use!', 400))

    const user = await User.create({
        username, 
        email,
        password
    })

    createSendToken(user, 201, req, res)

})


export const forgotPassword = catchAsync(async (req,res,next) => {
   //check if the user exists with the provided email
   const {email} = req.body

   const user = await User.findOne({email})

   if (!user) return next(new AppError('No such user exists with the email provided', 404))

   //Generate the random reset token and save it in db
   const resetToken = user.createResetPasswordToken()
   await user.save()

   //Send to user's email
   try {
       const resetURL = `http://localhost:3000/passwordreset/${resetToken}`

       //HTML message
       const message = `
       <h2>You had requested for a password reset</h2>
       <p>Please click the following to reset your password:</p>
       <a href=${resetURL} clicktracking=off>ResetLink</a>
       `
       await sendEmail({
           to:user.email,
           subject:'Password Reset Request',
           text:message
       })

       res.status(200).json({success:true, data:'Email sent successfully!'})

   } catch (error) {
       console.log(error)
       user.resetPasswordToken = undefined
       user.resetPasswordExpire = undefined
       await user.save()

       return next(new AppError('There was an error while sending the email. Please try again later!', 500))
   }

})

export const resetPassword = catchAsync(async (req, res, next) => {
    //Get user based on the token in URL params
    const resetPasswordToken = crypto
          .createHash('sha256')
          .update(req.params.resetToken)
          .digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() }
    })

    if (!user) return next(new AppError('Invalid Token', 400))
    user.password = req.body.password
    user.resetPasswordToken = undefined //reset after saving the password
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json({
        success: true,
        data: "Password Updated Success",
    })
})