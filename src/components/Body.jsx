import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Login from './Login'
const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/> 
        <Login/>
        <Footer/>
    </div>
  )
}

export default Body
