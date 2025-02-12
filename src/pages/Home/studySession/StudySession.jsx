import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import StudyCard from "./StudyCard";

const StudySession = ({all}) => {
  const {
    data: sessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookedSessions"],
    queryFn: async () => {
      const res = await axios.get(
        "https://eduquest-server-side.vercel.app/sessions?filter=Rejected"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading....</div>;
  }

  if(isError){
    return <div>Error Occur:{error.message}</div>
  }

  


  
  return <div className="w-11/12 mx-auto my-9">


    <h1 className="text-5xl font-bold text-white text-center underline py-6 ">Book Your Session Now!</h1>


    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
    {

     all? sessions.map((session)=><StudyCard key={session._id} session={session}></StudyCard>):

        sessions.slice(0, 6).map((session)=><StudyCard key={session._id} session={session}></StudyCard>)
    }
    </div>
 
  </div>;
};

export default StudySession;
