import React from "react";

const TutorCard = ({ tutor }) => {
  return (
    <div className="max-w-sm  overflow-hidden shadow-lg bg-[#1B3B39] text-white rounded-lg">
      <img
        className="w-full h-48 object-cover  "
        src={tutor.photoUrl}
        alt={`${tutor.name}'s profile`}
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
        <p className="">{tutor.email}</p>
      </div>
      
    </div>
  );
};

export default TutorCard;
