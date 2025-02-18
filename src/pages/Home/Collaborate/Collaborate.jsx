import React from "react";

const Collaborate = () => {
  return (
    <div>
      <div
        className="hero min-h-screen "
        style={{
          backgroundImage:
            "url(/collab.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className=" text-neutral-content text-center">
          <div className="">
            <h1 className="mb-2 text-5xl text-white font-bold">Collaborate with Platforms</h1>
            <p className="mb-5 text-white">
              We make a good learning platform collaborate with the best. Together make the learning more delightful.
            </p>
            
            <div className="flex justify-between mt-12">
                <img src="/c1.png" alt="" className="h-28 rounded-lg"/>
                <img src="/khan2.jpg" alt="" className="h-28 rounded-lg"/>
                <img src="/cou2.png" alt="" className="h-28 rounded-lg"/>
                <img src="/c3.png" alt="" className="h-28 rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
