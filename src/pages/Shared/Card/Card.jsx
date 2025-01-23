import React from 'react';

const Card = ({session,handleRequestSession}) => {
    return (
        <div className="max-w-md mx-auto h-full w-96 bg-green-500 shadow-lg rounded-lg ">
        <div className="p-6 text-black">
          <h2 className="text-xl font-bold mb-4">Create Study Session</h2>

          <p>
            <strong>Session Title:</strong> Sample Study Session
          </p>
          <p>
            <strong>Tutor Name:</strong> {session.tutorName}
          </p>
          <p>
            <strong>Tutor Email:</strong> {session.tutorEmail}
          </p>
          <p>
            <strong>Description: {session.sessionDescription}</strong> 
          </p>
          <p>
            <strong>Registration Start Date:</strong> 2025-01-30
          </p>
          <p>
            <strong>Registration End Date:</strong> 2025-02-10
          </p>
          <p>
            <strong>Class Start Date:</strong> 2025-02-15
          </p>
          <p>
            <strong>Class End Date:</strong> 2025-02-25
          </p>
          <p>
            <strong>Session Duration:</strong> 10 Days
          </p>
          <p>
            <strong>Registration Fee:</strong> $0 (Default)
          </p>
          <p>
            <strong>Status:</strong> <span className='py-1 px-3 bg-purple-600 font-semibold rounded-lg'>Pending</span>
          </p>

          <button
            onClick={handleRequestSession}
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Request Session Creation
          </button>
        </div>
      </div>
    );
};

export default Card;