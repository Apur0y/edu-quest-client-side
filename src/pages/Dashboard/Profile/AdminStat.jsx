import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AdminStat = () => {
    
    const axiosSecure = useAxiosPublic()
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

      const tutor = users.filter(res=>res.role=="tutor")
      const student = users.filter(res=>res.role=="student")
      console.log("This is her",tutor,student);
      
    return (
        <div className='mt-14'>
            <div className='flex justify-around  text-xl font-bold text-gray-800'>
      
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-green-500 shadow-md text-3xl font-bold text-white">
          Total Tutor: {tutor.length}
        </div>
        <div className='flex my-auto'>
        Total Student:  <span className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-green-500 shadow-md text-3xl font-bold text-white">
         {student.length}
        </span>

        </div>
      
            </div>
      

        </div>
    );
};

export default AdminStat;