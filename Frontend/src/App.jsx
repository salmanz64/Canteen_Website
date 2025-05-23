import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact Us/Contact'
import Place from './pages/Place Order/Place'
import Feedback from './pages/Feedback And Rating/Feedback'
import About from './pages/About Us/About'
import SideBar from './components/SideBar/SideBar'
import Home from './pages/Home/Home'
import Login from './components/Login/Login'
import Profile from './pages/Profile/Profile'
import Order_Tracking from './pages/Orders/Order_Tracking'
import Verify from './pages/Verify/Verify'

const App = () => {


  const [isLogin,setLogin] = useState(false)


  return (
    <div className='App'>
    
    <SideBar/>
    <div className='Container'>
    {isLogin?<Login setLogin={setLogin}/>:<></>}
    <Navbar setLogin={setLogin}/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/contact-us' element={<Contact/>}/>
      <Route path='/checkout' element={<Place/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='/about-us' element={<About/>}/>
      <Route path='/orders-track' element={<Order_Tracking/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/verify' element={<Verify/>}/>
    </Routes>
    </div>
    </div>
  )
}

export default App
