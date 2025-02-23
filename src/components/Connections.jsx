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
    <div
      className="h-[50rem] w-full dark:bg-black bg-blue-700  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-blue-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="flex flex-wrap justify-center gap-7 mb-10">
    {connection.map((conn, index) => (
      <div
        key={index}
        className=" bg-slate-950 shadow-md rounded-xl overflow-hidden transform transition-transform hover:scale-105 border"
      >
        <div className="h-60 bg-gray-300 flex items-center justify-center">
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
          <h3 className="text-lg font-semibold text-white">
            {conn.firstName || "Unknown Name"} {conn.lastName || "Unknown Last Name"}
          </h3>
          <p className="text-sm text-white/39">{conn.age || "Role not available"}</p>
          <p className="text-sm text-gray-500 mt-2">{conn.about || "Bio not available"}</p>
        </div>
      </div>
    ))}
  </div>
    </div>
    
);
};

export default Connections
