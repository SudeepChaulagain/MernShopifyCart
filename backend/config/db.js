import mongoose from 'mongoose'

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected successfully!')
    } catch (error) {
        console.log(error)
        console.error('DB connection failed!')
        process.exit(1)
    }
}

export default dbConnection
