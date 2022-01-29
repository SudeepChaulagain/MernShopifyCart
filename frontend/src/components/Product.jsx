import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import './Product.css'

import * as actionTypes from '../context/constants/productConstants'

import { getProducts } from '../context/actions/productActions'
import { useProductContext } from '../context/reducers/productContext'


const Product = () => {
    const {productState, dispatch} = useProductContext()

    const {products, isLoading, error} = productState
  
    const fetchProducts = async () =>{
      try {
  
        dispatch({type:actionTypes.GET_PRODUCT_REQUEST})
  
        const result = await getProducts()
  
        dispatch({type:actionTypes.GET_PRODUCT_SUCCESS, payload:result})
  
      } catch (error) {
  
        console.error(error)
  
        dispatch({type:actionTypes.GET_PRODUCT_FAIL})
      }
    }
  
    useEffect(()=>{
      fetchProducts()
    },[])

    const renderItem = (product) =>{

        const {description, imageUrl, name, price, _id:productID} = product

        return (
            <div className='product' key={productID}>
            <img src={imageUrl} alt='product'/>
            <div className='product__info'>
                <p className='info__name'>
                   {name}
                </p>
                <p className='info__description'>
                   {description.substring(0, 100)}
                   ...
                </p>
                <p className='info__price'>${price}</p>
                <Link to={`/product/${productID}`} className='info__button'>
                  View
                </Link>
            </div>
        </div>
        )
    }
  
    if (isLoading) return <h2>Loading...</h2>

    if (error) throw error

  return (

    products.map(renderItem)
    
  )
}

export default Product
