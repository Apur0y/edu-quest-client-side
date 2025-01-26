import React from "react";

const StudentDetailsCard = () => {

    const { id } = useParams();
    const sessions = useLoaderData();
    const session = sessions.find((session) => session._id === id);
  console.log(id, session,sessions);
  
  
    // const isGoing = new Date() < new Date(session.registrationEndDate) 
  
    // const handleBookNow = (session) => {
    //   console.log(session);
    //   const {_id, ...postSession} =session 
    //   axios
    //     .post("http://localhost:5000/booked", postSession)
    //     .then((res) => console.log(res.data));
    // };
  

  return (
    
      <div className="flex items-center justify-center min-h-screen my-24 md:mt-16 w-11/12 mx-auto">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-green-500 text-white text-center p-6">
            <h2 className="text-2xl underline font-bold">Session Details</h2>
            <p className="text-xl font-bold mt-2">{session.sessionTitle}</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Session Information
              </h3>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">
                <strong className="text-gray-800">Tutor Name:</strong>{" "}
                {session.tutorName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Tutor Email:</strong>{" "}
                {session.tutorEmail}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Description:</strong>{" "}
                {session.sessionDescription}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">
                  Registration Start Date:
                </strong>{" "}
                {session.registrationStartDate}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">
                  Registration End Date:
                </strong>{" "}
                {session.registrationEndDate}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Class Start Date:</strong>{" "}
                {session.classStartDate}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Class End Date:</strong>{" "}
                {session.classEndDate}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Session Duration:</strong>{" "}
                {session.sessionDuration}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Registration Fee:</strong>{" "}
                {session.registrationFee}
              </p>
            </div>
            <div className="flex justify-end mt-6">
        
            </div>
          </div>
        </div>
      </div>

  );
};

export default StudentDetailsCard;
