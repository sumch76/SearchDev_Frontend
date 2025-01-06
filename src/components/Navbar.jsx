import { BASE_URL } from '@/utils/constants';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate } from 'react-router-dom';
import { removeUser } from '@/utils/userSlice';
import axios from 'axios';
import logo from "../assets/logo2.png";

const Navbar = () => {
  const user=useSelector(store=>store.user);
const dispatch =useDispatch();
const navigate=useNavigate();

  const handleLogout= async()=>
  {
    try {
      await axios.post(BASE_URL+"/logout",{},{
        withCredentials:true,
      });
      dispatch(removeUser());
      return navigate("/login");
      
    } catch (error) {
    console.error(error);    
    }
  }
  return (
   <div className="navbar bg-slate-950" style={{ fontFamily: "'Gill Sans', sans-serif" }}>
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost ">
    <img 
    src={logo} 
    alt="Feed Icon" 
    style={{ width: '60px', height: '60px' }} 
  /></Link>
  </div>
{ user && (<div className="flex-none gap-2"> 
  <p>Welcome {user.firstName}😍</p>
    <div className="dropdown dropdown-end flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user-photo"
            src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-14 w-52 p-1 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge bg-green-300 text-black">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default Navbar; 
