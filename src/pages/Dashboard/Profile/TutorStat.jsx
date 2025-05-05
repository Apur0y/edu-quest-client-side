import React, { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FcApproval } from "react-icons/fc";
import { GiBladeFall } from "react-icons/gi";
import { MdCancel, MdPending } from "react-icons/md";
import { IoBook } from "react-icons/io5";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Green, Yellow, Red

const TutorStat = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPublic();

  // Fetch sessions data using react-query.
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  // Always call useMemo even if sessions hasn't loaded yet.
  const { approved, pending, rejected } = useMemo(() => {
    // If sessions data isn't available or user email is not defined, return default values.
    if (!sessions || !user?.email) {
      return { approved: 0, pending: 0, rejected: 0 };
    }

    const tutorSessions = sessions.filter(
      (session) => session.tutorEmail === user.email
    );

    return {
      approved: tutorSessions.filter((session) => session.status === "Approved")
        .length,
      pending: tutorSessions.filter((session) => session.status === "Pending")
        .length,
      rejected: tutorSessions.filter((session) => session.status === "Rejected")
        .length,
    };
  }, [sessions, user?.email]);

  // Handling loading and error states after all hooks have been called.
  if (isLoading) {
    return (
      <p className="text-center text-blue-500 font-semibold">
        Loading sessions...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-semibold">
        Failed to load sessions
      </p>
    );
  }

  const data = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  const cardsInfo = [
    {
      status: "Total Course",
      count: approved + pending + rejected,
      icon: <IoBook className="size-12 " />,
    },
    {
      status: "Approved",
      count: approved,
      icon: <FcApproval className="size-12" />,
    },
    {
      status: "Pending",
      count: pending,
      icon: <MdPending className="size-12 text-orange-600" />,
    },
    {
      status: "Rejected",
      count: rejected,
      icon: <MdCancel className="size-12 text-red-700" />,
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 rounded-lg">
      <div className="flex flex-wrap gap-5 mb-32">
        {cardsInfo.map((card) => (
          <div className="flex bg-white p-5 gap-3 rounded-lg w-62">
            <p>{card.icon}</p>
            <div>
              <p className="text-gray-600 font-semibold">{card.status}</p>
              <h1 className="font-bold text-3xl text-center">{card.count}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white px-12 md:px-32 py-8 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Tutor Session Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TutorStat;
