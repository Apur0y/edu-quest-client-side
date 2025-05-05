import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useSecure";
import { useQuery } from "@tanstack/react-query";
import { LuBookOpenCheck } from "react-icons/lu";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage
import { doc, updateDoc } from "firebase/firestore"; // Firestore
import { storage, db } from "../../../firebase/firebase.init";

import axios from "axios";
import AdminStat from "./AdminStat";
import TutorStat from "./TutorStat";
import StudentStat from "./StudentStat";
import { IoCameraSharp } from "react-icons/io5";

const Profile = ({currentImageUrl}) => {
  const { user } = useAuth();
 const [role, setRole] = useState([]);


  useEffect(() => {
    axios
      .get("https://eduquest-server-side.vercel.app/users")
      .then((res) => setRole(res.data));
  }, []);

  const currentRole = role?.find((res) => res.email == user.email);

const handlephotoChange=()=>{
  console.log("hjkjerhw");
}

const [image, setImage] = useState(null);        // Stores preview image
const inputRef = useRef(null);                   // Ref to hidden input

const handleButtonClick = () => {
  inputRef.current.click();                      // Open file selector
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);                          // Set preview
    // You can also store the file itself for upload later
  }
}

  return (
    <div className="w-11/12  mx-auto mt-10 p-6 text-black ">
      <div className="flex flex-col  md:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={image || user?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-md"
          />
          <div
          onClick={handleButtonClick}
          className="absolute bottom-0 right-2">
            
          <IoCameraSharp className="bg-green-700 text-white border-2 p-2 rounded-full size-9" />

          </div>
         
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


    <div className="p-4 text-center hidden">
      <div className="mb-4">
        <img
          src={image || "/default-avatar.png"}       // Fallback default avatar
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full mx-auto"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit Profile Photo
      </button>
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
