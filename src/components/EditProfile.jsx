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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
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
        // Show success message
        setError("Profile updated successfully!");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("error message: " + error.response);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Edit Profile</h1>
          <p className="text-slate-300">Update your profile information and see how it looks</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Edit Profile Form */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Profile Details
            </h2>
            
            {error && (
              <div className={`mb-6 p-4 rounded-lg ${
                error.includes("successfully") 
                  ? "bg-green-900/50 border border-green-500 text-green-300" 
                  : "bg-red-900/50 border border-red-500 text-red-300"
              }`}>
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={saveProfile}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    placeholder="Enter first name"
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    placeholder="Enter last name"
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Profile Photo URL
                </label>
                <input
                  placeholder="Enter your photo URL"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Age
                  </label>
                  <input
                    placeholder="Enter your age"
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="number"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Gender
                  </label>
                  <select
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="4"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Save Changes
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Preview Card */}
          <div className="lg:sticky lg:top-24">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Profile Preview</h3>
              <p className="text-slate-400 text-sm">See how your profile will appear to others</p>
            </div>
            <div className="flex justify-center">
              <FeedCard user={{ firstName, lastName, age, gender, photoURL, about}} showActions={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;