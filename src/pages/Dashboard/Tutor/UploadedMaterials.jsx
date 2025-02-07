import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useSecure";

const MaterialsList = () => {

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: allmaterials,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const response = await axiosSecure.get("/materials");
      return response.data;
    },
  });
  
  if (isLoading) {
    return <p>Loading materials...</p>;
  }

  if (isError) {
    return <p>Error fetching materials: {error.message}</p>;
  }

  const materials = allmaterials.filter(res=>res.tutorEmail === user?.email )


  return (
    <div>
      <h1 className="text-2xl text-center text-white font-bold mb-4">Uploaded Materials</h1>
      <div className="grid  w-11/12 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div
            key={material._id}
            className="bg-white shadow-lg rounded-lg p-4 border"
          >
            <h2 className="text-xl font-semibold">{material.title}</h2>
            <p className="text-gray-600">Session ID: {material.sessionId}</p>
            <p className="text-gray-600">Tutor Email: {material.tutorEmail}</p>
            <a
              href={material.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resource
            </a>
            {material.image && (
              <img
                src={`data:image/png;base64,${material.image}`}
                alt="Material Preview"
                className="mt-4 rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsList;
