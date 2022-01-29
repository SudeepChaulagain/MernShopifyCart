import AppError from '../utils/appError.js'

//MongoDB error
const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`

    return new AppError(message, 400)
}

const handleDuplicateError = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]

    const message = `Duplicate field value: ${value}. Please use another value!`

    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)

    const message = `Invalid input data. ${errors.join('. ')}`

    return new AppError(message, 400)
}

//JSON Web Token Error

const handleJWTError = () => {
    new AppError('Invalid Token. Please log in again!', 401)
}

const handleJWTExpiredError = () => {
    new AppError('Your token has expired! Please log in again!', 401)
}

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
            return res.status(err.statusCode).json({
                status:err.status,
                error:err,
                message:err.message,
                stack:err.stack
            })
    }
     console.error(err)
     return res.status(500).json({
         status:'error',
         message:'Something went wrong!'

     })

}
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            
            return res.status(err.statusCode).json({
                status:err.status,
                error:err,
                message:err.message,
                stack:err.stack
            })
        }
    }
     console.error(err)
     return res.status(500).json({
         status:'error',
         message:'Something went wrong!'

     })

}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, req, res)
    }
    
    let error = {...err}

    error.message = err.message

    if (error.name === 'CastError') error = handleCastError(error)
    if (error.code === 11000) error = handleDuplicateError(error)
    if (error.name === 'ValiationError') error = handleValidationErrorDB(error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError()
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()
}

export default errorHandler