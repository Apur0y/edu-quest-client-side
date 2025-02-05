import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ViewAllMaterials = () => {
  const { data: materials, isLoading, isError } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const result = await axios.get(
        "https://eduquest-server-side.vercel.app/materials"
      );
      return result.data;
    },
  });

  const handleDelete=(id)=>{

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/materials/${id}`)
            .then((res) => {
              Swal.fire({
                title: "Deleted!",
                text: "Session has been deleted.",
                icon: "success",
              });
              console.log(res.data);
            })
            .catch((err) => {
              console.error("Failed to delete session:", err);
              Swal.fire({
                title: "Error!",
                text: "Failed to delete session.",
                icon: "error",
              });
            });
        }
      });
  }

  // Handle loading and error states
  if (isLoading) return <p>Loading materials...</p>;
  if (isError) return <p>Failed to load materials</p>;

  return (
    <div className="grid grid-cols-1 w-11/12 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {materials.map((material) => (
        <div
          key={material._id}
          className=" w-72 mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">{material.title || "Untitled"}</h3>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">
                <strong className="text-gray-800">Tutor Email:</strong> {material.tutorEmail}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">
                <strong className="text-gray-800">Link:</strong>{" "}
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {material.link}
                </a>
              </p>
            </div>
            <div className="flex justify-between items-center mt-6 space-x-4">
              <button 
              onClick={()=>handleDelete(material._id)}
              className="w-1/2 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200">
                Remove
              </button>
             <Link to={`${material.link}`}>
             <button className=" py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200">
                View
              </button>
             </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAllMaterials;
