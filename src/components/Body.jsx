import React, { useEffect } from 'react'
import Navbar from './Navbar'
import "./PageStyle/grid.css"
// import { Sidebar, Logo, LogoIcon } from './Sidebar';
import { BASE_URL } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '@/utils/userSlice'
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { Background } from './ui/Background'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const fetchUser = async () => {  
    if(userData) return;
    try {
      const response = await axios.get(BASE_URL + "/profile/view",
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      
      <Navbar />
      <Outlet />
      
    </div>   
  );
}

export default Body;
