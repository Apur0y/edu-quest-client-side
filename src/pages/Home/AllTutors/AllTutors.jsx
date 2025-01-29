import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TutorCard from "./TutorCard";

const AllTutors = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["AllTutors"],
    queryFn: async () => {
      const res = await axios.get("https://eduquest-server-side.vercel.app/users");
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
        <h1 className="text-5xl font-bold text-white text-center underline py-6 ">Check Out Tutors!</h1>
<div className="grid grid-cols-3 gap-5">
    {
        tutors.map(tutor=><TutorCard tutor={tutor}></TutorCard>)
    }
    </div>
  </div>);
};

export default AllTutors;
