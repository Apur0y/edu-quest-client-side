import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ViewAllUser = () => {
    

    const {
        data: users,
        isLoading,
        isError,
      } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/users");
          return res.json();
        },
      });


      if (isLoading) return <p>Loading sessions...</p>;
      if (isError) return <p>Failed to load sessions</p>;
      console.log(users);
    
    return (
       <div className=''>
        {
            users.map(user=><>
             <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        {/* Profile Picture */}
        <div className="flex items-center">
            <img
                src={user.photoUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
            />
            {/* User Info */}
            <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-blue-500 font-medium">{user.role}</p>
            </div>
        </div>

        {/* Update Button */}
        <button
            onClick={() => console.log("Update button clicked")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
            Update
        </button>
    </div>
            </>)
        }
       </div>
    );
};

export default ViewAllUser;