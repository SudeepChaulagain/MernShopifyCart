import {Routes, Route} from 'react-router-dom'

import './App.css'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

import Navbar from './components/Navbar'
import Backdrop from './components/Backdrop'
import SideDrawer from './components/SideDrawer'
import { useState } from 'react'

function App() {
  const [sideToggle, setSideToggle] = useState(false)

  return (
   <>
   {/* Navbar
   SideDrawer
   Backdrop
   HomeScreen
   ProductScreen
   CartScreen */}
   <Navbar click={()=>setSideToggle(true)}/>
   <SideDrawer show={sideToggle} click={()=>setSideToggle(false)}/>
   <Backdrop show={sideToggle} click={()=>setSideToggle(false)}/>
   <Routes>
     <Route path='/' element={<HomeScreen/>} />
     <Route path='/product/:id' element={<ProductScreen/>} />
     <Route path='/cart' element={<CartScreen/>} />
   </Routes>
   </>
  );
}

export default App;
