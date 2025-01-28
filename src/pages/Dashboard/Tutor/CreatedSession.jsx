import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import Card from "../../Shared/Card/Card";
import axios from "axios";

const CreatedSession = () => {
  const { user } = useAuth();

  const {
    data: sessions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch("https://eduquest-server-side.vercel.app/sessions");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading sessions...</p>;
  if (isError) return <p>Failed to load sessions</p>;
  console.log(sessions);

  const tutorSessions = sessions.filter(
    (session) => session.tutorEmail == user.email
  );
  console.log(tutorSessions);

  const handleRequestSession = (session) => {
    const updatedStatus = { status: "Pending" };
    axios.put(`https://eduquest-server-side.vercel.app/sessions/${session._id}`,updatedStatus)
    .then(res=>{
      console.log(res.data);
    })
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-11/12 my-6 mx-auto">
      {tutorSessions.map((session) => (
        <Card
          key={session._id}
          session={session}
          handleRequestSession={handleRequestSession}
        ></Card>
      ))}
    </div>
  );
};

export default CreatedSession;
