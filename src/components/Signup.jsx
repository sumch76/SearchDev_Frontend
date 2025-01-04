import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";
const Signup = () => {
     const[firstName,setFirstName]=useState("");
     const[lastName,setLastName]=useState("");
    const[emailId,setEmailId]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
 const dispatch=useDispatch();
 const navigate=useNavigate();
    const handleSignup = async (e) => {
        try {
            e.preventDefault();
          const response = await axios.post(BASE_URL+ "/signup", {
            firstName,lastName,emailId,password
          },{
            withCredentials:true,
          });
          console.log(response.data.data);
          dispatch(addUser(response.data.data));
        navigate("/profile");
        } catch (err) { 
          const errorMessage = err.response?.data || "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error(err);
        } 
      };
    return (
      <>
      <section className="relative flex h-screen items-center justify-center bg-[url()] bg-cover bg-center">
        <div className="relative z-10 flex w-full bg-white/10 max-w-md flex-col rounded-3xl border-base/50 border-t px-4 py-10 backdrop-blur-2xl sm:px-8 md:px-20">
          <div className="mx-auto w-full">
            <div className="mt-8">
              <button
                aria-label="Sign in with Google"
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-medium duration-200 hover:bg-black focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                type="button"
              >
                <GoogleIcon className="size-7" />
                <span>Sign in with Google</span>
              </button>
              <div className="relative py-3">
                <div className="relative flex justify-center">
                  <span className="px-2 text-sm text-neutral-500 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4/12 before:bg-neutral-300 after:absolute after:top-1/2 after:right-1 after:h-px after:w-4/12 after:bg-neutral-300">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSignup}>
              <div className="space-y-3">
                <div>
                <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="name"
                  >
                    FirstName
                  </label>
                  <input
                    className="block h-12 w-full rounded-xl bg-white/10 px-4 py-2 text-black placeholder-neutral-300 focus:outline-none focus:ring-neutral-300 sm:text-sm"
                    id="firstName"
                    placeholder="Enter your first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                   <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="name"
                  >
                    Email
                  </label>
                  <input
                    className="block h-12 w-full rounded-xl bg-white/10 px-4 py-2 text-black placeholder-neutral-300 focus:outline-none focus:ring-neutral-300 sm:text-sm"
                    id="lastName"
                    placeholder="Your last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="name"
                  >
                    Email
                  </label>
                  <input
                    className="block h-12 w-full rounded-xl bg-white/10 px-4 py-2 text-black placeholder-neutral-300 focus:outline-none focus:ring-neutral-300 sm:text-sm"
                    id="name"
                    placeholder="Your email address"
                    type="text"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="block h-12 w-full rounded-xl bg-white/10 px-4 py-2 text-amber-500 placeholder-neutral-300 focus:outline-none focus:ring-neutral-300 sm:text-sm"
                    id="password"
                    placeholder="Type password here..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 font-medium text-white hover:bg-neutral-700 focus:ring-2 focus:ring-black focus:ring-offset-2"
                    type="submit"
                  >
                    Signup
                  </button>
                </div>
                {error && <p className="text-red-700 text-center mt-4">{error}</p>}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-black">
                 Already having account?{" "}
                  <Link to="/login"
                    className="text-amber-500 hover:text-black"
                   
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      </>
    );
  };
  
  function GoogleIcon(props) {
    return (
      <svg
        height="24"
        viewBox="0 0 48 48"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <title>Google Logo</title>
        <path
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          fill="#FFC107"
        />
        <path
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          fill="#FF3D00"
        />
        <path
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          fill="#4CAF50"
        />
        <path
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          fill="#1976D2"
        />
      </svg>
    );
  }
  export default Signup;
  