import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";
import img from "../../public/pic/dashboard.jpg";
import {
  FaBookmark,
  FaCircleArrowLeft,
  FaCircleArrowRight,
  FaUsersRectangle,
} from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { IoBookmarkOutline, IoBookOutline } from "react-icons/io5";
import { LuNotebook, LuNotebookPen, LuServer } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { FiBook } from "react-icons/fi";
import { SlBookOpen } from "react-icons/sl";
import { SiBookstack, SiWikibooks } from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { RiBookShelfLine } from "react-icons/ri";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaHandSparkles } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, student, setStudent } = useAuth();
  const [role, setRole] = useState([]);

  useEffect(() => {
    axios
      .get("https://eduquest-server-side.vercel.app/users")
      .then((res) => setRole(res.data));
  }, []);

  const currentRole = role?.find((res) => res.email == user.email);

  const [admin, setAdmin] = useState(false);
  const [tutor, setTutor] = useState(false);

  const [sidebar, setSidebar] = useState(false); // Sidebar starts hidden on mobile
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (currentRole?.role === "student") {
      setStudent(true);
    }
    if (currentRole?.role === "tutor") {
      setTutor(true);
    }
    if (currentRole?.role === "admin") {
      setAdmin(true);
    }
  }, [currentRole]);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebar(false);
    }
  };

 

  return (
    <div className="relative flex">
      {/* Sidebar - Hidden on mobile and collapsible */}
      <div
        className={`md:w-64 fixed md:relative z-50 bg-[#11645d] max-h-screen md:flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className=" md:mt-10">
          <Link to="/">
            <div className="md:flex flex-col justify-center items-center gap-5 hidden text-white font-semibold m-5">
              <img
                src="../../../../public/logo.png"
                className="w-20"
                alt="Logo"
              />
              <h1 className="text-xl">EduQuest</h1>
            </div>
          </Link>

          <div className=" flex justify-between">
            <NavLink
              onClick={closeSidebar}
              className=" text-white p-2 font-semibold flex md:hidden"
              to="/"
            >
              <IoMdHome className="my-auto  md:size-6 " />
            </NavLink>

            <div className="md:hidden  right-0 p-2 z-10">
              <button onClick={handleSidebar}>
                {sidebar ? (
                  <MdKeyboardDoubleArrowLeft className="text-green-500  size-5 " />
                ) : (
                  <MdKeyboardDoubleArrowRight className="text-green-500  md:size-7" />
                )}
              </button>
            </div>
          </div>

          {/* Menu Items - Stays at the Top */}
          <div className="">
            {student && (
              <ul className="menu text-white text-xs md:text-sm gap-2 md:gap-5">
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600  text-white px-4 py-2 font-semibold"
                    to="profile"
                  >
                    <CgProfile className=" md:size-6 " /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="bookedsession"
                  >
                    <IoBookmarkOutline className=" md:size-6" /> Booked Session
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="createnote"
                  >
                    <LuNotebookPen className=" md:size-6" /> Create Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="managenote"
                  >
                    <LuNotebook className=" md:size-6" /> Manage Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="materials"
                  >
                    <GiBookshelf className=" md:size-6" /> All Materials
                  </NavLink>
                </li>
              </ul>
            )}

            {tutor && (
              <ul className="menu text-white gap-5">
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="profile"
                  >
                    <CgProfile className=" md:size-6" /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="createsession"
                  >
                    <IoBookOutline className=" md:size-6" /> Create Session
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="createdsession"
                  >
                    <FiBook className=" md:size-6" /> All Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="uploadmaterials"
                  >
                    <SiWikibooks className=" md:size-6" /> Upload Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="uploadedmaterials"
                  >
                    <SlBookOpen className=" md:size-6" /> View All Materials
                  </NavLink>
                </li>
              </ul>
            )}

            {admin && (
              <ul className="menu text-white gap-5">
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="profile"
                  >
                    <CgProfile className=" md:size-6" /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="viewalluser"
                  >
                    <FaUsersRectangle className=" md:size-6" /> View All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="viewallsession"
                  >
                    <SiBookstack className=" md:size-6" /> View All Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={closeSidebar}
                    className="hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="viewallmaterials"
                  >
                    <RiBookShelfLine className=" md:size-6" /> View All
                    Materials
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
     
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-auto bg-[#eaf9f7] backdrop-blur-xl">
        {/* Sidebar Toggle Button */}
        <div className="md:hidden fixed top-0  z-10">
          <button onClick={handleSidebar}>
            {sidebar ? (
              <MdKeyboardDoubleArrowLeft className="text-green-500  md:size-6" />
            ) : (
              <>
               
          
              </>
            )}
          </button>
        </div>

        <div>

          {/* outlet navbar */}
          <div className="navbar sticky md:relative top-0 md:py-4 z-20 bg-[#eaf9f7]  text-black  shadow-sm">
            <div className="flex-none">
              <button   onClick={handleSidebar}  className="btn md:hidden btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>{" "}
                </svg>
              </button>
            </div>
            <div className="flex-1 md:ml-5">
              <div className="flex flex-col">
              <a className="flex font-bold btn-ghost md:text-2xl">
                Welcome {user.displayName.split(" ").slice(0, 1).join(" ")}{" "}
                <FaHandSparkles className="text-yellow-400 rotate-12 my-auto ml-1 md:size-6" />
              </a>
              <p className="text-sm hidden md:flex">Manage your work here with all control in your hands.</p>
              </div>
             
            </div>
            <div className="flex-none">
                {/* Home Button - Stays at the Bottom */}
        <div className=" ">
          <NavLink
            onClick={closeSidebar}
            className="hover:text-green-600 px-4 py-2 font-semibold flex "
            to="/"
          >
            <IoMdHome className="my-auto  md:size-10 mr-3 text-white bg-[#11645d] rounded-full p-2 " />
          </NavLink>
        </div>
            </div>
          </div>


          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
