import React, { useContext } from "react";
import img from "../../../public/pic/login.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, AuthContext } from "../../Providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaChalkboardTeacher, FaGithub, FaUserGraduate } from "react-icons/fa";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { RiAdminFill } from "react-icons/ri";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signIn, setStudent } = useContext(AuthContext);
  const location = useNavigate();
  const provider = new GoogleAuthProvider();
  const gprovider = new GithubAuthProvider();
  const navigate = useLocation();

  const from = navigate.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((res) => {
      location(from, { replace: true })
      toast.success('Login Successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
    });
  };

  const handleRole = (e, p) => {

    signIn(e, p).then((res) => {
       toast.success('Login Successful', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
      location(from, { replace: true });
     
    });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider);
    setStudent(true);
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gprovider)
      .then((result) => {
        // User successfully signed in
        console.log("GitHub User:", result.user);
        setStudent(true);
        toast.success('Login Successful', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          })
        location("/"); // Redirect after successful login
      })
      .catch((error) => {
        console.error("GitHub Login Error:", error);
        Swal.fire("Error!", "GitHub login failed.", "error");
      });
  };

  const handleTestLogin = () => {
    document.getElementById("my_modal_3").showModal();

  };

  return (
    <div>
      <div
        className="hero min-h-screen "
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-neutral-content text-center pt-20">
          <div className="hero  min-h-screen">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
              <div className=" bg-emerald-900 text-white w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-2xl font-semibold mt-7">Log In Here</h1>
                <form onSubmit={handleLogin} className=" px-8">
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
                  <div className=" mt-6">
                    <button
                      type="button"
                      onClick={() => handleTestLogin()}
                      className="btn w-full bg-slate-950 text-white"
                    >
                      Test Login
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
                {/* <div className="divider">TEST AS</div>
                <div className="flex gap-2 justify-center">
                <button onClick={()=>handleRole("student@gmail.com","123456")} className="btn bg-slate-950 text-white">User</button>
                <button onClick={()=>handleRole("tutor@gmail.com","123456")} className="btn bg-slate-950 text-white">Tutor</button>
                <button onClick={()=>handleRole("admin@gmail.com","123456")} className="btn bg-slate-950 text-white">Admin</button>
                </div> */}

                <div className="divider">OR</div>
                <div className="flex flex-col gap-5 w-10/12 mx-auto pb-4">
                  <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-slate-950 text-white"
                  >
                    <FcGoogle className="size-6" />
                    Continue with Google
                  </button>
                  <button
                    onClick={handleGithubSignIn}
                    className="btn bg-slate-950 text-white"
                  >
                    <FaGithub className="size-6" />
                    Continue with Github
                  </button>
                </div>
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

      {/* modal */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box text-white">
          
          <div className="divider">TEST AS</div>
          <div className="flex gap-5 justify-center">
            <div className="flex flex-col justify-center">
              <FaUserGraduate className="size-20 md:size-32 p-4" />
              <button
                onClick={() => handleRole("student@gmail.com", "123456")}
                className="py-1 rounded-md bg-slate-950 text-white"
              >
                Student
              </button>
            </div>

            <div className="flex flex-col justify-center">
              <FaChalkboardTeacher className="size-20 p-2 md:size-32" />
              <button
                onClick={() => handleRole("tutor@gmail.com", "123456")}
                className="py-1 rounded-md bg-slate-950 text-white"
              >
                Tutor
              </button>
            </div>

            <div className="flex flex-col justify-center">
              <RiAdminFill className="size-20 p-3 md:size-32" />
              <button
                onClick={() => handleRole("admin@gmail.com", "123456")}
                className="py-1 rounded-md bg-slate-950 text-white"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </div>
  );
};

export default Login;
