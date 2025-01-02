import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
// import Footer from './Footer'

import { BASE_URL } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '@/utils/userSlice'
import axios from 'axios';

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
      if (error.status === 400) {
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
      {/* <Footer /> */}
    </div>   
  );
}

export default Body;
