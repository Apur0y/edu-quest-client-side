import React from "react";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-12 items-center bg-neutral-900  text-white shadow-lg rounded-lg p-8">
        {/* Left Side */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold te">
            Get in Touch
          </h1>
          <p className="text-lg te mt-3">
            We’d love to hear from you!
          </p>
          <p className="te mt-2">
            Whether you have a question, feedback, or a project in mind, fill out the form and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-6  p-6 rounded-lg shadow-md">
          <div>
            <label className="block te font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border bord rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block te font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border bord rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block te font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full p-3 border bord rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
