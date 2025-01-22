import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";
import img from "../../public/pic/dashboard.jpg";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users")
    .then((res) => setRole(res.data));
  }, []);
  
  const currentRole = role?.find((res) => res.email == user.email);
  console.log(currentRole);
  
  const [admin, setAdmin] = useState(false);
  const [tutor, setTutor] = useState(false);
  const [student, setStudent] = useState(false);

  const [sidebar, setSidebar] = useState(true);
 
  
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
        } min-h-screen bg-teal-500 md:flex justify-between flex-col`}
      >
        {/* Student */}
        <div>
          {student ? (
            <ul className="menu text-white gap-5 ">
              <Link to="/">
                <div className="flex text-white font-semibold m-5">
                  <img
                    src="../../../../public/logo.png"
                    className="w-12"
                    alt=""
                  />
                  <h1 className="text-xl ">EduQuest</h1>
                </div>
              </Link>
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
          ) : (
            <></>
          )}
        </div>

        {/* Tutor */}

        <div>
          {tutor ? (
            <ul className="menu text-white gap-5 ">
              <Link to="/">
                <div className="flex text-white font-semibold pr-6 md:pr-0 m-5">
                  <img
                    src="../../../../public/logo.png"
                    className="w-12"
                    alt=""
                  />
                  <h1 className="text-xl ">EduQuest</h1>
                </div>
              </Link>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="createsession"
                >
                  Create Session
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="createdsession"
                >
                  All Session
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="uploadmaterials"
                >
                  Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="uploadedmaterials"
                >
                  View All Materials
                </NavLink>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>

        {/* Admin */}
        <div>
          {admin ? (
            <ul className="menu text-white gap-5 ">
              <Link to="/">
                <div className="flex text-white font-semibold m-5">
                  <img
                    src="../../../../public/logo.png"
                    className="w-12"
                    alt=""
                  />
                  <h1 className="text-xl ">EduQuest</h1>
                </div>
              </Link>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="viewalluser"
                >
                  View all users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="viewallsession"
                >
                  View all study session
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold"
                  to="viewallmaterials"
                >
                  View all materials
                </NavLink>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>

        <NavLink
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-semibold flex mb-6"
          to="/"
        >
          <IoMdHome className="my-auto size-6 mr-3" /> Home
        </NavLink>
      </div>

      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat",
          position: "relative", // Allows overlaying content
        }}
        className="flex-1 hero min-h-screen"
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.35)", // Adjust opacity here
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
