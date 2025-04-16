import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ViewAllUser = () => {
  // State for search input and modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const axiosSecure = useAxiosPublic()
  // Fetch users using React Query
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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
      const res = await axiosSecure.put(`/users/${selectedUser._id}`, {
        role,
      });

      // Close the modal and refresh data
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
 <h1 className="text-4xl mb-2 text-center font-bold text-green-950 underline">All Users</h1>


      {/* Search Bar */}
      <div className="my-6   mx-auto">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table Headings */}
      {/* <div className="flex items-center justify-between bg-teal-900 text-white px-4 py-3 rounded-t-lg w-full">
        <p className="flex-grow  font-bold   md:block hidden">Photo</p>
        <p className="flex-grow  font-bold ">Name</p>
        <p className="flex-grow  font-bold text-left  md:block hidden">Email</p>
        <p className="flex-grow  font-bold text-left">Role</p>
        <p className="flex-grow  font-bold text-end mr-6">Action</p>
      </div> */}
      {/* User Rows */}
      <div className="w-full bg-neutral-800">

      <table className="min-w-full border-none ">
    <thead className="bg-[#163830] text-left">
      <tr>
        <th className="p-2 border">Photo</th>
        <th className="p-2 border">Name</th>
        <th className="p-2 border">Email</th>
        <th className="p-2 border">Role</th>
        <th className="p-2 border">Action</th>
      </tr>
    </thead>
    <tbody>
  {filteredUsers.map((user) => (
    // <div
    //   key={user._id}
    //   className="flex justify-evenly bg-transparent font-bold text-white shadow-sm p-4 border-b border-gray-100 w-full"
    // >
    //   {/* Hide the photo column on mobile devices */}
    //   <div className="flex-grow flex justify-center md:block ">
    //     <img
    //       src={user.photoUrl}
    //       alt="Profile"
    //       className="w-12 h-12 rounded-full"
    //     />
    //   </div>
    //   <div className="flex-grow ">
    //     <h3 className="text-lg font-medium">{user.name}</h3>
    //   </div>
    //   <div className="flex-grow text-center md:block hidden">
    //     <p className="text-white">{user.email}</p>
    //   </div>
    //   <div className="flex-grow text-left">
    //     <p className="text-white rounded-full  py-1 font-medium">
    //       {user.role}
    //     </p>
    //   </div>
    //   <div className="flex-grow flex justify-end">
    //     <button
    //       onClick={() => handleUserUpdate(user)}
    //       className="bg-[#f59241] text-white py-2 px-4 rounded hover:bg-[#ce762d]"
    //     >
    //       Update
    //     </button>
    //   </div>
    // </div>
    
  
    
        <tr key={user.id} className="">
          <td className="p-2 border">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
          </td>
          <td className="p-2 border">{user.name}</td>
          <td className="p-2 border">{user.email}</td>
          <td className="p-2 border">{user.role}</td>
          <td className="p-2 border">
            <button
              onClick={() => handleUserUpdate(user)}
              className="px-3 py-1 bg-zinc-700 text-white rounded hover:bg-zinc-900"
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  
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
