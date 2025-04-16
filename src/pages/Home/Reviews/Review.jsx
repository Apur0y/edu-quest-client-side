import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FcRating } from "react-icons/fc";
import { Rating } from "@smastrom/react-rating";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion

import "@smastrom/react-rating/style.css";

const PaginatedReviews = ({ itemsPerPage, reviews }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [direction, setDirection] = useState(1); // 🔥 Track navigation direction

    const endOffset = itemOffset + itemsPerPage;
    const currentReviews = reviews.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(reviews.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % reviews.length;
        setDirection(newOffset > itemOffset ? 1 : -1); // 🔥 Determine slide direction
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="overflow-hidden scale-75">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={itemOffset} // 🔥 Ensures new page triggers animation
                        initial={{ x: direction * 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -direction * 100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="grid md:grid-cols-3  gap-6"
                    >
                        {currentReviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg border border-gray-200 rounded-xl flex flex-col items-center p-6 text-center transition hover:scale-105"
                            >
                                
                                <Rating style={{ maxWidth: 250 }} value={review.rating} readOnly />
                                <p className="text-gray-600 mt-2">{review.text}</p>
                                <h2 className="text-lg font-semibold mt-2">{review.name || "User Name"}</h2>
                                <img src={review.photo || "/human.jpg"} alt={review.name} className="w-20 h-20 rounded-full mt-3 border-2 border-gray-300 shadow-md" />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {pageCount > 1 && (
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="flex justify-center items-center mt-6 space-x-4"
                    previousLabel="←"
                    nextLabel="→"
                    breakLabel="..."
                    pageClassName="px-3 py-2 border rounded-md  hover:bg-yellow-500 hover:text-white"
                    activeClassName="bg-yellow-500 text-white"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    previousClassName="px-3 py-2  text-white rounded-md hover:bg-yellow-500 "
                    nextClassName="px-3 py-2  text-white rounded-md hover:bg-yellow-500 "
                />
            )}
        </>
    );
};

const Review = () => {
    const axiosSecure = useAxiosPublic();
    const { data: reviews = [], isLoading, error } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const result = await axiosSecure.get("/reviews");
            return result.data;
        }
    });

    if (isLoading) return <p className="text-center text-lg font-semibold">Loading reviews...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load reviews</p>;

    const topReviews = reviews.filter((rev) => rev.rating === 5);

    return (
        <div className="mx-auto w-11/12 mb-24">
            <h1 className="text-2xl md:text-4xl font-bold  my-8 text-center ">What Our Customer Says</h1>
            <PaginatedReviews itemsPerPage={3} reviews={topReviews} />
        </div>
    );
};

export default Review;
