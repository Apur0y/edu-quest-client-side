// import React from 'react';

// const AdminCard = ({session}) => {
//     return (
//         <div className="max-w-md mx-auto h-full w-96 bg-white shadow-lg rounded-lg ">
//         <div className="p-6 text-black">
//           <h2 className="text-xl font-bold mb-4">Create Study Session</h2>

//           <p>
//             <strong>Session Title:</strong> Sample Study Session
//           </p>
//           <p>
//             <strong>Tutor Name:</strong> {session.tutorName}
//           </p>
//           <p>
//             <strong>Tutor Email:</strong> {session.tutorEmail}
//           </p>
//           <p>
//             <strong>Description: {session.sessionDescription}</strong> 
//           </p>
//           <p>
//             <strong>Registration Start Date:</strong> 2025-01-30
//           </p>
//           <p>
//             <strong>Registration End Date:</strong> 2025-02-10
//           </p>
//           <p>
//             <strong>Class Start Date:</strong> 2025-02-15
//           </p>
//           <p>
//             <strong>Class End Date:</strong> 2025-02-25
//           </p>
//           <p>
//             <strong>Session Duration:</strong> 10 Days
//           </p>
//           <p>
//             <strong>Registration Fee:</strong> $0 (Default)
//           </p>
//           <p>
//             <strong>Status:</strong> <span className='py-1 px-3 bg-purple-600 font-semibold rounded-lg'>Pending</span>
//           </p>

//           <div className='flex justify-between mt-8'>
//             <button className='btn bg-red-600 border-none text-white'>Reject</button>
//             <button className='btn bg-green-600 border-none text-white'>Approve</button>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default AdminCard;


import React from 'react';

const AdminCard = ({ session, onStatusChange }) => {
  return (
    <div className="max-w-md mx-auto h-full w-96 bg-green-300 shadow-lg rounded-lg">
      <div className="p-6 text-black">
        <h2 className="text-xl font-bold mb-4">{session.sessionTitle}</h2>
        <p>
          <strong>Tutor Name:</strong> {session.tutorName}
        </p>
        <p>
          <strong>Email:</strong> {session.tutorEmail}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={`py-1 px-3 font-semibold rounded-lg ${
              session.status === 'Accepted'
                ? 'bg-green-600'
                : session.status === 'Rejected'
                ? 'bg-red-600'
                : 'bg-purple-600'
            }`}
          >
            {session.status}
          </span>
        </p>
        <div className="flex justify-between mt-8">
          <button
            className="btn bg-blue-600 border-none text-white"
            onClick={() => onStatusChange(session)}
          >
            Change Status
          </button>
          <button className='btn bg-yellow-600 border-none text-white'>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
