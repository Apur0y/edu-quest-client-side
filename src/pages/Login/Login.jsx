import React, { useContext } from "react";
import img from "../../../public/pic/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
const Login = () => {

  const {signIn} = useContext(AuthContext)
  const location = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault();
    const form= event.target;
    const email=form.email.value;
    const password=form.password.value;
    console.log(email, password);
    signIn(email,password)
      location('/')
  };

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="hero  min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className=" bg-emerald-900 text-white w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-2xl font-semibold mt-7">Log In Here</h1>
                <form onSubmit={handleLogin} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      name="email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                      required
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn bg-slate-950 text-white">
                      Login
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400">
                      {" "}
                      Don't have an account?
                    </span>
                    <Link
                      to="/register"
                      className="hover:underline font-semibold"
                    >
                      Register
                    </Link>
                  </div>
                </form>
              </div>
              <div className="text-center text-white border-l-2 pl-5 lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                  Get Started the begining of a new journey with the EduQuest.
                  Learn the best from our best professional tutors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
