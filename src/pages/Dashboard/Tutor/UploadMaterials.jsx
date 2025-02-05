import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2';

const UploadMaterials = () => {
    const { user } = useAuth();
    const { data: approvedSessions = [] } = useQuery({
        queryKey: ["approvedSession"],
        queryFn: async () => {
            const result = await axios.get(
                "https://eduquest-server-side.vercel.app/sessions?filter=Rejected"
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
            title :session.sessionTitle,
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
        formDataToSend.append('title', formData.sessionTitle);
        formDataToSend.append('sessionId', formData.sessionId);
        formDataToSend.append('tutorEmail', formData.tutorEmail);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('link', formData.link);
        console.log(formData.sessionTitle);

        try {
            const response = await axios.post('https://eduquest-server-side.vercel.app/materials', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
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
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-white my-9 font-bold underline md:text-6xl text-center ">
                Upload Materials
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {userSessions.map((session) => (
                    <div 
                        key={session._id} 
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto my-4 w-11/12"
                    >
                        <h1 className="text-xl font-bold text-gray-800 mb-2">
                            {session.sessionTitle}
                        </h1>
                        <p className="text-gray-600 mb-4">{session.sessionDescription}</p>
                        <p className="text-gray-700 font-medium mb-4">
                            Duration: {session.sessionDuration} hours
                        </p>
                        <button
                            onClick={() => handleOpenModal(session)}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                        >
                            Upload Materials
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedSession && (
                <div className="modal modal-open fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Upload Materials</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Title</label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={formData.sessionTitle}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300" 
                                    placeholder="Material Title"
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
                                />
                            </div>
                            <div className="mb-4">
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
                                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadMaterials;
