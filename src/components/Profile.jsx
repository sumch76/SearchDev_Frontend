import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user)
  
  return (
    user && (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <EditProfile user={user} />
      </div>
    )
  )
}

export default Profile;
