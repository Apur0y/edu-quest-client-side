import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut,theme, setTheme } = useContext(AuthContext);
  const location = useLocation();

  const isHomePage= location.pathname ==='/' || location.pathname==='/login' || location.pathname==='/register'

  const handleTheme =()=>{
    setTheme(!theme)
  }

  const handleLogOut = () => {
    logOut();
  };


  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 0 || !isHomePage) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
  
      <li>
        <Link to="/allsession">Courses</Link>
      </li>
  
      <li>
        <Link to="/dashboard/profile">Dashboard</Link>
      </li>
  
      <li>
        <Link to="/constactus">Contact Us</Link>
      </li>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 z-10  py- md:px-14 transition-all duration-300 ${
        isScrolled ? "bg-teal-900 shadow-lg" : "bg-transparent"
      }
    ${theme?"":" bg-white "}
    `}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-white bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img src="../../../../public/logo.png" className="w-12" alt="" />
        <h1 className="text-xl font-semibold ml-2 hidden md:flex">EduQuest</h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base px-1">{links}</ul>
      </div>
      
      <div className="navbar-end ">
        <div>
          <button onClick={handleTheme}>

          {
           theme?  <CiLight className="size-6 mr-9 my-auto" /> : <MdOutlineDarkMode className="size-6 mr-9" />
          }
       
          </button>

        
        </div>
   


        {user ? (
          <>
            <img src={user?.photoURL} alt="User" className="w-14 h-14 rounded-full mr-2 object-cover" />
            <button onClick={handleLogOut} className="btn">
              Sign Out
            </button>
          </>
        ) : (
          <>
            {" "}
            <Link
              to="/login"
              className={`btn ${theme? "text-white":"text-black shadow-lg"}  bg-transparent border-none hover:border-b-2`}
            >
              Log in
            </Link>
            <Link to="/register" className="btn text-white">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
