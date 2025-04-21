import React from "react";


const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-800 to-teal-600 text-white px-4">
   <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-24 w-24 text-green-300 mb-6 animate-bounce"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fillRule="evenodd"
    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
    clipRule="evenodd"
  />
</svg>

      <h1 className="text-4xl md:text-6xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg md:text-xl text-teal-100 mb-6 text-center max-w-xl">
        Thank you for your purchase. We've received your payment successfully. 
        A confirmation email will be sent to you shortly.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-white text-teal-800 font-semibold rounded-full hover:bg-teal-100 transition duration-300"
      >
        Back to Home
      </a>
    </div>
  );
};

export default PaymentSuccess;
