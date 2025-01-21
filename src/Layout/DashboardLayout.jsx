import React from "react";
import { IoMdHome } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-purple-600 flex justify-between flex-col">
        
        <ul className="menu text-white gap-5 ">
        <Link to='/'>
        <div className="flex text-white font-semibold m-5">
          <img src="../../../../public/logo.png" className="w-12" alt="" />
          <h1 className="text-xl ">EduQuest</h1>
        </div></Link>
          <li>
            <NavLink
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
              to="bookedsession"
            >
              Booked Session
            </NavLink>
          </li>
          <li>
            <NavLink
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
              to="createnote"
            >
              Create Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
              to="managenote"
            >
              Manage Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
              to="materials"
            >
              All Materials
            </NavLink>
          </li>
        </ul>

        <NavLink
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold flex mb-6"
          to="/"
        >
          <IoMdHome className="my-auto size-6 mr-3" /> Home
        </NavLink>
      </div>

      <div className="flex-1 bg-white">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
