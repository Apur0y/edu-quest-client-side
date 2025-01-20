import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user,logOut} = useContext(AuthContext);

  const handleLogOut =()=>{
logOut()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link>Study Session</Link>
      </li>
      <li>
        <Link>Dashboard</Link>
      </li>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 z-10 text-white py-4 md:px-14 transition-all duration-300 ${
        isScrolled ? "bg-gray-800 shadow-lg" : "bg-transparent"
      }`}
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img src="../../../../public/logo.png" className="w-12" alt="" />
        <h1 className="text-xl font-semibold ml-2 hidden md:flex">EduQuest</h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end ">
        {
          user?<><button onClick={handleLogOut} className="btn">Sign Out</button></> : <>  <Link
          to="/login"
          className="btn text-white bg-transparent border-none hover:border-b-2"
        >
          Log in
        </Link>
        <Link to='/register' className="btn text-white">Sign Up</Link></>
        }
      
      </div>
    </div>
  );
};

export default Navbar;
