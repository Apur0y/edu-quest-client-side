import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
  const {user}=useAuth()
  const location = useLocation();
  const navigate = useNavigate()

  const { session} = location.state || {}; // Safely access state
  const { _id, ...others } = session;

  const postSession = { ...others, sessionID: _id,studentEmail: user.email };

  const handleSSLPayment=()=>{
    console.log("ssl com", postSession);

    axios.post('http://localhost:5000/create-ssl-payment', postSession)
    .then((res)=>console.log(res.data))

  }

  const handlePayPalPayment = () => {
    Swal.fire({
      title: "Payment Successful",
      text: "Redirecting to confirm your booking...",
      icon: "success",
    }).then(() => {
      axios.post("https://eduquest-server-side.vercel.app/booked", postSession).then((res) => {
        console.log("Booking saved:", res.data);
        Swal.fire({
          title: "Booked",
          text: "Your session is booked!",
          icon: "success",
        });
        navigate('/')
      });
    });
  };

  const handleGooglePayPayment = () => {
    Swal.fire({
      title: "Google Pay Payment",
      text: "You have successfully paid using Google Pay!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
        axios.post("https://eduquest-server-side.vercel.app/booked", postSession).then((res) => {
          console.log("Booking saved:", res.data);
          Swal.fire({
            title: "Booked",
            text: "Your session is booked!",
            icon: "success",
          });
          navigate('/')
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Payment
        </h2>
        <p className="text-lg text-center text-gray-600 mb-8">
          Complete your booking by choosing a payment method.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Session Details
          </h3>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Title:</span>{" "}
              {session?.sessionTitle}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Fee:</span>{" "}
              {session?.registrationFee > 0
                ? `$${session?.registrationFee}`
                : "Free"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
        <button
            onClick={handleSSLPayment}
            className="w-full px-5 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Go to SSLcommerce
          </button>
          <button
            onClick={handlePayPalPayment}
            className="w-full px-5 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Pay with PayPal
          </button>
          <button
            onClick={handleGooglePayPayment}
            className="w-full px-5 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Pay with Google Pay
          </button>
      
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center">
          By proceeding, you agree to our{" "}
          <a
            href="#"
            className="text-blue-500 underline hover:text-blue-700 transition-all"
          >
            Terms & Conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Payment;
