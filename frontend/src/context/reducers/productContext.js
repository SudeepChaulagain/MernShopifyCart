import React, {createContext, useContext, useReducer} from 'react'

import productReducer from './productReducer'

const ProductContext = createContext(null)

let initialState = {
    products:[],
}

export const ProductProvider = ({children}) =>{
    const [productState, dispatch] = useReducer(productReducer, initialState) 

    const contextValue = {
        productState,
        dispatch
    }

    return <ProductContext.Provider value={contextValue}>
             {children}
          </ProductContext.Provider>

}

export const useProductContext = () =>{
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider. Wrap a parent component in <ProductProvider> to fix this error")
    }
    return context
}