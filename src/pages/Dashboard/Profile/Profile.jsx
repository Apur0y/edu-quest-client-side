import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useSecure";
import { useQuery } from "@tanstack/react-query";
import { LuBookOpenCheck } from "react-icons/lu";

import axios from "axios";
import AdminStat from "./AdminStat";
import TutorStat from "./TutorStat";
import StudentStat from "./StudentStat";

const Profile = () => {
  const { user } = useAuth();
 const [role, setRole] = useState([]);

  useEffect(() => {
    axios
      .get("https://eduquest-server-side.vercel.app/users")
      .then((res) => setRole(res.data));
  }, []);

  const currentRole = role?.find((res) => res.email == user.email);


  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-10 p-6 bg-[#008869] shadow-lg rounded-lg">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        My Profile
      </h1>
      <div className="flex flex-col text-white md:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={user?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-md"
          />
        </div>
        <div className="flex-1  text-lg">
          <h2 className="text-2xl font-semibold">
            Name: {user?.displayName || "N/A"}
          </h2>
          <p className="text-lg mt-2">Email: {user?.email || "N/A"}</p>
          <p className="mt-4 text-sm ">
            Joined on:{" "}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>


      <div>
        {
           currentRole?.role == 'student'? <><StudentStat></StudentStat></> : <>
           {
            currentRole?.role == 'admin'? <><AdminStat></AdminStat></> : <>
            {
              currentRole?.role=='tutor'?<><TutorStat></TutorStat></>:<></>
            }
            </>
           }
           
           </>
        }
      </div>

   
    </div>
  );
};

export default Profile;
