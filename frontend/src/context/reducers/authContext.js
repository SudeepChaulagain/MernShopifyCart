import { createContext, useContext, useReducer } from 'react'
import AuthReducer from './authReducer'

const initialState = {
    authData:{}
}
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth, dispatch] = useReducer(AuthReducer, initialState)
    const value = {
        auth,
        dispatch
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider. Wrap a parent component in <AuthProvider> to fix this error")
    }

    return context
}