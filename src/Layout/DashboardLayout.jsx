import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";
import img from "../../public/pic/dashboard.jpg";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import axios from "axios";

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
        } min-h-screen bg-slate-700  md:flex flex-col`}
      >
      <div className="fixed w-64">
          {/* Logo Section */}
          <Link to="/">
          <div className=" flex flex-col justify-center items-center gap-5 mt6 text-white font-semibold m-5">
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
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="bookedsession"
                >
                  Booked Session
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="createnote"
                >
                  Create Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="managenote"
                >
                  Manage Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="materials"
                >
                  All Materials
                </NavLink>
              </li>
            </ul>
          )}

          {tutor && (
            <ul className="menu text-white gap-5">
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="createsession"
                >
                  Create Session
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="createdsession"
                >
                  All Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="uploadmaterials"
                >
                  Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="uploadedmaterials"
                >
                  View All Materials
                </NavLink>
              </li>
            </ul>
          )}

          {admin && (
            <ul className="menu text-white gap-5">
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="viewalluser"
                >
                  View All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="viewallsession"
                >
                  View All Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" hover:bg-green-600 text-white px-4 py-2 font-semibold"
                  to="viewallmaterials"
                >
                  View All Materials
                </NavLink>
              </li>
            </ul>
          )}
        </div>

      </div>
        {/* Home Button - Stays at the Bottom */}
      <div className="fixed bottom-0 w-full">
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
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat",
          position: "relative", // Allows overlaying content
        }}
        className="flex-1  min-h-screen bg-zinc-500 backdrop-blur-xl"
      >
        <div
          style={{
            backgroundColor: "rgba(72, 77, 87, 0.90)", // Adjust opacity herergb(72, 77, 87)
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1, // Keeps the overlay behind the child content
          }}
        >
          <button onClick={handleSidebar}>
            {sidebar ? (
              <FaCircleArrowRight className="text-white md:hidden" />
            ) : (
              <FaCircleArrowLeft className="text-white md:hidden" />
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
