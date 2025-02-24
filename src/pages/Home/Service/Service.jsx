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
          picture: "https://designindc.com/wp-content/uploads/2022/12/Machine-Learning.jpg",
          tutors: ["Dr. Alan Turing", "Elena Verma", "Michael Scott"],
          availableCourses: 8
        },
        {
          title: "Mathematics",
          picture: "https://accountscoaching.com/wp-content/uploads/elementor/thumbs/Mathematics-Banner-qj69wgy3eiwz8wi0ebvw35m3fqboqmna8yurbu8a9s.webp",
          tutors: ["Prof. Richard Feynman", "Dr. Sophie Lee", "David Kim"],
          availableCourses: 15
        },
        {
          title: "Database Management",
          picture: "https://miro.medium.com/v2/resize:fit:1400/1*szBsfY6lp8A0jb1zOvJ0mw.jpeg",
          tutors: ["Maria Garcia", "Robert Lang", "Emily Davis"],
          availableCourses: 10
        },
        {
          title: "Cybersecurity",
          picture: "https://eu-images.contentstack.com/v3/assets/blt69509c9116440be8/blt8ffb90a2f64bacfa/6776f4544b281ca5e2bc465a/cybersecurity_NicoElNino-AlamyStockPhoto.jpg",
          tutors: ["Ethan Hunt", "Sophia White", "Noah Carter"],
          availableCourses: 7
        },
        {
          title: "Cloud Computing",
          picture: "https://emeritus.org/wp-content/uploads/2023/12/cloud-computing-skills-1024x536.png",
          tutors: ["Dr. Henry Green", "Olivia Adams", "William Brown"],
          availableCourses: 9
        }
      ];
      

      

    return (
        <div className='w-11/12 mx-auto mb-24'>
              <h1 className="text-3xl text-center md:text-5xl font-bold  underline py-6 ">Explore Your Field</h1>
             
               
              <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                {
                    educationalServices.map(course=><ServiceCard key={course.id} value={course}></ServiceCard>)
                }
              </div>

           
            
            
        </div>
    );
};

export default Service;