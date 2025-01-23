// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import React from 'react';
// import AdminCard from './adminCard/adminCard';

// const ViewAllSession = () => {

//     const queryClient = useQueryClient();


//     const {data:sessions, isLoading,
//         isError,} = useQuery({
//         queryKey:["sessions"],
//         queryFn: async ()=>{
//             const res = await fetch("http://localhost:5000/sessions")
//             return res.json()
//         }
//     })

//     const mutation = useMutation(
//         async ({id,status})=>{
//             const res = fetch(`http://localhost:5000/sessions/${id}`,{
//                 method:"PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ status }),
//             });
//             if (!res.ok) throw new Error("Failed to update session status");
//             return res.json();
//         },
//         onSuccess: (updatedSession, {id})=>{
            
//         }
//     )

    
//   if (isLoading) return <p>Loading users...</p>;
//   if (isError) return <p>Failed to load users</p>;


//     return (
//         <div className='grid grid-cols-3 gap-4 my-6'>
//             {
//                 sessions.map(session=> <AdminCard session={session}></AdminCard>)
//             }
//         </div>
//     );
// };

// export default ViewAllSession;



import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import AdminCard from './adminCard/adminCard';

const ViewAllSession = () => {
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState(null); // Modal state

  // Fetch all sessions
  const { data: sessions = [], isLoading, isError } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/sessions?filter=Rejected');
      if (!res.ok) throw new Error('Failed to fetch sessions');
      return res.json();
    },
  });

  const updateSessionStatus = useMutation({
    mutationFn: async ({ sessionId, status }) => {
      const res = await fetch(`http://localhost:5000/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: (updatedSession, { sessionId, status }) => {
      // Update the cached data in real-time
      queryClient.setQueryData(['sessions'], (oldSessions) => 
        oldSessions.filter((session) => 
          status === 'Rejected' ? session._id !== sessionId : true
        ).map((session) => 
          session._id === sessionId ? { ...session, status } : session
        )
      );
      setSelectedSession(null); // Close the modal
    },
  });

  const handleStatusUpdate = (status) => {
        if (!selectedSession) return;
        updateSessionStatus.mutate({ sessionId: selectedSession._id, status });  
  };

  if (isLoading) return <p>Loading sessions...</p>;
  if (isError) return <p>Failed to load sessions</p>;

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      {sessions.map((session) => (
        <AdminCard
          key={session._id}
          session={session}
          onStatusChange={(session) => setSelectedSession(session)}
        />
      ))}

      {selectedSession && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-xl mb-4">
              Update Status for: {selectedSession.sessionTitle}
            </h2>
            <p>
              Current Status:{' '}
              <span className="font-semibold text-purple-600">
                {selectedSession.status}
              </span>
            </p>
            <div className="modal-action">
              <button
                className="btn bg-gray-500"
                onClick={() => setSelectedSession(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-green-600"
                onClick={() => handleStatusUpdate('Accepted')}
              >
                Accept
              </button>
              <button
                className="btn bg-red-600"
                onClick={() => handleStatusUpdate('Rejected')}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllSession;
