import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const AdminStat = () => {
  const axiosSecure = useAxiosPublic();
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

  if (isLoading) {
    return <p className="text-center text-blue-500 font-semibold">Loading user data...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 font-semibold">Failed to load user data.</p>;
  }

  // Filtering users by role
  const tutors = users.filter((user) => user.role === "tutor");
  const students = users.filter((user) => user.role === "student");

  return (
    <div className="mt-14 flex flex-col md:flex-row justify-center gap-10">
      {/* Tutors Section */}
      <div className="flex flex-col items-center bg-green-100 p-6 rounded-lg shadow-lg w-48">
        <FaChalkboardTeacher className="text-green-600 text-5xl mb-2" />
        <p className="text-xl font-bold text-gray-800">Total Tutors</p>
        <span className="text-3xl font-bold text-green-700">{tutors.length}</span>
      </div>

      {/* Students Section */}
      <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-lg w-48">
        <FaUserGraduate className="text-blue-600 text-5xl mb-2" />
        <p className="text-xl font-bold text-gray-800">Total Students</p>
        <span className="text-3xl font-bold text-blue-700">{students.length}</span>
      </div>
    </div>
  );
};

export default AdminStat;
