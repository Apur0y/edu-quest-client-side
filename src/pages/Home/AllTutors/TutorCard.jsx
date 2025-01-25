import React from "react";

const TutorCard = ({ tutor }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border">
      <img
        className="w-full h-48 object-cover p-4 "
        src={tutor.photoUrl}
        alt={`${tutor.name}'s profile`}
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
        <p className="text-gray-600">{tutor.email}</p>
      </div>
      
    </div>
  );
};

export default TutorCard;
