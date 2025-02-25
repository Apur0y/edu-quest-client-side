import React, { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Green, Yellow, Red

const TutorStat = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPublic();

  const { data: sessions = [], isLoading, isError } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center text-blue-500 font-semibold">Loading sessions...</p>;
  if (isError)
    return <p className="text-center text-red-500 font-semibold">Failed to load sessions</p>;

  // Memoizing filtered session data for performance optimization
  const { approved, pending, rejected } = useMemo(() => {
    const tutorSessions = sessions.filter(session => session.tutorEmail === user.email);
    return {
      approved: tutorSessions.filter(res => res.status === "Approved").length,
      pending: tutorSessions.filter(res => res.status === "Pending").length,
      rejected: tutorSessions.filter(res => res.status === "Rejected").length,
    };
  }, [sessions, user.email]);

  const data = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  return (
    <div className="flex flex-col items-center p-4  rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Tutor Session Statistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TutorStat;

