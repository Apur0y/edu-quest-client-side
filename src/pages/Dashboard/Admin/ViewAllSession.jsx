import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useSecure";

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
      const res = await fetch(
        "https://eduquest-server-side.vercel.app/sessions"
      );
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
  });

  const sessions = allSessions.filter((res) => res.status !== "Rejected");
  const axiosSecure = useAxiosSecure();
  // Update session status
  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.put(`/sessions/${id}`, { status });
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
      await axiosSecure.put(`/sessions/${id}`, {
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
        axiosSecure
          .delete(`/sessions/${id}`)
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
    <div className="grid grid-cols-1 w-10/12 mx-auto lg:grid-cols-3 gap-5">
      {sessions.map((session) => (
        <div
          key={session._id}
          className="max-w-md mx-auto w-11/12 bg-white text-gray-800 shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
              {session.sessionTitle}
            </h2>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Tutor Name:</span>{" "}
                {session.tutorName}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {session.tutorEmail}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
                    session.status === "Accepted"
                      ? "bg-green-500"
                      : session.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-purple-500"
                  }`}
                >
                  {session.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {session.status === "Approved" ? (
                <>
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="flex-1 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="flex-1 py-2 text-red-600 bg-zinc-100 hover:bg-zinc-200  border-2 rounded-lg text-sm font-bold transition duration-200"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAccept(session)}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition duration-200"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(session._id, "Rejected")}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition duration-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/50 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#134E4A]/50 p-6 rounded-lg shadow-lg w-96">
            <h2 className="font-bold text-xl mb-4">
              Set Registration Fee for: {selectedSession.sessionTitle}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium   mb-2">
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
                <label htmlFor="fee" className="block text-sm font-medium ">
                  Registration Fee
                </label>
                <input
                  type="number"
                  id="fee"
                  value={selectedSession.sessionFee}
                  onChange={(e) => setSessionFee(Number(e.target.value))}
                  className="input input-bordered w-full mt-2"
                  placeholder="Enter fee"
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                className="bt text-white"
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
