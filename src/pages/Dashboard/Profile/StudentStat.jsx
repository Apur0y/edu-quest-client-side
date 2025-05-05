import { useQuery } from '@tanstack/react-query';
import React from 'react';

import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { LuBookOpenCheck } from 'react-icons/lu';

const StudentStat = () => {

    const axiosSecure = useAxiosPublic();
    const {user} = useAuth()

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
        <div>
               <div className="mt-20 flex bg-white w-80 p-4 rounded-lg flex-col justify-center gap-6 mx-auto items-center">
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

export default StudentStat;