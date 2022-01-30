import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './ProductScreen.css'

import * as actionTypes from '../context/constants/productConstants'
import * as cartActionTypes from '../context/constants/cartConstants'
import { getProductDetails } from '../context/actions/productActions'
import { useProductContext } from '../context/reducers/productContext'
import { useCartContext } from '../context/reducers/cartContext'


const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1)

  const {id} = useParams() 

  const navigate = useNavigate()

  const {productState, dispatch} = useProductContext()

  const { dispatch:cartDispatch} = useCartContext()

  const {product, isLoading, error} = productState

  const {countInStock, description, imageUrl, name, price} = product

  const fetchProducts = async () =>{
    try {

      dispatch({type:actionTypes.GET_PRODUCT_REQUEST})

      const result = await getProductDetails(id)

      dispatch({type:actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload:result})

    } catch (error) {

      console.error(error)

      dispatch({type:actionTypes.GET_PRODUCT_FAIL})
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  const addToCartHandler = async () =>{
    try {

      const result = await getProductDetails(id)

      cartDispatch({type:cartActionTypes.ADD_TO_CART, payload:{
        id: result._id,
        name: result.name,
        imageUrl: result.imageUrl,
        price: result.price,
        countInStock: result.countInStock,
        quantity:parseInt(quantity)
      }})

      navigate('/cart')

    } catch (error) {

      console.log(error)
    }
  }

  if (isLoading) return <h2>Loading...</h2>
  if (error) throw error

  return (
  <div className='productscreen'>
    <div className='productscreen__left'>
      <div className='left__image'>
        <img src={imageUrl} alt='product'></img>
      </div>
      <div className='left__info'>
        <p className='left__name'>{name}</p>
        <p>Price: ${price}</p>
        <p>Description: {description}</p>
      </div>
    </div>
    
    <div className='productscreen__right'>
      <div className='right__info'>
        <p>
          Price: <span>${price}</span>
        </p>
        <p>
          Status: <span>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
        </p>
        <p>
          Quantity
          <select value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
            {[...Array(countInStock).keys()].map((x)=>(
              <option key={x+1} value={x+1}>{x+1}</option>
            ))}
          </select>
        </p>
        <p>
          <button type='button' onClick={addToCartHandler}>Add to Cart</button>
        </p>
      </div>
    </div>
    
  </div>
  )
}

export default ProductScreen
