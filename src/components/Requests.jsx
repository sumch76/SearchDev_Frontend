import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { addRequest } from "@/utils/requestSlice";
import toast, { Toaster } from 'react-hot-toast';

const Requests = () => {

    const dispatch = useDispatch();
    const request = useSelector((store) => store.request);
    const reviewRequest = async (status, _id) => {
        try {
            const response = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {}, {
                withCredentials: true
            }
            );
            console.log(`Request ${status}:`, _id);
            if (status === "accepted") {
                toast.success(`Request ${status} successfully!`);
            }
            else if (status === "rejected") {
                toast.error(`Request ${status}😭!`);
            }

        } catch (error) {
            console.error("Error reviewing request:", error);

        }
    }

    const getRequest = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            // Dispatching the whole array of requests
            dispatch(addRequest(response.data.data));
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        getRequest();
    }, []);

    if (!request || request.length === 0) return <h1>No request found</h1>;

    return (
        <div className="flex flex-wrap justify-center gap-6 mt-10">
            <Toaster />
            {request.map((req, _id) => {
                const user = req.fromUserId; // Access populated `fromUserId`
                return (
                    <div
                        key={req._id}
                        className="w-72  shadow-md rounded-xl overflow-hidden transform transition-transform hover:scale-105 border"
                    >
                        <div className="h-48 bg-gray-300 flex items-center justify-center">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={`${user.firstName}'s Photo`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500">No Image</span>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white">
                                {user.firstName || "Unknown"} {user.lastName || ""} <span>   <p className="text-sm text-gray-600">{user.age || "Age not available"}</p></span>
                            </h3>

                            <p className="text-sm text-white-500 mt-2">{user.about || "Bio not available"}</p>
                        </div>
                        <div className="flex items-center mt-2 mx-1 py-1">
                            <button type="button" className="focus:outline-none text-white bg-green-500 hover:bg-green-900 focus:ring-2 focus:ring-green-300 font-medium rounded-xl text-sm px-6 py-2.5 ml-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-between"
                                onClick={() => reviewRequest("accepted", req._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-heart-fill mr-2" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                <span>Accept</span>
                            </button>
                            <button type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-xl text-sm px-6 py-2.5 ml-3 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex items-center justify-between"
                                onClick={() => reviewRequest("rejected", req._id)}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 18 16">
                                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                                <span>Reject</span>
                            </button>

                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
