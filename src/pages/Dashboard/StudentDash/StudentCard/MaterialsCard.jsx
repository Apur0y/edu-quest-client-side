import React from "react";
import { useLoaderData } from "react-router-dom";

const MaterialsCard = () => {
  const material = useLoaderData(); // Get the materials data from the loader

  return (
    <div className="max-w-sm mx-auto bg-white my-12 shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <div className="p-6 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
          {material.title || "Untitled Material"}
        </h2>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">
            <strong className="block text-gray-700">Session ID:</strong>
            {material.sessionId}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">
            <strong className="block text-gray-700">Tutor Email:</strong>
            {material.tutorEmail}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">
            <strong className="block text-gray-700">Material Link:</strong>
            <a
              href={material.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 btn hover:text-blue-800"
            >
              View Drive
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaterialsCard;
