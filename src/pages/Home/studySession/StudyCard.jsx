import React from "react";
import { BsFillFilePersonFill, BsFillPersonBadgeFill, BsPersonBadgeFill } from "react-icons/bs";
import { CgFlagAlt } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlinePersonPin, MdPerson } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { Link } from "react-router-dom";

const StudyCard = ({ session }) => {
  const isOngoing = new Date() < new Date(session.registrationEndDate);


  return (
    <div className="max-w-md scale-90 mx-auto  w-80 bg-zinc-800/70 text-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="p-6 flex h-full flex-col justify-between ">
        <img
          src="https://cdn-bfiho.nitrocdn.com/zzpmBMsOKhwaececAhGHncOFbbwatBIq/assets/images/optimized/rev-eca6dce/integrallife.com/wp-content/uploads/2021/06/Build-Your-Integral-Life-Branding-Graphic-1.jpg"
          alt=""
        />
        <h1 className="absolute bg-teal-900 px-2 mt-2 rounded-r-xl font-bold flex">{session.registrationFee==0? "Free":session.registrationFee }<CgFlagAlt className="my-auto" /></h1>
        <h2 className="text-xl font-semibold mb-2">
          {session.sessionTitle.split(" ").slice(0, 3).join(" ")}
        </h2>
        <p className=" mb-2 flex">
          {/* <MdOutlinePersonPin className="my-auto mr-1 size-6" />{" "} */}
          <MdPerson className="my-auto mr-1 size-5" />
          <span className="font-medium text-neutral-400">{session.tutorName}</span>
        </p>
        <p className=" mb-4">
          <span className="font-medium">Description:</span>{" "}
          {session.sessionDescription.split(" ").slice(0, 9).join(" ") + "..."}
        </p>
        <div className="divider"></div>
        <div className="flex items-center justify-between ">
          <button
            className={`px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-300 ${
              isOngoing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isOngoing}
          >
            {isOngoing ? "Ongoing" : "Closed"}
          </button>
          <Link
            to={`/sessions/${session._id}`}
            className="px-4 py-2 border hover:bg-yellow-600 text-white text-sm font-medium rounded-md transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
