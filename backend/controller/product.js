import Product from '../models/Product.js'

export const getProducts = async (req, res) =>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server Error'})
    }
}
export const getProductById = async (req, res) =>{
    const id = req.params.id
    try {
        const products = await Product.findById(id)
        res.status(200).json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server Error'})
    }
}
