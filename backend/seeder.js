import dotenv from 'dotenv'

import dbConnection from './config/db.js'
import products from './data/products.js'
import Product from './models/Product.js'

dotenv.config()

dbConnection()

const importData = async () =>{
    try {
        await Product.deleteMany({})
        await Product.insertMany(products)
        console.log('Data imported successfully!')
        process.exit()
    } catch (error) {
        console.error('Data import failed!')
        process.exit(1)
    }
}

importData()