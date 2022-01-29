import express from 'express'
import dotenv from 'dotenv'

import dbConnection from './config/db.js'
import productRoutes from './routes/product.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)

dbConnection()
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`)
})