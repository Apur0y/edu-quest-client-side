import React from 'react';
import Banner from '../Banner/Banner';
import StudySession from '../studySession/studySession';
import AllTutors from '../AllTutors/AllTutors';
import Collaborate from '../Collaborate/Collaborate';
import Review from '../Reviews/Review';
import Contact from '../Contact/Contact';
import Service from '../Service/Service';
import Success from '../Success/Success';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
   
            <StudySession></StudySession>
           <AllTutors></AllTutors>
           <Service></Service>
           <Collaborate></Collaborate>
           <Review></Review>
           <Success></Success>
           <Contact></Contact>
        </div>
    );
};

export default Home;