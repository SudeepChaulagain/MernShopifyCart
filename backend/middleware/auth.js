import jwt from 'jsonwebtoken'
import { catchAsync } from '../utils/catchAsync'
import AppError from '../utils/appError.js'

const auth = catchAsync(async (req, res, next) => {
        const token = req.cookies.token
        if (!token) {
            return next(new AppError('Authentication Invalid!', 401))
        }

        const decodedToken = jwt.decode(token)

        if (!decodedToken) {
            return next(new AppError('There was problem in authorizing the request!', 401))
        }
        else {
            req.user = decodedToken
            next()
        }
   
})

export default auth