import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import StudyCard from "./StudyCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { LuArrowUpDown } from "react-icons/lu";
import { div } from "framer-motion/client";

const StudySession = ({ all }) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: sessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookedSessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions?filter=Rejected");
      return res.data;
    },
  });

  // State to store sorted sessions
  const [sortedSessions, setSortedSessions] = useState([]);
  const [isDateAscending, setIsDateAscending] = useState(true);
  const [isPriceAscending, setIsPriceAscending] = useState(true);

  // Set initial sessions when fetched
  useEffect(() => {
    if (sessions) {
      setSortedSessions(sessions);
    }
  }, [sessions]);

  if (isLoading) {
    return <div className="text-center">Loading....</div>;
  }

  if (isError) {
    return <div>Error Occur: {error.message}</div>;
  }

  // Sort by Date (Assuming session.date is a valid date string)
  const handleDateSort = () => {
    const sortedByDate = [...sortedSessions].sort((a,b) =>
      isDateAscending?
      new Date(a.registrationEndDate) - new Date(b.registrationEndDate)
      :
      new Date(b.registrationEndDate) - new Date(a.registrationEndDate)
    );
    setSortedSessions(sortedByDate);
    setIsDateAscending(!isDateAscending)
  };

  // Sort by Price (Assuming session.price is a number)
  const handlePriceSort = () => {
    const sortedByPrice = [...sortedSessions].sort((a, b) =>
      isPriceAscending? 
      a.registrationFee - b.registrationFee
      :
      b.registrationFee - a.registrationFee
    );
    setSortedSessions(sortedByPrice);
    setIsPriceAscending(!isPriceAscending)
  };

  return (
    <div className="w-11/12 mx-auto mb-24">
      <h1 className="text-3xl md:text-5xl font-bold text-center underline py-6">
        Book Your Session Now!
      </h1>

      <div className="">
        {all ? (
          <>
            <div className="flex justify-end gap-5 pr-16">
              <button
                onClick={handleDateSort}
                className="btn bg-yellow-600 text-white hover:bg-yellow-500"
              >
                Sort by Date<LuArrowUpDown className="size-5" />
              </button>
              <button
                onClick={handlePriceSort}
                className="btn bg-yellow-600 text-white hover:bg-yellow-500"
              >
                Sort by Price<LuArrowUpDown className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
              {sortedSessions.map((session) => (
                <StudyCard key={session._id} session={session} />
              ))}
            </div>
          </>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
            {
  sortedSessions
            .slice(0, 6)
            .map((session) => <StudyCard key={session._id} session={session} />)
        }
          </div>
        
        )}
      </div>
    </div>
  );
};

export default StudySession;
