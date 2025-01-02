import { BASE_URL } from '@/utils/constants'
import { addRequest } from '@/utils/requestSlice'
import axios from 'axios'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Requests = () => {
    const dispatch=useDispatch();
    const request=useSelector((store)=>store.request);
    const getRequest= async()=>
    {
        const response=await axios.get(BASE_URL+"/user/requests/received"
            ,{
                withCredentials:true,
            }
        );
        dispatch(addRequest(response.data));
        console.log(response.data);
        
    }
    useEffect(() => {
        getRequest();
    }, []);
  return (
    <div>
        <h1>Requests Received</h1>
      
    </div>
  )
}

export default Requests
