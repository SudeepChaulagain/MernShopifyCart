import CartItem from "../components/CartItem"

import './CartScreen.css'
import { useCartContext } from '../context/reducers/cartContext'

const CartScreen = () => {
  const {cart} = useCartContext()

  const {cartItems} = cart

  const getCartCount = () =>{
    return cartItems.reduce((quantity, item) => Number(item.quantity)+quantity , 0)
  }

  const getCartSubTotal = () =>{
    return cartItems.reduce((price, item)=> price + item.price * item.quantity , 0)
  }

  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>Shopping Cart</h2>
        <CartItem/>
      </div>

      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p>Subtotal ({getCartCount()}) items</p>
          <p>${getCartSubTotal()}</p>
        </div>
        <div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen
