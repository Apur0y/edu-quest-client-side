import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const UploadMaterials = () => {
    const axiosSecure = useAxiosPublic();

    const { user } = useAuth();
    const { data: approvedSessions = [] } = useQuery({
        queryKey: ["approvedSession"],
        queryFn: async () => {
            const result = await axiosSecure.get(
                "/sessions?filter=Rejected"
            );
            return result.data;
        },
    });

    const userSessions = approvedSessions.filter(
        (session) => session.tutorEmail === user.email
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        sessionId: '',
        tutorEmail: '',
        image: null,
        link: '',
    });

    const handleOpenModal = (session) => {
        setSelectedSession(session);
        setFormData({
            ...formData,
            title: session.sessionTitle,
            sessionId: session._id,
            tutorEmail: session.tutorEmail,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSession(null);
        setFormData({
            title: '',
            sessionId: '',
            tutorEmail: '',
            image: '',
            link: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('sessionId', formData.sessionId);
        formDataToSend.append('tutorEmail', formData.tutorEmail);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('link', formData.link);

        try {
            const response = await axiosSecure.post('/materials', formDataToSend)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Materials Uploaded",
                showConfirmButton: false,
                timer: 1500
            });
            console.log('Upload Successful:', response.data);
            handleCloseModal();
        } catch (error) {
            console.error('Upload Failed:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Upload Failed",
                text: "Please try again later",
                showConfirmButton: true
            });
        }
    };

    // Prevent modal click propagation
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    // Handle escape key press
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleCloseModal();
        }
    };

    return (
        <div className="min-h-screen pb-10">
           <h1 className="text-2xl text-center font-bold mb-4">Upload Materials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {userSessions.map((session) => (
                    <div
                        key={session._id}
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-full hover:shadow-xl transition-shadow duration-300"
                    >
                        <h1 className="text-xl font-bold text-gray-800 mb-2">
                            {session.sessionTitle}
                        </h1>
                     
                        {/* <p className="text-gray-600 mb-4">{session.sessionDescription}</p> */}
                        <p className="text-gray-700 font-medium mb-4">
                        Class Start: {session.classStartDate}
                        </p>
                        <p className="text-gray-700 font-medium mb-4">
                            Duration: {session.sessionDuration} hours
                        </p>
                        <button
                            onClick={() => handleOpenModal(session)}
                            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-lg  transition duration-300"
                        >
                            Upload Materials
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedSession && (
                <div 
                    className="sticky inset-0  backdrop-blur-md min-h-screen  z-50 flex items-center justify-center pointer-events-none"
                >
                    <div 
                        className="absolute inset-0  bg-opacity-50 pointer-events-auto"
                        onClick={handleCloseModal}
                    ></div>
                    <div 
                        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 pointer-events-auto"
                        onClick={handleModalClick}
                        onKeyDown={handleKeyDown}
                        tabIndex={-1}
                    >
                        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Upload Materials</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                        placeholder="Material Title"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Study Session ID</label>
                                    <input
                                        type="text"
                                        name="sessionId"
                                        value={formData.sessionId}
                                        readOnly
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Tutor Email</label>
                                    <input
                                        type="email"
                                        name="tutorEmail"
                                        value={formData.tutorEmail}
                                        readOnly
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Image Upload</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                        accept="image/*"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Google Drive Link</label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                        placeholder="https://drive.google.com/..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-teal-700 hover:bg-teal-00 text-white py-3 px-4 rounded-lg  transition duration-300 font-medium"
                                >
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadMaterials;