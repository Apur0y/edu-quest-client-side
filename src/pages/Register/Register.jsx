import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../public/pic/login.jpg";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const Register = () => {
  const { createUser, profileInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const photoUrl = form.photo.value;
    const password = form.password.value;
    const role = form.role.value;

    createUser(email, password)
      .then((res) => {
        profileInfo({ displayName: name, photoURL: photoUrl })
          .then(() => {
            // Prepare user data to send to the backend
            const userData = {
              name,
              email,
              photoUrl,
              role,
            };

            // Post user data to the backend
            return axios.post(
              "https://eduquest-server-side.vercel.app/users",
              userData
            );
          })
          .then(() => {
            // Navigate after successful registration and data submission
            navigate("/");
          })
          .catch((error) => {
            console.log("Error updating profile or saving user data:", error);
          });
      })
      .catch((error) => {
        let errorMessage = error.message;

        // Extract meaningful error text
        if (errorMessage.includes("(") && errorMessage.includes(")")) {
          errorMessage = errorMessage
            .split("(")[1] // Get text inside parentheses
            .split(")")[0] // Remove the closing bracket
            .replaceAll("-", " "); // Replace dashes with spaces
        }

        setError(errorMessage); // Set cleaned error message
        console.log("Error:", errorMessage);
      });
  };
  console.log("Here is the error", error);
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${img})`, // Replace with your background image
        }}
      >
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="hero  min-h-screen pt-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="bg-emerald-900 text-white w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-2xl font-semibold mt-7">Register Here</h1>
                <form onSubmit={handleRegister} className="card-body">
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  {/* Photo Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Photo URL</span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      placeholder="Enter photo URL or upload via imgbb"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Role</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      name="role"
                      required
                    >
                      <option value="" disabled selected>
                        Select your role
                      </option>
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="form-control mt-6">
                    <div className="text-red-600 font-semibold ">{error}</div>
                    <button className="btn bg-slate-950 text-white">
                      Register
                    </button>
                  </div>

                  {/* Link to Login */}
                  <div className="flex gap-2">
                    <span className="text-gray-400">
                      Already have an account?
                    </span>
                    <Link to="/login" className="hover:underline font-semibold">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
              <div className="text-center text-white border-l-2 pl-5 lg:text-left">
                <h1 className="text-5xl font-bold">Join EduQuest!</h1>
                <p className="py-6">
                  Start your journey with EduQuest today. Whether you're a
                  student, tutor, or administrator, we have the tools and
                  resources for success!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
