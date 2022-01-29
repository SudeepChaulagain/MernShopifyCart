import * as actionTypes from '../constants/productConstants'

const productReducer = (state, action) =>{

    switch (action.type) {

        case actionTypes.GET_PRODUCT_REQUEST:
            return {
                products:[],
                product:{},
                isLoading:true,
                error:false
            }
        case actionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                products:[...state.products, ...action.payload],
                product:{},
                isLoading:false,
                error:false
            }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                products:[],
                product:action.payload,
                isLoading:false,
                error:false
            }
        
        case actionTypes.GET_PRODUCT_FAIL:
            return {
                products:[],
                isLoading:false,
                error:true
            }
        default:
            return state
    }
}

export default productReducer