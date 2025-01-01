import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
const FeedCard = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender } = user;

  return (
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
        </div>
        <div className="p-6 flex items-center justify-between">
          <button
            type="button"
            className="select-none rounded-lg bg-green-500 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85"
           >
            Accept <FaCheckCircle className='' />
          </button>
          <button
            type="button"
            className="select-none rounded-lg bg-red-500 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85"
          >
            Ignore <FcCancel />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
