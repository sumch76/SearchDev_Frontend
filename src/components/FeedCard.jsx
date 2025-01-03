import { BASE_URL } from '@/utils/constants';
import { removeUserFromFeed } from '@/utils/feedSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const FeedCard = ({ user={} ,showActions=true}) => {
  const {_id, firstName, lastName, photoURL, age, gender, about} = user;
  const dispatch=useDispatch();
const handleSendRequest=async(status,_id)=>
{
  try {
    const response=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,
      {},{
        withCredentials: true,
      }
    );
    console.log(response);
    
    if (status === "interested") {
      toast.success(`you are interested in ${firstName}`,{
          position:"bottom-right"
      });
  }
  else if (status === "ignored") {
      toast.error(`ME nhi sehta ${firstName}😭!`,
          {
               position:"bottom-right"
          }
      );
  }
    dispatch(removeUserFromFeed(_id))
    
  } catch (error) {  
  }
}
  return (
    <div>
      <Toaster/>
       <div className="flex h-screen items-center justify-center">
      <div className="relative flex w-96 flex-col rounded-xl bg-red-200 bg-clip-border text-gray-700 shadow-lg">
        <div className="relative mx-4 -mt-6 h-90 overflow-hidden rounded-xl bg-red-700">
          {photoURL ? (
            <img
              src={photoURL}
              alt={`${firstName}'s Profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-200">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h5 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">
            {firstName} {lastName}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700">
            {age ? `Age: ${age}` : 'Age not available'}
          </p>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700">
            {gender ? `Gender: ${gender}` : 'Gender not available'}
          </p>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700">
            { about? `Bio: ${about}` : 'bio not available'}
          </p>
        </div>
       { showActions && (<div className="flex items-center mt-2 mx-1 py-1">
                            <button type="button" className="focus:outline-none text-white bg-green-500 hover:bg-green-900 focus:ring-2 focus:ring-green-300 font-medium rounded-xl text-sm px-6 py-2.5 ml-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-between"
                                onClick={() => handleSendRequest("interested", _id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-heart-fill mr-2" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                <span>Interested</span>
                            </button>
                            <button type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-xl text-sm px-6 py-2.5 ml-3 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex items-center justify-between"
                                onClick={() => handleSendRequest("ignored", _id)}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 18 16">
                                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                                <span>Ignore</span>
                            </button>

                        </div>)}
      </div>
    </div>
    </div>
   
  );
};

export default FeedCard;
