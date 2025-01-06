import { BASE_URL } from '@/utils/constants';
import { addFeed } from '@/utils/feedSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FeedCard from './FeedCard';
// import { Background } from './ui/Background';
const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  //console.log(feed);
  
  const dispatch=useDispatch();
  const getFeed= async()=>
  {
    if(feed) return
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
  if(!feed) return;
  if (feed.length === 0) return <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">Loading..</p></div>;
  return ( 
  
    feed && (
      <div
      className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
     <FeedCard user={feed[0]} />
    </div>
             
      )
    )
}

export default Feed;
