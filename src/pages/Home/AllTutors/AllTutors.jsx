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
  <div className=" w-11/12 mx-auto my-9">
        <h1 className="text-5xl font-bold text-[#EAEDED] text-center underline py-6 ">Check Out Tutors!</h1>
<div className="grid grid-cols-3 gap-5">
    {
        tutors.map(tutor=><TutorCard key={tutor._id} tutor={tutor}></TutorCard>)
    }
    </div>
  </div>);
};

export default AllTutors;
