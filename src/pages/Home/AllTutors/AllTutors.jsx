import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TutorCard from "./TutorCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllTutors = () => {

  const axiosPublic= useAxiosPublic()

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


  return( 
  <div className="scale-95 w-11/12 mx-auto mb-24">
    <div className="flex items-center justify-center gap-2">
      <span className="h-px w-20 bg-gray-400"></span>
      <h1 className="text-xl text-center"> Learn From Best</h1>
      <span className="h-px w-20 bg-gray-400"></span>
    </div>
        <h1 className="text-3xl md:text-5xl font-bold text-center underline py-6 ">Check Out Tutors</h1>
        
<div className="grid grid-cols-5 gap-5">
    {
        tutors.map(tutor=><TutorCard key={tutor._id} tutor={tutor}></TutorCard>)
    }
    </div>
  </div>);
};

export default AllTutors;
