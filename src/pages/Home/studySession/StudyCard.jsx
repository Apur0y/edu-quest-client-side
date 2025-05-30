import React, { useState } from "react";
import {
  BsFillFilePersonFill,
  BsFillPersonBadgeFill,
  BsPersonBadgeFill,
} from "react-icons/bs";
import { CgEditBlackPoint, CgFlagAlt } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlinePersonPin, MdPerson } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const StudyCard = ({ session }) => {
  const isOngoing = new Date() < new Date(session.registrationEndDate);
  // const [rating, setRating] = useState(0);
  console.log(session);

  return (
    <div className="max-w-md scale-90 mx-auto w-80 backdrop-blur-sm  shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden group">
      <div className="flex h-full flex-col justify-between">
        <img
          src={session?.image||"https://www.shutterstock.com/image-illustration/modern-dynamic-blue-neuron-plasma-600nw-2146957609.jpg"}
          alt=""
          className="group-hover:scale-105 transition-transform duration-300"
          />
        <button
          className={`px-3 absolute py-1 m-2 text-white text-sm font-medium rounded-md transition-colors duration-300 ${
            isOngoing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!isOngoing}
        >
          {isOngoing ? (
            <div className="flex items-center gap-1">
              <div className="relative">
                <CgEditBlackPoint className="text-red-600 size-6 relative z-10" />
                <span className="absolute inset-0 rounded-full animate-ping bg-red-600 opacity-60 z-0" />
              </div>
              <span>Ongoing</span>
            </div>
          ) : (
            <div className="flex">
              <IoLockClosedOutline className="text-white size-5 mr-1 shadow-red-600" />
              Closed
            </div>
          )}
        </button>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-teal-600 transition-colors duration-300">
            {session.sessionTitle.split(" ").slice(0, 3).join(" ")}
          </h2>
          <p className="mb-2 flex">
            <MdPerson className="my-auto mr-1 size-5" />
            <span className="font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300">
              {session.tutorName}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-medium">Description:</span>{" "}
            {session.sessionDescription.split(" ").slice(0, 9).join(" ") +
              "..."}
          </p>
          <p className="mb-4 flex gap-1">
            <span className="font-medium">Rating: </span>
            <Stack spacing={1}>
              <Rating name="half-rating" readOnly defaultValue={2.5} precision={0.5} />
            </Stack>
          </p>
          <div className="divider"></div>
          <div className="flex items-center justify-between">
            <h1 className="bg-teal-900 text-white px-2 rounded-r-xl font-bold flex">
              {session.registrationFee == 0 ? "Free" : session.registrationFee}
              <CgFlagAlt className="my-auto" />
            </h1>
            <Link
              to={`/sessions/${session._id}`}
              className="px-4 py-2 border hover:bg-yellow-600 text-sm font-medium rounded-md transition-colors duration-300"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
