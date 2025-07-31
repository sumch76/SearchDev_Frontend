import { BASE_URL } from '@/utils/constants';
import { removeUserFromFeed } from '@/utils/feedSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const FeedCard = ({ user={}, showActions=true }) => {
  const {_id, firstName, lastName, photoURL, age, gender, about} = user;
  const dispatch = useDispatch();

  const handleSendRequest = async(status, _id) => {
    try {
      const response = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,
        {},{
          withCredentials: true,
        }
      );
      console.log(response);
      
      if (status === "interested") {
        toast.success(`You are interested in ${firstName}`,{
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
    <div className="w-full h-full">
      <Toaster />
      <div className="flex items-center justify-center w-full h-full px-4 py-6">
        <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          {/* Profile Image Section */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            {photoURL ? (
              <img
                src={photoURL}
                alt={`${firstName}'s Profile`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-slate-700 to-slate-800">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-slate-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-300 text-sm">No Image Available</span>
                </div>
              </div>
            )}
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Profile Info Section */}
          <div className="p-6 space-y-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {firstName} {lastName}
              </h2>
              
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm">
                {age && (
                  <div className="flex items-center space-x-1 text-slate-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{age} years</span>
                  </div>
                )}
                
                {gender && (
                  <div className="flex items-center space-x-1 text-slate-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="capitalize">{gender}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio Section */}
            {about && (
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {about}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="p-6 pt-0">
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2"
                  onClick={() => handleSendRequest('interested', _id)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Interested</span>
                </button>
                
                <button
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2"
                  onClick={() => handleSendRequest('ignored', _id)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Ignore</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
