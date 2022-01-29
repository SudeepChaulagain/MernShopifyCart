import { createContext, useReducer, useContext } from 'react'

import cartReducer from './cartReducer'

const CartContext = createContext(null)

let cartState = {
    cartItems:[]
}

export const CartProvider = ({children}) =>{
    const [cart, dispatch] = useReducer(cartReducer, cartState)
    const value ={
        cart, 
        dispatch
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = ()=>{
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error")
    }
    return context
}