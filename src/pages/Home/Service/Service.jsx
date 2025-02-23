import React from 'react';
import ServiceCard from './ServiceCard';

const Service = () => {

    const educationalServices = [
        {
          title: "Web Development",
          picture: "https://cursa-cat-img.s3.us-east-1.amazonaws.com/fr/linformatique.webp",
          tutors: ["John Doe", "Jane Smith", "Alice Johnson"],
          availableCourses: 12
        },
        {
          title: "Machine Learning",
          picture: "https://cursa-cat-img.s3.us-east-1.amazonaws.com/fr/linformatique.webp",
          tutors: ["Dr. Alan Turing", "Elena Verma", "Michael Scott"],
          availableCourses: 8
        },
        {
          title: "Mathematics",
          picture: "https://cursa-cat-img.s3.us-east-1.amazonaws.com/fr/linformatique.webp",
          tutors: ["Prof. Richard Feynman", "Dr. Sophie Lee", "David Kim"],
          availableCourses: 15
        },
        {
          title: "Database Management",
          picture: "https://cursa-cat-img.s3.us-east-1.amazonaws.com/fr/linformatique.webp",
          tutors: ["Maria Garcia", "Robert Lang", "Emily Davis"],
          availableCourses: 10
        },
        {
          title: "Cybersecurity",
          picture: "https://cursa-cat-img.s3.us-east-1.amazonaws.com/fr/linformatique.webp",
          tutors: ["Ethan Hunt", "Sophia White", "Noah Carter"],
          availableCourses: 7
        },
        {
          title: "Cloud Computing",
          picture: "https://cursa-cat-img.s3.us-east-1.amazonaws.com/fr/linformatique.webp",
          tutors: ["Dr. Henry Green", "Olivia Adams", "William Brown"],
          availableCourses: 9
        }
      ];
      

      

    return (
        <div className='w-11/12 mx-auto my-9'>
              <h1 className="text-3xl text-center md:text-5xl font-bold text-[#c6fefe] underline py-6 ">Explore Your Field</h1>
             
               
              <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                {
                    educationalServices.map(course=><ServiceCard key={course.id} value={course}></ServiceCard>)
                }
              </div>

           
            
            
        </div>
    );
};

export default Service;