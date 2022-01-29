import axios from 'axios'

export const getProducts = async () => {
    try {

        const {data} = await axios.get('/api/products')

        return data

    } catch (error) {

        console.error(error)
    }
}

export const getProductDetails = async (id) => {
    try {
        const {data} = await axios.get(`/api/products/${id}`)

        return data 

    } catch (error) {
        console.error(error)
    }
}