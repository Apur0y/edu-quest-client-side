import React from 'react';
import { Link } from 'react-router-dom';

const StudyCard = ({ session }) => {

    const isOngoing = new Date() < new Date(session.registrationEndDate);


  return (
    <div className="max-w-md mx-auto  w-80 bg-[#1B3B39] text-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="p-6 flex h-64 flex-col justify-between ">
        <h2 className="text-2xl font-semibold  mb-4">
          {session.sessionTitle.split(" ").slice(0,3).join(" ")}
        </h2>
        <p className=" mb-2">
          <span className="font-medium">Tutor Name:</span> {session.tutorName}
        </p>
        <p className=" mb-4">
          <span className="font-medium">Description:</span> {session.sessionDescription.split(" ").slice(0,9).join(" ") + "..."}
        </p>
        <div className="flex items-center justify-between">
        <button
            className={`px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-300 ${
              isOngoing ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isOngoing}
          >
            {isOngoing ? "Ongoing" : "Closed"}
          </button>
          <Link to={`/sessions/${session._id}`}
            className="px-4 py-2 bg-[#f48c37] hover:bg-yellow-600 text-white text-sm font-medium rounded-md transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
