import axios from "axios";
import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { FaStar, FaRegStar } from "react-icons/fa";

const SessionDetailsCard = () => {
  const { id } = useParams();
  const sessions = useLoaderData();
  const navigate = useNavigate();

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await axios.get(
        "https://eduquest-server-side.vercel.app/reviews"
      );
      return result.data;
    },
  });

  const session = sessions.find((session) => session._id === id);
  const filteredReviews = reviews.filter((res) => res.sessionID === session._id);

  const { user, allUsers } = useAuth();
  const currentUser = allUsers.find((res) => res.email === user.email);

  const isGoing =
    new Date() < new Date(session.registrationEndDate) &&
    currentUser?.role === "student";

  const handleBookNow = (session) => {
    const { _id, ...others } = session;
    const postSession = { ...others, sessionID: _id, studentEmail: user.email };

    if (session.registrationFee > 0) {
      navigate("/payment", { state: { session } });
    } else {
      axios.post("https://eduquest-server-side.vercel.app/booked", postSession).then(() => {
        Swal.fire({
          title: "Booked",
          text: "Your session is booked.",
          icon: "success",
        });
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-11/12 mx-auto pt-32 mb-24">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0c423f] text-white text-center py-5 px-6">
          <h2 className="text-2xl font-bold">{session.sessionTitle}</h2>
          <p className="text-lg mt-2">{session.tutorName}</p>
        </div>

        {/* Details & Reviews Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Session Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700">Session Information</h3>
            <p className="text-gray-600"><strong className="text-gray-800">Tutor Email:</strong> {session.tutorEmail}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Description:</strong> {session.sessionDescription}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Duration:</strong> {session.sessionDuration}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Fee:</strong> ${session.registrationFee}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Start:</strong> {session.classStartDate}</p>
            <p className="text-gray-600"><strong className="text-gray-800">End:</strong> {session.classEndDate}</p>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Reviews</h3>
            {filteredReviews.length > 0 ? (
              <div className="mt-4 space-y-4 max-h-60 overflow-y-auto">
                {filteredReviews.map((res, index) => (
                  <div key={index} className="p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100">
                    <p className="text-gray-800"><strong>Review:</strong> {res.text}</p>
                    <p className="text-gray-600 flex items-center">
                      <strong>Rating:</strong>
                      {Array.from({ length: 5 }).map((_, i) => 
                        i < res.rating ? <FaStar key={i} className="mx-1 text-yellow-400" /> : <FaRegStar key={i} className="mx-1 text-gray-400" />
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center py-6">
          <button
            onClick={() => handleBookNow(session)}
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all ${
              isGoing ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isGoing}
          >
            {isGoing ? "Book Now" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsCard;
