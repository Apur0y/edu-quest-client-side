import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import StudyCard from '../../Home/studySession/StudyCard';
import BookedCard from './StudentCard/BookedCard';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useSecure';

const BookedSession = () => {

  const axiosSecure = useAxiosSecure()
const {user} = useAuth()
    const {data:bookedSessions, isLoading, isError,error} = useQuery({
        queryKey:["bookedsession"],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/booked')
            return res.data
        }
    })

    // const bookedSession = bookedSessions.filter(session=>session.)
    
  if (isLoading) {
    return <div className="text-center">Loading....</div>;
  }

  if(isError){
    return <div>Error Occur:{error.message}</div>
  }

  const bookedSession = bookedSessions.filter(res=>res.studentEmail === user?.email)


  

    return (
        <div className='grid w-11/12 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14'>
           {
            bookedSession.map(session=>(
            
        
              <BookedCard session={session} buttonName={"View Details"} ></BookedCard>
         
            )
          
          )
           }
        </div>
    );
};

export default BookedSession;