import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

const Card = ({ session, handleRequestSession }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" relative mx-auto h-fit  bg-white p-5 shadow-lg rounded-lg flex flex-col lg:flex-row ">
      <div className="absolute right-0 top-0 m-2">
      <FiEdit className="size-7 cursor-pointer bg-white p-1"/>
      </div>


      <img src="https://www.shutterstock.com/image-illustration/modern-dynamic-blue-neuron-plasma-600nw-2146957609.jpg" alt="" className="h-44 md:h-72  my-auto object-cover rounded-md" />



      <div className="px-6 pt-4 md:pt-0  text-black">
      
        <h2 className="text-xl font-bold mb-4">{session.sessionTitle}</h2>

        <p>
          <strong>Tutor Name:</strong> {session.tutorName}
        </p>
        <p>
          <strong>Tutor Email:</strong> {session.tutorEmail}
        </p>

        {/* Description with See More/Less button */}
        <p>
          <strong>Description:</strong>{" "}
          {isExpanded
            ? session.sessionDescription
            : session.sessionDescription.split(" ").slice(0, 7).join(" ") + "..."}{" "}
          <button
            onClick={toggleDescription}
            className="text-blue-500 underline ml-2"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        </p>

        <p>
          <strong>Registration Start Date:</strong> {session.registrationStartDate}
        </p>
        <p>
          <strong>Registration End Date:</strong> {session.registrationEndDate}
        </p>
        <p>
          <strong>Class Start Date:</strong> {session.classStartDate}
        </p>
        <p>
          <strong>Class End Date:</strong> {session.classEndDate}
        </p>
        <p>
          <strong>Session Duration:</strong> {session.sessionDuration} hours
        </p>
        <p>
          <strong>Registration Fee:</strong> ${session.registrationFee}
        </p>
        <p>
          <strong>Status:</strong> {session.status}
        </p>

        {/* Conditional rendering for request button */}
        {session.status === "Rejected" && (
          <button
            onClick={() => handleRequestSession(session)}
            className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-500 transition duration-300"
          >
            Send Request
          </button>
        )}
        
      </div>
     
    </div>
  );
};

export default Card;
