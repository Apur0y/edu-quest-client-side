import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useSecure';

const CreateSession = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        sessionTitle: '',
        sessionImage:"",
        tutorName: user.displayName, 
        tutorEmail: user.email, 
        sessionDescription: '',
        registrationStartDate: '',
        registrationEndDate: '',
        classStartDate: '',
        classEndDate: '',
        sessionDuration: 1,
        registrationFee: 0, 
        status: 'Pending', 
        image:""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: name === "sessionDuration" ? Number(value) : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosSecure.post("/sessions", formData)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Session has been created",
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormData({
                    sessionTitle: '',
                    tutorName: user.displayName, 
                    tutorEmail: user.email, 
                    sessionDescription: '',
                    registrationStartDate: '',
                    registrationEndDate: '',
                    classStartDate: '',
                    classEndDate: '',
                    sessionDuration: 1,
                    registrationFee: 0, 
                    status: 'Pending', 
                });
    
            });
       
    };

    return (
        <div className=" p-8 w-11/12 text-black mx-auto rounded-lg  my-6">
            <h2 className="text-2xl font-bold mb-6">Create Study Session</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Prefilled Fields */}
              

                {/* Right Side: Input Fields */}
                <div className='  rounded-lg'>
                    <div className="mb-4">
                        <label className="block  font-medium">Session Title</label>
                        <input
                            type="text"
                            name="sessionTitle"
                            value={formData.sessionTitle}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border bg-white  rounded-lg focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block  font-medium">Course Image </label>
                        <input
                            type="text"
                            name="sessionImage"
                            value={formData.sessionImage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2  rounded-lg  bg-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block  font-medium">Session Description</label>
                        <textarea
                            name="sessionDescription"
                            value={formData.sessionDescription}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-4 py-2 border bg-white rounded-lg focus:ring focus:ring-indigo-300"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block  font-medium">Registration Start Date</label>
                            <input
                                type="date"
                                name="registrationStartDate"
                                value={formData.registrationStartDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block  font-medium">Registration End Date</label>
                            <input
                                type="date"
                                name="registrationEndDate"
                                value={formData.registrationEndDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white border rounded-lg focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block  font-medium">Class Start Date</label>
                            <input
                                type="date"
                                name="classStartDate"
                                value={formData.classStartDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white  border rounded-lg focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block  font-medium">Class End Date</label>
                            <input
                                type="date"
                                name="classEndDate"
                                value={formData.classEndDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block  font-medium">Session Duration (hours)</label>
                        <input
                            type="number"
                            name="sessionDuration"
                            value={formData.sessionDuration}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white  border rounded-lg focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-800 text-white  py-2 px-4 rounded-lg hover:bg-yelow-700 transition duration-300"
                    >
                        Create Session
                    </button>
                </div>


                <div className=" p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Tutor Details</h3>

                    <div className="mb-4">
                        <label className="block  font-medium">Tutor Name</label>
                        <input
                            type="text"
                            value={formData.tutorName}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block  font-medium">Tutor Email</label>
                        <input
                            type="email"
                            value={formData.tutorEmail}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block  font-medium">Registration Fee</label>
                        <input
                            type="number"
                            value={formData.registrationFee}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block  font-medium">Status</label>
                        <input
                            type="text"
                            value={formData.status}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                </div>



            </form>
        </div>
    );
};

export default CreateSession;
