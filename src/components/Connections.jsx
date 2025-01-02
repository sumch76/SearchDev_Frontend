import { BASE_URL } from '@/utils/constants'
import React from 'react'

const Connections = () => {
    const fetchConnections= async()=>
    {
        try {
            const res=await axios.get(BASE_URL+"/connections",
                {
                    withCredentials:true, 
                }
            )
            
        } catch (error) {
            
        }
    };
    useEffect(()=>{
        fetchConnections();
    },[])
  return (
    <div>
        
    </div>
  )
}

export default Connections
