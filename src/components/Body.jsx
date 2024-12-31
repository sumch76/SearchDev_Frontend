import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Login from './Login'
import Feed from './Feed'
const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/> 
        <Feed/>
        <Footer/>
    </div>
  )
}

export default Body
