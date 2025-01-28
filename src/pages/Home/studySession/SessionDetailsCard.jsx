import axios from "axios";
import React from "react";
import { useAsyncValue, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const SessionDetailsCard = () => {
  
  const { id } = useParams();
  const sessions = useLoaderData();
  const navigate = useNavigate()
  const session = sessions.find((session) => session._id === id);


  const {user,allUsers} = useAuth();
  const currentUser= allUsers.find(res=>res.email == user.email)

  const isGoing = 
  new Date() < new Date(session.registrationEndDate) && 
  currentUser.role === "student";


  const handleBookNow = (session) => {

    const { _id, ...others } = session;
    const postSession = { ...others, sessionID: _id,studentEmail: user.email };


    if(session.registrationFee > 0){
      navigate("/payment",{ state: {session} });


    }
    else{
      axios.post("https://eduquest-server-side.vercel.app/booked", postSession).then((res) => {
        Swal.fire({
          title: "Booked",
          text: "Your Session in Booked.",
          icon: "success",
        });
        console.log(res.data);
      });
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen my-24 md:mt-16 w-11/12 mx-auto">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-green-500 text-white text-center p-6">
          <h2 className="text-2xl underline font-bold">Session Details</h2>
          <p className="text-xl font-bold mt-2">{session.sessionTitle}</p>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Session Information
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-gray-600">
              <strong className="text-gray-800">Tutor Name:</strong>{" "}
              {session.tutorName}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Tutor Email:</strong>{" "}
              {session.tutorEmail}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Description:</strong>{" "}
              {session.sessionDescription}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">
                Registration Start Date:
              </strong>{" "}
              {session.registrationStartDate}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Registration End Date:</strong>{" "}
              {session.registrationEndDate}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Class Start Date:</strong>{" "}
              {session.classStartDate}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Class End Date:</strong>{" "}
              {session.classEndDate}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Session Duration:</strong>{" "}
              {session.sessionDuration}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Registration Fee:</strong>{" "}
              {session.registrationFee}
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => handleBookNow(session)}
              className={`px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md ${
                isGoing ? "hover:bg-green-600" : "bg-slate-500"
              }  transition-all`}
              disabled={!isGoing}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsCard;
