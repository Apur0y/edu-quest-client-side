import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useSecure';
import { FcRating } from 'react-icons/fc';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Review = () => {
    const axiosSecure = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2; // Show 2 reviews per page

    const { data: reviews, isLoading, error } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const result = await axiosSecure.get('/reviews');
            return result.data;
        }
    });

    if (isLoading) return <p className="text-center text-lg font-semibold">Loading reviews...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load reviews</p>;

    const topReviews = reviews?.filter(rev => rev.rating === 5) || [];
    
    // Pagination Logic
    const totalPages = Math.ceil(topReviews.length / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const paginatedReviews = topReviews.slice(startIndex, startIndex + reviewsPerPage);

    return (
        <div className=" mx-auto p-6">
            <h1 className="text-2xl md:text-4xl font-bold text-white my-8 text-center mb-6">What Our Customer Says</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {paginatedReviews.map((review) => (
                    <div key={review.id} className="bg-white shadow-lg rounded-xl flex p-4">
                        <div className='w-24 pr-8 border-r-2'>
                            <img src={review.photo || "/human.jpg"} alt={review.name} className="w-16 h-16 rounded-full mx-auto" />
                        </div>
                        <div className='ml-5'>
                            <h2 className="text-lg font-semibold text-center mt-2">{review.name}</h2>
                            <p className="text-gray-600 text-center mt-1">{review.text}</p>
                            <p className="flex justify-center items-center gap-1 text-yellow-500 mt-2">
                                <FcRating className="text-xl" /> {review.rating}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                       <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Review;
