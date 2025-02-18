import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useSecure";
import { useQuery } from "@tanstack/react-query";
import { LuBookOpenCheck } from "react-icons/lu";

const Profile = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: bookedSessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookedsession"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booked");
      return res.data;
    },
  });

  // const bookedSession = bookedSessions.filter(session=>session.)

  if (isLoading) {
    return <div className="text-center">Loading....</div>;
  }

  if (isError) {
    return <div>Error Occur:{error.message}</div>;
  }

  const bookedSession = bookedSessions.filter(
    (res) => res.studentEmail === user?.email
  );

  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        My Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={user?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-md"
          />
        </div>
        <div className="flex-1 text-gray-700 text-lg">
          <h2 className="text-2xl font-semibold">
            Name: {user?.displayName || "N/A"}
          </h2>
          <p className="text-lg mt-2">Email: {user?.email || "N/A"}</p>
          <p className="mt-4 text-sm text-gray-500">
            Joined on:{" "}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-20 flex justify-center gap-6 mx-auto items-center">
        <h1 className="text-2xl flex font-bold text-black">
          <LuBookOpenCheck className="my-auto mr-2 text-green-600 size-9" />
          Booked sessions :
        </h1>

        <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-green-500 shadow-md text-3xl font-bold text-black">
          {bookedSession?.length}
        </div>
      </div>
    </div>
  );
};

export default Profile;
