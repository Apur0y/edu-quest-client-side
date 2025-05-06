import React from "react";
import { Link } from "react-router-dom";

const BookedCard = ({session, buttonName}) => {
  return (
    <div className="max-w-md mx-auto w-72 bg-green-50 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {session.sessionTitle}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Tutor Name:</span> {session.tutorName}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Description:</span>{" "}
          {session.sessionDescription}
        </p>
        <div className="flex items-center justify-between">
          
          {
            buttonName === "View Details"? <Link to={`/dashboard/bookedsession/${session._id}`} className="btn">{buttonName}</Link>:
            <Link to={`/dashboard/materials/${session._id}`} className="btn">{buttonName}</Link>
          }
        </div>
      </div>
    </div>
  );
};

export default BookedCard;
