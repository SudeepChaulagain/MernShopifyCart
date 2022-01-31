import {useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'

import './App.css'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'

import Navbar from './components/Navbar'
import Backdrop from './components/Backdrop'
import SideDrawer from './components/SideDrawer'

function App() {
  const [sideToggle, setSideToggle] = useState(false)

  const user = JSON.parse(localStorage.getItem('profile'))

  const navigate = useNavigate()

  useEffect(() => {
    const getCsrfToken =  async () => {

      const { data } = await axios.get('/api/csrf-token')

      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
    }
    
    getCsrfToken()

  }, [])

  useEffect(()=>{
    if (user) {
      navigate('/')
    }
  }, [])

  return (
   <>
   <Navbar click={()=>setSideToggle(true)}/>
   <SideDrawer show={sideToggle} click={()=>setSideToggle(false)}/>
   <Backdrop show={sideToggle} click={()=>setSideToggle(false)}/>

   <Routes>

     <Route path='/' element={!user ? <LoginScreen/> : <HomeScreen/>} />
     <Route path='/login' element={<LoginScreen/>} />
     <Route path='/register' element={<RegisterScreen/>} />
     <Route path='/forgotpassword' element={<ForgotPasswordScreen/>} />
     <Route path='/passwordreset/:token' element={<ResetPasswordScreen/>} />
     <Route path='/product/:id' element={<ProductScreen/>} />
     <Route path='/cart' element={<CartScreen/>} />
   </Routes>
   </>
  );
}

export default App;
