import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useSecure";

const ViewAllSession = () => {
  const [editingSession, setEditingSession] = useState(null); // track which session is being edited
  const [isFree, setIsFree] = useState(true);
  const [sessionFee, setSessionFee] = useState(0);

  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

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

  // Update status
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

  // Update fee inline
  const handleFeeUpdate = async (id) => {
    try {
      await axiosSecure.put(`/sessions/${id}`, {
        status: "Approved",
        isFree,
        amount: isFree ? 0 : sessionFee,
      });
      Swal.fire("Success!", "Session fee updated successfully", "success");
      setEditingSession(null);
      queryClient.invalidateQueries(["sessions"]);
    } catch (error) {
      console.error("Error updating session fee", error);
      Swal.fire("Error!", "Failed to update session fee.", "error");
    }
  };

  // Delete
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

  // Accept (approve + open edit mode for fee)
  const handleAccept = (session) => {
    handleStatusUpdate(session._id, "Approved");
    setEditingSession(session._id);
    setIsFree(true);
    setSessionFee(0);
  };

  if (isLoading) return <p>Loading sessions...</p>;
  if (isError) return <p>Failed to load sessions</p>;

  return (
    <div className="grid grid-cols-1 w-11/12 mx-auto gap-5 mt-7">
      {sessions.map((session) => (
        <div
          key={session._id}
          className="mx-auto w-11/12 bg-white text-gray-800 shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6 flex md:flex-row flex-col justify-between items-center">
            <img
              src={
                session?.image ||
                "https://www.shutterstock.com/image-illustration/modern-dynamic-blue-neuron-plasma-600nw-2146957609.jpg"
              }
              alt=""
              className="w-44 h-32 rounded-lg"
            />

            <div className="flex-1 ml-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {session.sessionTitle}
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Tutor:</span> {session.tutorName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Email:</span> {session.tutorEmail}
              </p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    session.status === "Approved"
                      ? "bg-green-500"
                      : session.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-purple-500"
                  }`}
                >
                  {session.status}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-5 md:mt-0">
              {editingSession === session._id ? (
                <>
                  {/* Inline edit fields */}
                  <select
                    value={isFree ? "free" : "paid"}
                    onChange={(e) => setIsFree(e.target.value === "free")}
                    className="select select-bordered w-full text-white"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>

                  {!isFree && (
                    <input
                      type="number"
                      value={sessionFee}
                      onChange={(e) => setSessionFee(Number(e.target.value))}
                      className="input input-bordered w-full text-white"
                      placeholder="Enter fee"
                    />
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFeeUpdate(session._id)}
                      className="btn bg-blue-600 text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSession(null)}
                      className="btn"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : session.status === "Approved" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingSession(session._id);
                      setIsFree(session.isFree);
                      setSessionFee(session.amount || 0);
                    }}
                    className="btn bg-neutral-700 hover:bg-neutral-600 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="btn text-red-600 bg-zinc-100 hover:bg-zinc-200 border-none font-bold"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(session)}
                    className="btn border-none bg-green-600 hover:bg-green-700 text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(session._id, "Rejected")}
                    className="btn border-none bg-red-500 hover:bg-red-600 text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAllSession;
