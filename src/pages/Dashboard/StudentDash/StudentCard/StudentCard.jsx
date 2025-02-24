import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const StudentDetailsCard = () => {
  const { id } = useParams();
  const session = useLoaderData();
  const {user} = useAuth()
  // State to manage reviews
  const [reviews, setReviews] = useState([]);

  // State for form inputs
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  // Handle form submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !rating) {
      alert("Please provide a review and a rating.");
      return;
    }

    const newReview = {
      photo: user.photoURL,
      name: user.displayName,
      email:user.email,
      text: reviewText,
      rating: parseInt(rating),
      id: Date.now(),
      sessionID:session.sessionID // Unique ID for each review
    };
    console.log("Her is the rev",newReview);
    axios.post("https://eduquest-server-side.vercel.app/reviews",newReview)

    setReviews((prevReviews) => [...prevReviews, newReview]);
  
    setReviewText("");
    setRating("");
  };

  return (
    <div className="mt-12 w-11/12 mx-auto">
      {/* Session Details Card */}
      <div className="flex items-center justify-center min-h-screen">
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
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="max-w-lg mx-auto mt-16 bg-green-200 p-5 mb-10 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Write a Review
            </label>
            <textarea
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Rate out of 5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-4 shadow bg-green-300"
              >
                <p className="text-gray-700">{review.text}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Rating: {review.rating} / 5
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsCard;
