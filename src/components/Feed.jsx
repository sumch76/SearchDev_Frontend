import { BASE_URL } from '@/utils/constants';
import { addFeed } from '@/utils/feedSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FeedCard from './FeedCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  const getFeed = async() => {
    if(feed) return
    try {
      const response = await axios.get(BASE_URL+"/feed",{
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
  
  if(!feed) return;
  
  if (feed.length === 0) return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-2xl sm:text-4xl font-bold text-white">Loading...</p>
      </div>
    </div>
  );
  
  return ( 
    feed && (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="h-full w-full flex items-center justify-center p-4">
          <FeedCard user={feed[0]} />
        </div>
      </div>
    )
  )
}

export default Feed;
