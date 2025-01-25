import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const CreateNotes = ({ userEmail }) => {

    const {user} = useAuth();
  const [formData, setFormData] = useState({
    email: user.email || "",
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = formData;


    axios.post("http://localhost:5000/notes",formData)
    .then((res)=>{
        console.log(res.data)
    })

    // Submit logic here (e.g., API call)
    console.log("Form submitted:", formData);
    setError(""); // Clear errors on successful submission

    // Reset form
    setFormData((prev) => ({
      ...prev,
      title: "",
      description: "",
    }));
  };




  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-green-50 shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Create Your Note
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field (ReadOnly) */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the note title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your note description here..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNotes;
