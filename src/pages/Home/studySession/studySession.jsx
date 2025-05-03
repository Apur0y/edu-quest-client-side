import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import StudyCard from "./StudyCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { LuArrowUpDown } from "react-icons/lu";
import { div } from "framer-motion/client";
import { Link } from "react-router-dom";

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
      const res = await axiosPublic.get("/sessions?filter=Rejected,Pending");
      return res.data;
    },
  });

  // State to store sorted sessions
  const [sortedSessions, setSortedSessions] = useState([]);
  const [isDateAscending, setIsDateAscending] = useState(true);
  const [isPriceAscending, setIsPriceAscending] = useState(true);
  const goingNow = sortedSessions.filter(
    (session) => new Date(session.registrationEndDate) > new Date()
  );

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
    const sortedByDate = [...sortedSessions].sort((a, b) =>
      isDateAscending
        ? new Date(a.registrationEndDate) - new Date(b.registrationEndDate)
        : new Date(b.registrationEndDate) - new Date(a.registrationEndDate)
    );
    setSortedSessions(sortedByDate);
    setIsDateAscending(!isDateAscending);
  };

  // Sort by Price (Assuming session.price is a number)
  const handlePriceSort = () => {
    const sortedByPrice = [...sortedSessions].sort((a, b) =>
      isPriceAscending
        ? a.registrationFee - b.registrationFee
        : b.registrationFee - a.registrationFee
    );
    setSortedSessions(sortedByPrice);
    setIsPriceAscending(!isPriceAscending);
  };

  return (
    <div className="w-11/12 mx-auto mb-24">
      <div className="flex items-center text-xl md:text-4xl justify-center gap-2">
        <span className="h-px w-20 bg-gray-400"></span>
        <h1 className=" text-center font-bold">Top Courses</h1>
        <span className="h-px w-20 bg-gray-400"></span>
      </div>

      <h1 className=" text-center text-gray-400 mt-2">
        Build Your Career Now!
      </h1>

      <div className="">
        {all ? (
          <>
            <div className="flex justify-center md:justify-end gap-5 md:pr-16">
              <button
                onClick={handleDateSort}
                className="btn bg-yellow-600 text-white hover:bg-yellow-500"
              >
                Sort by Date
                <LuArrowUpDown className="size-5" />
              </button>
              <button
                onClick={handlePriceSort}
                className="btn bg-yellow-600 text-white hover:bg-yellow-500"
              >
                Sort by Price
                <LuArrowUpDown className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
              {sortedSessions.map((session) => (
                <StudyCard key={session._id} session={session} />
              ))}
            </div>
          </>
        ) : (
          <div
            className="
           flex flex-wrap 
           my-5"
          >
            {goingNow.slice(0, 8).map((session) => (
              <StudyCard key={session._id} session={session} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-5">
        <Link to="/allsession">
          <button className="btn ">See All Course</button>
        </Link>
      </div>
    </div>
  );
};

export default StudySession;
