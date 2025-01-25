import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import AdminCard from "./adminCard/adminCard";

const ViewAllSession = () => {
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState(null); // Modal state
  const [isFree, setIsFree] = useState(true); // Session type state
  const [amount, setAmount] = useState(0); // Amount state

  // Fetch all sessions
  const { data: sessions = [], isLoading, isError } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sessions?filter=Rejected");
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
  });

  // Mutation for updating session status and payment details
  const updateSessionStatus = useMutation({
    mutationFn: async ({ sessionId, status, isFree, amount }) => {
      const res = await fetch(`http://localhost:5000/sessions/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, isFree, amount }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: (updatedSession, { sessionId, status }) => {
      // Update the cached data in real-time
      queryClient.setQueryData(["sessions"], (oldSessions) =>
        oldSessions
          .filter((session) =>
            status === "Rejected" ? session._id !== sessionId : true
          )
          .map((session) =>
            session._id === sessionId ? { ...session, status } : session
          )
      );
      setSelectedSession(null); // Close the modal
    },
  });

  const handleStatusUpdate = (status) => {
    if (!selectedSession) return;
    updateSessionStatus.mutate({
      sessionId: selectedSession._id,
      status,
      isFree,
      amount: isFree ? 0 : amount,
    });
  };

  if (isLoading) return <p>Loading sessions...</p>;
  if (isError) return <p>Failed to load sessions</p>;

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      {sessions.map((session) => (
        <AdminCard
          key={session._id}
          session={session}
          handleStatusUpdate={handleStatusUpdate}
          onStatusChange={(session) => {
            setSelectedSession(session);
            setIsFree(true); // Default to "Free" when opening the modal
            setAmount(0); // Reset amount
          }}
        />
      ))}

      {selectedSession && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-xl mb-4">
              Update Status for: {selectedSession.sessionTitle}
            </h2>
            <p>
              Current Status:{" "}
              <span className="font-semibold text-purple-600">
                {selectedSession.status}
              </span>
            </p>

            {/* Radio Buttons for Free/Paid */}
            <div className="my-4">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="sessionType"
                  value="free"
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                  className="mr-2"
                />
                Free
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sessionType"
                  value="paid"
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                  className="mr-2"
                />
                Paid
              </label>
            </div>

            {/* Amount Input */}
            {!isFree && (
              <div className="my-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Amount (in USD)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="btn bg-green-600"
                onClick={() => handleStatusUpdate("Accepted")}
              >
                Accept
              </button>
              <button
                className="btn bg-red-600"
                onClick={() => handleStatusUpdate("Rejected")}
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
