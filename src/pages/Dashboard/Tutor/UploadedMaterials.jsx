import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MaterialsList = () => {
  const {
    data: materials = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/materials");
      return response.data;
    },
  });
  console.log(materials);
  if (isLoading) {
    return <p>Loading materials...</p>;
  }

  if (isError) {
    return <p>Error fetching materials: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Uploaded Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
