import React from 'react';
import { Link } from 'react-router-dom';

const StudyCard = ({ session }) => {
  return (
    <div className="max-w-md mx-auto w-80 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {session.sessionTitle}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Tutor Name:</span> {session.tutorName}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Description:</span> {session.sessionDescription}
        </p>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
            onClick={() => onStatusChange(session)}
          >
            Book Now
          </button>
          <Link to={`/sessions/${session._id}`}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
