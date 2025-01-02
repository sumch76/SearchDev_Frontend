import { addConnection } from '@/utils/connectionSlice';
import { BASE_URL } from '@/utils/constants';
import React ,{useEffect}from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Connections = () => {
    const dispatch =useDispatch();
    const fetchConnections = async()=>
    {
        try {
            const response= await axios.get(BASE_URL +"user/connections",
                {
                    withCredentials:true, 
                }
            );
            console.log(response?.data);
            
            dispatch(addConnection(response?.data?.data))
           
        } catch (error) {
            console.error(error);
            
        }
    };
    useEffect(()=>{
        fetchConnections();
    },[])
  return (
    <div className='flex justify-center my-10'>
        <h1 className='text-bold text-2xl'>{}</h1>
    </div>
  )
}

export default Connections
