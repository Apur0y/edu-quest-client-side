import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Success = () => {
  // Animated Counter Component
  const Counter = ({ value }) => {
    return (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-4xl font-bold text-yellow-500"
      >
        {value}%
      </motion.span>
    );
  };

  return (
    <div className="w-11/12 mx-auto mb-24 flex flex-col  p-6 md:flex-row items-center gap-8">
      {/* Left Section */}

      <div className="w-full md:w-1/2 space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl  font-bold">Success Story</h1>
        <h2 className="text-2xl font-bold ">
          Science | Commerce | Arts 
        </h2>
        
        {/* Description */}
        <p className="">
          Our platform has helped thousands of professionals land their dream jobs, 
          start successful companies, and advance in their careers. Join us and become the next success story.
        </p>

        {/* Success Statistics */}
        <div className="space-y-4">
          <div>
            <Counter value={92} /> <span className="">of users got hired within 3 months.</span>
          </div>
          <div>
            <Counter value={85} /> <span className="">started their own business successfully.</span>
          </div>
          <div>
            <Counter value={78} /> <span className="">improved their skills significantly.</span>
          </div>
        </div>

        {/* Call to Action Button */}
        <Link to='/allsession'>
        <button className="mt-4 px-6 py-3 bg-gray-950 text-white font-semibold rounded-lg shadow-lg  transition duration-300">
          Join Now
        </button>
        </Link>
      
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2">
        <img
          src="/success.jpg"
          alt="Success"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Success;
