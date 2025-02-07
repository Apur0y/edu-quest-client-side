import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
      
      <Link 
        to="/" 
        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
      >
        Go Home
      </Link>
    </div>
  );
}
