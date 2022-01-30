import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'

import dbConnection from './config/db.js'
import AppError from './utils/appError.js'

import errorHandler from './middleware/error.js'

import productRoutes from './routes/product.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

const csrfProtection = csrf({
    cookie:true
})
app.use(csrfProtection)

app.get('/api/csrf-token', (req,res) => {
    res.json({csrfToken: req.csrfToken()})
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
 })

dbConnection()
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`)
})

//Error Handler Middleware
app.use(errorHandler)