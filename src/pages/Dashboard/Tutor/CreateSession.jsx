import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const CreateSession = () => {

    const {user} = useAuth()
    const [formData, setFormData] = useState({
        sessionTitle: '',
        tutorName: user.displayName, // Example logged-in user name
        tutorEmail: user.email, // Example logged-in user email
        sessionDescription: '',
        registrationStartDate: '',
        registrationEndDate: '',
        classStartDate: '',
        classEndDate: '',
        sessionDuration: 1,
        registrationFee: 0, // Default 0, only admin can modify
        status: 'pending', // Default pending
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        axios.post("http://localhost:5000/sessions",formData)
        .then(res=>console.log(res.data))
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md my-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Study Session</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="sessionTitle" className="block text-gray-700 font-medium mb-2">
                        Session Title
                    </label>
                    <input
                        type="text"
                        id="sessionTitle"
                        name="sessionTitle"
                        value={formData.sessionTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tutor Name</label>
                    <input
                        type="text"
                        value={formData.tutorName}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tutor Email</label>
                    <input
                        type="email"
                        value={formData.tutorEmail}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sessionDescription" className="block text-gray-700 font-medium mb-2">
                        Session Description
                    </label>
                    <textarea
                        id="sessionDescription"
                        name="sessionDescription"
                        value={formData.sessionDescription}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        required
                    ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="registrationStartDate" className="block text-gray-700 font-medium mb-2">
                            Registration Start Date
                        </label>
                        <input
                            type="date"
                            id="registrationStartDate"
                            name="registrationStartDate"
                            value={formData.registrationStartDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="registrationEndDate" className="block text-gray-700 font-medium mb-2">
                            Registration End Date
                        </label>
                        <input
                            type="date"
                            id="registrationEndDate"
                            name="registrationEndDate"
                            value={formData.registrationEndDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="classStartDate" className="block text-gray-700 font-medium mb-2">
                            Class Start Date
                        </label>
                        <input
                            type="date"
                            id="classStartDate"
                            name="classStartDate"
                            value={formData.classStartDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="classEndDate" className="block text-gray-700 font-medium mb-2">
                            Class End Date
                        </label>
                        <input
                            type="date"
                            id="classEndDate"
                            name="classEndDate"
                            value={formData.classEndDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="sessionDuration" className="block text-gray-700 font-medium mb-2">
                        Session Duration(hour)
                    </label>
                    <input
                        type="number"
                        id="sessionDuration"
                        name="sessionDuration"
                        value={formData.sessionDuration}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Registration Fee</label>
                    <input
                        type="number"
                        value={formData.registrationFee}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                        Status
                    </label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Create Session
                </button>
            </form>
        </div>
    );
};

export default CreateSession;
