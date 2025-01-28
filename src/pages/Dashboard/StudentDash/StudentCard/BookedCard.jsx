import React from "react";
import { Link } from "react-router-dom";

const BookedCard = ({session}) => {
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
          <Link to={`/dashboard/bookedsession/${session._id}`} className="btn">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default BookedCard;
