import React from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

function Hero() {
  const commonStyles = {
    button:
      "inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 rounded-full sm:leading-8 sm:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
    focusRing: "focus:ring-primary focus:ring-offset-secondary",
  };
  return (
    <div className="relative pt-48 pb-12 bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full opacity-60"
          src="https://res.cloudinary.com/sumit76/image/upload/v1736062131/pexels-esan-2085998_triuwd.jpg"
          alt="SearchDev Background"
        />
      </div>

      <div className="relative">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="tracking-tighter text-white">
              <span className="font-sans font-normal text-7xl">Discover</span>
              <br />
              <span className="font-serif italic font-normal text-8xl">
                Search Dev
              </span>
            </h1>
            <p className="mt-5 font-sans text-base font-semibold text-white text-opacity-70">
            Welcome to the ultimate platform for tech enthusiasts and developers. Discover like-minded individuals
            Whether you're looking for collaborators, mentors, or just fellow coders to vibe with, you're in the right place!
            </p>
            <div className="flex items-center justify-center mt-8 space-x-3 sm:space-x-4">
              <Link to="/login"
                className={`${commonStyles.button} bg-white text-black hover:bg-opacity-90 ${commonStyles.focusRing} border-2 border-transparent`}
              >
                Login
              </Link>

              <Link to="/feed"
                className={`${commonStyles.button} bg-transparent text-white border-primary hover:bg-white hover:text-black ${commonStyles.focusRing} border-2`}
              >
                <FaPlay className="h-5 w-5 mr-2" />
                Feed
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute hidden transform -translate-x-1/2 lg:bottom-8 xl:bottom-12 left-1/2 lg:block">
        <a
          href="#"
          className="inline-flex items-center justify-center w-12 h-12 text-white transition-all duration-200 rounded-full bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary"
        >
          <IoIosArrowDown className="h-5 w-5 mt-2" />
        </a>
      </div>
    </div>
  );
}

export default Hero;
