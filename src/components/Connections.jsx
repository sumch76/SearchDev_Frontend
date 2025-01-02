import { addConnection } from '@/utils/connectionSlice';
import { BASE_URL } from '@/utils/constants';
import React ,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Connections = () => {
    const dispatch =useDispatch();
    const connection=useSelector((store)=>store.connection)
    const fetchConnections = async()=>
    {
        try {
            const response= await axios.get(BASE_URL +"/user/connections",
                {
                    withCredentials:true, 
                }
            );
         
            dispatch(addConnection(response?.data?.data))
            console.log(response?.data);
           
        } catch (error) {
            console.error(error); 
        }
    };
    useEffect(()=>{
        fetchConnections();
    },[]);
    if(!connection) return;
    if(connection.length===0) return <h1>no connection found</h1>
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-10">
    {connection.map((conn, index) => (
      <div
        key={index}
        className="w-72 bg-white shadow-md rounded-xl overflow-hidden transform transition-transform hover:scale-105 border"
      >
        <div className="h-48 bg-gray-300 flex items-center justify-center">
          {conn.photoURL ? (
            <img
              src={conn.photoURL}
              alt={`${conn.firstName}'s Photo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {conn.firstName || "Unknown Name"} {conn.lastName || "Unknown Last Name"}
          </h3>
          <p className="text-sm text-gray-600">{conn.age || "Role not available"}</p>
          <p className="text-sm text-gray-500 mt-2">{conn.about || "Bio not available"}</p>
        </div>
      </div>
    ))}
  </div>
);
};

export default Connections
