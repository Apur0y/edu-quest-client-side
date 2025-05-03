import React from "react";

const TutorCard = ({ tutor }) => {
  return (
    <div className="w-64  overflow-hidden shadow-lg bg-neutral-900/70 text-white rounded-lg">
      <img
        className="w-full h-48 object-cover  "
        src={tutor.photoUrl}
        alt={`${tutor.name}'s profile`}
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold ">{tutor.name}</h2>
        <p>Software Engineer</p>
        {/* <p className="mt-2">Email: {tutor.email}</p> */}
      </div>
      
    </div>
  );
};

export default TutorCard;
