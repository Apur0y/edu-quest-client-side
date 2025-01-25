import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import StudyCard from '../../Home/studySession/StudyCard';

const BookedSession = () => {

    const {data:bookedSession, isLoading, isError} = useQuery({
        queryKey:["bookedsession"],
        queryFn: async ()=>{
            const res = await axios.get('http://localhost:5000/booked')
            return res.data
        }
    })

    
  if (isLoading) {
    return <div className="text-center">Loading....</div>;
  }

  if(isError){
    return <div>Error Occur:{error.message}</div>
  }


    console.log(bookedSession);

    return (
        <div className='grid grid-cols-3 gap-5 my-14'>
           {
            bookedSession.map(session=><StudyCard session={session}></StudyCard>)
           }
        </div>
    );
};

export default BookedSession;