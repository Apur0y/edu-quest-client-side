import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";
import img from "../../public/pic/dashboard.jpg";
import { FaBookmark, FaCircleArrowLeft, FaCircleArrowRight, FaUsersRectangle } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { CgProfile  } from "react-icons/cg";
import { IoBookmarkOutline, IoBookOutline } from "react-icons/io5";
import { LuNotebook, LuNotebookPen, LuServer } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { FiBook } from "react-icons/fi";
import { SlBookOpen } from "react-icons/sl";
import { SiBookstack, SiWikibooks } from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { RiBookShelfLine } from "react-icons/ri";

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

  const [sidebar, setSidebar] = useState(true);
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

  return (
    <div className="flex">
      <div
        className={`w-64 ${
          sidebar ? "hidden" : "flex"
        } min-h-screen z-50 bg-[#ffffff] md:flex flex-col`}
      >
        <div className="fixed  bg-[#0D3B37] mt-10">
          {/* Logo Section */}
          <Link to="/">
            <div className=" flex flex-col justify-center items-center gap-5  text-white font-semibold m-5">
              <img
                src="../../../../public/logo.png"
                className="w-20"
                alt="Logo"
              />
              <h1 className="text-xl">EduQuest</h1>
            </div>
          </Link>

          {/* Menu Items - Stays at the Top */}
          <div className="flex-grow">
            {student && (
              <ul className="menu text-white gap-5">
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="profile"
                  >
                    <CgProfile className="size-6"  />Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="bookedsession"
                  >
                   <IoBookmarkOutline className="size-6" /> Booked Session
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="createnote"
                  >
                    <LuNotebookPen className="size-6"  /> Create Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="managenote"
                  >
                   <LuNotebook className="size-6"  /> Manage Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="materials"
                  >
                   <GiBookshelf className="size-6"  /> All Materials
                  </NavLink>
                </li>
              </ul>
            )}

            {tutor && (
              <ul className="menu text-white gap-5">
                  <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="profile"
                  >
                    <CgProfile className="size-6"  />Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="createsession"
                  >
                  <IoBookOutline className="size-6" />  Create Session
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="createdsession"
                  >
                    <FiBook className="size-6" />All Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="uploadmaterials"
                  >
                  <SiWikibooks className="size-6" />  Upload Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="uploadedmaterials"
                  >
                   <SlBookOpen className="size-6" /> View All Materials
                  </NavLink>
                </li>
              </ul>
            )}

            {admin && (
              <ul className="menu text-white gap-5">
                  <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="profile"
                  >
                    <CgProfile className="size-6"  />Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="viewalluser"
                  >
                  <FaUsersRectangle  className="size-6" />
                  View All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="viewallsession"
                  >
                   <SiBookstack  className="size-6" /> View All Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                    to="viewallmaterials"
                  >
                  <RiBookShelfLine  className="size-6" />  View All Materials
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
        {/* Home Button - Stays at the Bottom */}
        <div className="fixed bottom-0 w-64 ">
          <NavLink
            className=" hover:bg-green-600 text-white px-4 py-2 font-semibold flex mb-6"
            to="/"
          >
            <IoMdHome className="my-auto size-6 mr-3 " /> Home
          </NavLink>
        </div>
      </div>

      <div
        style={{
          // backgroundImage: `url(${img})`,
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat",
          position: "relative", // Allows overlaying content
        }}
        className="flex-1  min-h-screen bg-[#1B3B39] backdrop-blur-xl"
      >
        <div
        className="fixed top-0"
          style={{
            backgroundColor: "rgba(248, 249, 250, 0.95)", // Adjust opacity herergb(72, 77, 87)
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1, // Keeps the overlay behind the child content
          }}
          // className="backdrop-blur-sm"
        >
          <button
          
          onClick={handleSidebar}>
            {sidebar ? (
              <FaCircleArrowRight className="text-yellow-500 md:hidden" />
            ) : (
              <FaCircleArrowLeft className="text-yellow-500 md:hidden" />
            )}
          </button>
        </div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
