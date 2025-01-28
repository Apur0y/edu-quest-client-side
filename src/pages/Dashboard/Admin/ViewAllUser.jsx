import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const ViewAllUser = () => {
  // State for search input and modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch users using React Query
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });
  // ,{
  //   headers:{
  //     authorization: `Bearer ${localStorage.getItem('access-token')}`
  //   }
  // }

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users</p>;

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserUpdate = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleUpdateButton = async (event) => {
    event.preventDefault();
    const role = event.target.role.value;

    try {
      const res = await axios.put(`http://localhost:5000/users/${selectedUser._id}`, {
        role,
      });
      console.log(res.data.message);
      // Close the modal and refresh data
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
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
            key={user._id}
            className="flex items-center justify-between bg-transparent font-bold text-white shadow-sm p-4 border-b border-gray-100 w-full"
          >
            <div className="flex-grow flex justify-center">
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-grow text-center">
              <h3 className="text-lg font-medium">{user.name}</h3>
            </div>
            <div className="flex-grow text-center">
              <p className="text-white">{user.email}</p>
            </div>
            <div className="flex-grow text-center">
              <p className="text-white rounded-full bg-pink-600 py-1 font-medium">
                {user.role}
              </p>
            </div>
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

      {/* Modal */}
      {modalVisible && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box bg-white">
            <h1 className="text-black font-bold text-2xl text-center mb-5">
              Name: {selectedUser.name}
            </h1>
            <form onSubmit={handleUpdateButton}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Change User Role:
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  name="role"
                  defaultValue={selectedUser.role}
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-action">
                <button type="button" onClick={() => setModalVisible(false)} className="btn">
                  Close
                </button>
                <button type="submit" className="btn bg-green-500 text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllUser;
