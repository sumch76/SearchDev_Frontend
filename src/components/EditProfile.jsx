import React, { useState } from 'react';
import FeedCard from './FeedCard';
import { useDispatch } from 'react-redux';
import { addUser } from '@/utils/userSlice';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(BASE_URL + "/profile/edit", {
        firstName, lastName, photoURL, gender, about, age
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data) {
        dispatch(addUser(response.data.data));
        alert(response.data.message || "Profile updated successfully");
      }
    } catch (error) {
      console.error("error message: " + error.response);
      setError(error.response?.data || "Something went wrong. Please try again.");
    }
  };

  return (
    // Removed h-screen and added padding-top to account for navbar
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-[calc(100vh-4rem)] pt-20 px-4 gap-6">
      {/* Left side: Edit Profile Form */}
      <div className="w-full lg:w-1/3 bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Edit Profile</h2>
        {error && (
          <div className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form className="flex flex-col" onSubmit={saveProfile}>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <input
              placeholder="First Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full mb-4 sm:mb-0 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              placeholder="Last Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <label className="text-sm mb-2 text-gray-200">Your Photo URL</label>
          <input
            placeholder="Enter your photo URL"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          
          <label className="text-sm mb-2 text-gray-200" htmlFor="age">Age</label>
          <input
            placeholder="Enter your age..."
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          
          <label className="text-sm mb-2 text-gray-200" htmlFor="gender">Gender</label>
          <select
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <label className="text-sm mb-2 text-gray-200">Bio</label>
          <input
            placeholder="Update your bio..."
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Right side: FeedCard */}
      <div className="w-full  lg:w-1/3">
        <FeedCard user={{ firstName, lastName, age, gender, photoURL, about}} showActions={false} />
      </div>
    </div>
  );
};

export default EditProfile;