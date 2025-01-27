import React from 'react';

const Card = ({session,handleRequestSession}) => {
    return (
        <div className="max-w-md mx-auto h-full w-96 bg-green-500 shadow-lg rounded-lg ">
        <div className="p-6 text-black">
          <h2 className="text-xl font-bold mb-4">{session.sessionTitle}</h2>

   
          <p>
            <strong>Tutor Name:</strong> {session.tutorName}
          </p>
          <p>
            <strong>Tutor Email:</strong> {session.tutorEmail}
          </p>
          <p>
            <strong>Description: {session.sessionDescription}</strong> 
          </p>
          <p className="text-black">
              <strong className="text-black">
                Registration Start Date:
              </strong>{" "}
              {session.registrationStartDate}
            </p>
            <p className="text-black">
              <strong className="text-black">Registration End Date:</strong>{" "}
              {session.registrationEndDate}
            </p>
            <p className="text-black">
              <strong className="text-black">Class Start Date:</strong>{" "}
              {session.classStartDate}
            </p>
            <p className="text-black">
              <strong className="text-black">Class End Date:</strong>{" "}
              {session.classEndDate}
            </p>
            <p className="text-black">
              <strong className="text-black">Session Duration:</strong>{" "}
              {session.sessionDuration}
            </p>
            <p className="text-black">
              <strong className="text-black">Registration Fee:</strong>{" "}
              {session.registrationFee}
            </p>
        

          <button
            onClick={()=>handleRequestSession(session)}
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Request Session Creation
          </button>
        </div>
      </div>
    );
};

export default Card;