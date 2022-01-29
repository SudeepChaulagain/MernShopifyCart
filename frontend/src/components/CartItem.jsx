import React from 'react'
import { Link } from 'react-router-dom'

import './CartItem.css'
import { useCartContext } from '../context/reducers/cartContext'
import * as cartActionTypes from '../context/constants/cartConstants'

const CartItem = () => {
  const {cart, dispatch} = useCartContext()

  const {cartItems} = cart

  if (cartItems?.length === 0) {
    return (
      <div>
      <h2>Your Cart Is Empty</h2> <Link to="/">Go Back</Link>
     </div>
    )
  }

  const renderItem = (cartItem) => {

    const {id, name:productName, imageUrl, price, countInStock, quantity} = cartItem

    return (
      <div className='cartitem' key={id}>
      <div className='cartitem__image'>
      <img src={imageUrl} alt='product'/>
      </div>

      <Link to={`/product/${id}`} className='cartitem__name'> 
        <p>{productName}</p>
      </Link>
      <p className='cartitem__price'>${price}</p>

      <select className='cartitem__select' value={quantity} onChange={(e)=>{
          dispatch({type:cartActionTypes.ADD_TO_CART, payload:{
          id,
          name:productName,
          imageUrl,
          price,
          countInStock,
          quantity:parseInt(e.target.value)
        }})
      }}>
        {[...Array(countInStock).keys()].map((x)=>(
          <option key={x+1} value={x+1}>{x+1}</option>
        ))}
          
      </select>

      <button className='cartitem__deleteBtn' onClick={()=>{
        dispatch({type:cartActionTypes.REMOVE_FROM_CART, payload:id})
      }}>
          <i className='fas fa-trash'></i>
      </button>
  </div>
    )
  }

  return (
    <div>
    {cartItems?.map(renderItem)}
    </div>
  )
}

export default CartItem
