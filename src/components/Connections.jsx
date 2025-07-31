import { addConnection } from '@/utils/connectionSlice';
import { BASE_URL } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector((store) => store.connection);
    const [isLoading, setIsLoading] = useState(true);

    const fetchConnections = async() => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true, 
            });
            dispatch(addConnection(response?.data?.data));
            console.log(response?.data);
        } catch (error) {
            console.error(error); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-2xl font-bold text-white">Loading connections...</p>
                </div>
            </div>
        );
    }

    if (!connection || connection.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="mb-6">
                        <svg className="w-24 h-24 mx-auto text-slate-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">No Connections Yet</h2>
                    <p className="text-slate-300 text-lg mb-6">
                        Start swiping to make meaningful connections! Your matches will appear here.
                    </p>
                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <p className="text-slate-400 text-sm">
                            💡 Tip: Be active on the feed to increase your chances of making connections!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Your Connections
                    </h1>
                    <p className="text-slate-300 text-lg sm:text-xl">
                        {connection.length} meaningful connection{connection.length !== 1 ? 's' : ''} made
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Connections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {connection.map((conn, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-purple-500/50"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            {/* Profile Image */}
                            <div className="relative h-64 overflow-hidden">
                                {conn.photoURL ? (
                                    <img
                                        src={conn.photoURL}
                                        alt={`${conn.firstName}'s Photo`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 mx-auto text-slate-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-slate-400 text-sm">No Photo</span>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                
                                {/* Connection Badge */}
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Connected
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">
                                        {conn.firstName || "Unknown"} {conn.lastName || ""}
                                    </h3>
                                    {conn.age && (
                                        <span className="text-slate-300 text-sm bg-slate-700 px-2 py-1 rounded-full">
                                            {conn.age} years
                                        </span>
                                    )}
                                </div>

                                {conn.gender && (
                                    <div className="flex items-center mb-3">
                                        <svg className="w-4 h-4 text-slate-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-slate-300 text-sm capitalize">{conn.gender}</span>
                                    </div>
                                )}

                                {conn.about && (
                                    <div className="mb-4">
                                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                                            {conn.about}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        Message
                                    </button>
                                    
                                    <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 text-center">
                    <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Your Connection Stats</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-pink-500 mb-2">{connection.length}</div>
                                <div className="text-slate-300 text-sm">Total Connections</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-500 mb-2">
                                    {Math.round((connection.length / Math.max(connection.length, 1)) * 100)}%
                                </div>
                                <div className="text-slate-300 text-sm">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-500 mb-2">
                                    {connection.filter(c => c.about && c.about.length > 50).length}
                                </div>
                                <div className="text-slate-300 text-sm">Detailed Profiles</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Connections;
