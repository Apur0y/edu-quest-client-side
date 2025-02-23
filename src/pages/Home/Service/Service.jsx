import React from 'react';

const Service = () => {

    const educationalServices = [
        {
          title: "Web Development",
          picture: "https://example.com/web-development.jpg",
          tutors: ["John Doe", "Jane Smith", "Alice Johnson"],
          availableCourses: 12
        },
        {
          title: "Machine Learning",
          picture: "https://example.com/machine-learning.jpg",
          tutors: ["Dr. Alan Turing", "Elena Verma", "Michael Scott"],
          availableCourses: 8
        },
        {
          title: "Mathematics",
          picture: "https://example.com/mathematics.jpg",
          tutors: ["Prof. Richard Feynman", "Dr. Sophie Lee", "David Kim"],
          availableCourses: 15
        },
        {
          title: "Database Management",
          picture: "https://example.com/database.jpg",
          tutors: ["Maria Garcia", "Robert Lang", "Emily Davis"],
          availableCourses: 10
        },
        {
          title: "Cybersecurity",
          picture: "https://example.com/cybersecurity.jpg",
          tutors: ["Ethan Hunt", "Sophia White", "Noah Carter"],
          availableCourses: 7
        },
        {
          title: "Cloud Computing",
          picture: "https://example.com/cloud-computing.jpg",
          tutors: ["Dr. Henry Green", "Olivia Adams", "William Brown"],
          availableCourses: 9
        }
      ];
      

      

    return (
        <div className='w-11/12 mx-auto'>
              <h1 className="text-3xl md:text-5xl font-bold text-[#EAEDED] underline py-6 ">What We Provide</h1>
            
        </div>
    );
};

export default Service;