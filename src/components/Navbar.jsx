import { BASE_URL } from '@/utils/constants';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate } from 'react-router-dom';
import { removeUser } from '@/utils/userSlice';
import axios from 'axios';
import logo from "../assets/logo2.png";

const Navbar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
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
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg backdrop-blur-sm bg-opacity-95" style={{ fontFamily: "'Gill Sans', sans-serif" }}>
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost hover:bg-slate-700 transition-colors duration-200">
            <img 
              src={logo} 
              alt="Feed Icon" 
              className="w-12 h-12 sm:w-14 sm:h-14"
            />
          </Link>
        </div>
        
        {user && (
          <div className="flex-none gap-4 items-center"> 
            <p className="text-slate-200 text-sm sm:text-base hidden sm:block">
              Welcome {user.firstName} 😍
            </p>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-slate-700 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-600 hover:border-slate-400 transition-colors duration-200">
                  <img
                    alt="user-photo"
                    src={user.photoURL}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-800 rounded-xl z-[1] mt-2 w-52 p-2 shadow-2xl border border-slate-700">
                <li>
                  <Link to="/profile" className="text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200 justify-between">
                    Profile
                    <span className="badge bg-green-500 text-white text-xs">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    Requests
                  </Link>
                </li>
                <li>
                  <a 
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar; 
