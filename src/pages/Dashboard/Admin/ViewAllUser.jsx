import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const ViewAllUser = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState([]);

  // Fetch users using React Query
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users</p>;

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserUpdate = (user) => {
    setUser(user);
    document.getElementById("my_modal_5").showModal();
  };

  const handleUpdateButton = (event) => {
    event.preventDefault();
    const role = event.target.role.value;
    console.log(role);
    axios.put("http://localhost:5000/users", {
      _id: user._id,
      role: role
    })
    .then(res => console.log(res.data.message))
    .catch(error => console.error("There was an error updating the user role!", error));

    console.log("Click btn");
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-6">All Users</h1>

      {/* Search Bar */}
      <div className="mb-6 ml-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table Headings */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-t-lg w-full">
        <p className="flex-grow text-gray-800 font-bold text-center">Photo</p>
        <p className="flex-grow text-gray-800 font-bold text-center">Name</p>
        <p className="flex-grow text-gray-800 font-bold text-center">Email</p>
        <p className="flex-grow text-gray-800 font-bold text-center">Role</p>
        <p className="flex-grow text-gray-800 font-bold text-center">Action</p>
      </div>

      {/* User Rows */}
      <div className="w-full">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-transparent font-bold text-white shadow-sm p-4 border-b border-gray-100 w-full"
          >
            {/* Photo */}
            <div className="flex-grow flex justify-center">
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            </div>

            {/* Name */}
            <div className="flex-grow text-center">
              <h3 className="text-lg font-medium">{user.name}</h3>
            </div>

            {/* Email */}
            <div className="flex-grow text-center">
              <p className="text-white">{user.email}</p>
            </div>

            {/* Role */}
            <div className="flex-grow text-center">
              <p className="text-white rounded-full bg-pink-600 py-1  font-medium">
                {user.role}
              </p>
            </div>

            {/* Update Button */}
            <div className="flex-grow flex justify-center">
              <button
                onClick={() => handleUserUpdate(user)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <form onSubmit={(event) => handleUpdateButton(event)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <h1 className="text-black font-bold text-2xl text-center mb-5">
              Name: {user.name}
            </h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-bold">
                  Change User Role:
                </span>
              </label>
              <select
                className="select select-bordered w-full text-white"
                name="role"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <button
              className="btn bg-green-500 text-white text-center border-none"
            >
              Update
            </button>

            <div className="flex justify-center mt-5">
              {/* <button className="btn bg-red-600 text-white border-none">Close</button> */}
            </div>
          </form>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewAllUser;
