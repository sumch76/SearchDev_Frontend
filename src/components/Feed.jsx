import { BASE_URL } from '@/utils/constants';
import { addFeed } from '@/utils/feedSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FeedCard from './FeedCard';
const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  console.log(feed);
  
  const dispatch=useDispatch();
  const getFeed= async()=>
  {
    try {
      const response= await axios.get(BASE_URL+"/feed",{
        withCredentials:true,
      });
      dispatch(addFeed(response?.data?.data));
      
    } catch (error) {
      console.error(error.message); 
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if(!feed)return
  return ( 
   
    feed && (
        <div>
          <FeedCard user={feed[0]} />
        </div>
      )
    )
}

export default Feed;
