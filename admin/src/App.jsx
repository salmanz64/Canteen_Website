import React from 'react'

import { Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar/SideBar'
import Dashboard from './pages/DashBoard/Dashboard'
import Orders from './pages/Orders/Orders'
import Products from './pages/Products/Products'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className='App'>

      <SideBar/>
      <div className='Container'>
      <ToastContainer/>
    <Routes>
      
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/Orders' element={<Orders/>}/>
      <Route path='/Products' element={<Products/>}/>
   
    </Routes>
    </div>
    </div>
  )
}

export default App
