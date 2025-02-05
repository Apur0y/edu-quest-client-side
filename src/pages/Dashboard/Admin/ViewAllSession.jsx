import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ViewAllSession = () => {
  const [selectedSession, setSelectedSession] = useState(null); // Modal state
  const [isFree, setIsFree] = useState(true); // Track if session is free or paid
  const [sessionFee, setSessionFee] = useState(0); // Registration Fee for paid session

  const queryClient = useQueryClient();

  // Fetch all sessions
  const {
    data: allSessions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sessions");
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
  });

  const sessions = allSessions.filter((res) => res.status !== "Rejected");

  // Update session status
  const handleStatusUpdate = async (id, status) => {
    try {

      await axios.put(`http://localhost:5000/sessions/${id}`, { status });
      Swal.fire("Success!", `Session status updated to ${status}`, "success");
      queryClient.invalidateQueries(["sessions"]);
    } catch (error) {
      console.error("Error updating session status", error);
      Swal.fire("Error!", "Failed to update session status.", "error");
    }
  };

  // Update session fee
  const handleFeeUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/sessions/${id}`, {
        status: "Approved",
        isFree,
        amount: isFree ? 0 : sessionFee,
      });
      Swal.fire("Success!", "Session fee updated successfully", "success");
      setSelectedSession(null);
      queryClient.invalidateQueries(["sessions"]);
    } catch (error) {
      console.error("Error updating session fee", error);
      Swal.fire("Error!", "Failed to update session fee.", "error");
    }
  };

  // Delete a session
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/sessions/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Session has been deleted.", "success");
            queryClient.invalidateQueries(["sessions"]);
          })
          .catch((err) => {
            console.error("Failed to delete session:", err);
            Swal.fire("Error!", "Failed to delete session.", "error");
          });
      }
    });
  };

  // Open modal for accepting session
  const handleAccept = (session) => {
    setSelectedSession(session);
    setIsFree(true); // Default to free session
    setSessionFee(0); // Clear fee
  };

  if (isLoading) return <p>Loading sessions...</p>;
  if (isError) return <p>Failed to load sessions</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {sessions.map((session) => (
        <div
          key={session._id}
          className="max-w-md mx-auto h-full w-11/12 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200"
        >
          <div className="p-6 text-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
              {session.sessionTitle}
            </h2>
            <p className="text-sm font-medium text-gray-500 mb-4">
              <strong className="block text-gray-700">Tutor Name:</strong>
              {session.tutorName}
            </p>
            <p className="text-sm font-medium text-gray-500 mb-4">
              <strong className="block text-gray-700">Email:</strong>
              {session.tutorEmail}
            </p>
            <p className="text-sm font-medium text-gray-500 mb-6">
              <strong className="block text-gray-700">Status:</strong>
              <span
                className={`inline-block py-1 px-3 text-sm font-medium rounded-lg text-white ${
                  session.status === "Accepted"
                    ? "bg-green-500"
                    : session.status === "Rejected"
                    ? "bg-red-500"
                    : "bg-purple-500"
                }`}
              >
                {session.status}
              </span>
            </p>

            <div className="flex justify-between items-center mt-8 space-x-4">
              {session.status === "Approved" ? (
                <>
                  <button
                    className="w-1/2 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                    onClick={() => setSelectedSession(session)}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="w-1/2 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-1/2 py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200"
                    onClick={() => handleAccept(session)}
                  >
                    Accept
                  </button>
                  <button
                    className="w-1/2 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200"
                    onClick={() => handleStatusUpdate(session._id, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Modal for Session Fee Update */}
      {selectedSession && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-xl mb-4">
              Set Registration Fee for: {selectedSession.sessionTitle}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is this session free?
              </label>
              <select
                value={isFree ? "free" : "paid"}
                onChange={(e) => setIsFree(e.target.value === "free")}
                className="select select-bordered w-full"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            {!isFree && (
              <div className="mb-4">
                <label htmlFor="fee" className="block text-sm font-medium text-gray-700">
                  Registration Fee
                </label>
                <input
                  type="number"
                  id="fee"
                  value={sessionFee}
                  onChange={(e) => setSessionFee(Number(e.target.value))}
                  className="input input-bordered w-full mt-2"
                  placeholder="Enter fee"
                />
              </div>
            )}
            <div className="modal-action">
              <button
                className="btn bg-gray-500"
                onClick={() => setSelectedSession(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-blue-600 text-white"
                onClick={() => handleFeeUpdate(selectedSession._id)}
              >
                Confirm
              </button>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ViewAllSession;
