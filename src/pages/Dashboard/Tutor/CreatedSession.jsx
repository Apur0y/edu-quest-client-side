import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import Card from "../../Shared/Card/Card";

const CreatedSession = () => {
  const { user } = useAuth();

  const {
    data: sessions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sessions");
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
    console.log("Do it latter",session);
  };

  return (
    <div className="grid grid-cols-3 gap-5">
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
