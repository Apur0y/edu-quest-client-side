import React from 'react';

const ServiceCard = ({ value }) => {
  return (
    <div className="max-w-lg w-ful relative flex items-center h-60  text-black shadow-lg rounded-lg overflow-hidden">
      {/* Left Side - Image */}
      <img
        className=""
        src={value.picture}
        alt={`${value.title} image`}
      />
      <div className='bg-gradient-to-l from-black/50 to-black/95  absolute inset-0 z-3'></div>

      {/* Right Side - Content */}
      <div className="w-2/3 p-4 absolute z-4  text-white">
        <h2 className="text-2xl font-bold mb-2">{value.title}</h2>
        <p className="font-semibold mb-2">
          Tutors:{" "}
          <span className="font-normal">
            {value.tutors.map((tutor) => tutor.split(" ").slice(0, 2).join(" ")).join(" ")}
          </span>
        </p>
        <p className="font-semibold">
          Available Courses:{" "}
          <span className="font-normal  border-4 border-green-600 rounded-full p-2">{value.availableCourses}</span>
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
