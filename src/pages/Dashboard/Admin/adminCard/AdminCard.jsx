

import React from 'react';

const AdminCard = ({ session, onStatusChange }) => {
  return (
    <div className="max-w-md mx-auto h-full w-96 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
  <div className="p-6 text-gray-800">
    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
      {session.sessionTitle}
    </h2>
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-500">
        <strong className="block text-gray-700">Tutor Name:</strong> 
        {session.tutorName}
      </p>
    </div>
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-500">
        <strong className="block text-gray-700">Email:</strong> 
        {session.tutorEmail}
      </p>
    </div>
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-500">
        <strong className="block text-gray-700">Status:</strong> 
        <span
          className={`inline-block py-1 px-3 text-sm font-medium rounded-lg text-white ${
            session.status === 'Accepted'
              ? 'bg-green-500'
              : session.status === 'Rejected'
              ? 'bg-red-500'
              : 'bg-purple-500'
          }`}
        >
          {session.status}
        </span>
      </p>
    </div>
    <div className="flex justify-between items-center mt-8 space-x-4">
      <button
        className="w-1/2 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
        onClick={() => onStatusChange(session)}
      >
        Change Status
      </button>
      <button
        className="w-1/2 py-2 px-4 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-all duration-200"
      >
        Details
      </button>
    </div>
  </div>
</div>

  );
};

export default AdminCard;
