import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useSecure';

const CreateSession = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
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
        <div className="bg-[#147b5c] p-8 w-11/12 max-w-4xl mx-auto rounded-lg shadow-md my-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Study Session</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Prefilled Fields */}
                <div className=" p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Tutor Details</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Tutor Name</label>
                        <input
                            type="text"
                            value={formData.tutorName}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Tutor Email</label>
                        <input
                            type="email"
                            value={formData.tutorEmail}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Registration Fee</label>
                        <input
                            type="number"
                            value={formData.registrationFee}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Status</label>
                        <input
                            type="text"
                            value={formData.status}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Right Side: Input Fields */}
                <div className='bg-gray-100 p-6 rounded-lg'>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Session Title</label>
                        <input
                            type="text"
                            name="sessionTitle"
                            value={formData.sessionTitle}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Session Description</label>
                        <textarea
                            name="sessionDescription"
                            value={formData.sessionDescription}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Registration Start Date</label>
                            <input
                                type="date"
                                name="registrationStartDate"
                                value={formData.registrationStartDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Registration End Date</label>
                            <input
                                type="date"
                                name="registrationEndDate"
                                value={formData.registrationEndDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Class Start Date</label>
                            <input
                                type="date"
                                name="classStartDate"
                                value={formData.classStartDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Class End Date</label>
                            <input
                                type="date"
                                name="classEndDate"
                                value={formData.classEndDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Session Duration (hours)</label>
                        <input
                            type="number"
                            name="sessionDuration"
                            value={formData.sessionDuration}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yelow-700 transition duration-300"
                    >
                        Create Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSession;
