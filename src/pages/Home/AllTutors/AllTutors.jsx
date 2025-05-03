import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TutorCard from "./TutorCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllTutors = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["AllTutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: </div>;
  }

  const tutors = users?.filter((user) => user.role === "tutor");

  return (
    <div className=" w-11/12 mx-auto mb-24">
      <div className="flex items-center text-xl md:text-4xl justify-center gap-2">
        <span className="h-px w-20 bg-gray-400"></span>
        <h1 className=" text-center font-bold">Find Your Tutors</h1>
        <span className="h-px w-20 bg-gray-400"></span>
      </div>

      <h1 className=" text-center text-gray-400 mt-2 mb-14">
        Learn From The Best
      </h1>

      <div className="flex flex-wrap gap-5 justify-center items-center">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
        ))}
      </div>
    </div>
  );
};

export default AllTutors;
