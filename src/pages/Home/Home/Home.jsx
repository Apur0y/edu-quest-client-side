import React from 'react';
import Banner from '../Banner/Banner';
import StudySession from '../studySession/studySession';
import AllTutors from '../AllTutors/AllTutors';
import Collaborate from '../Collaborate/Collaborate';
import Review from '../Reviews/Review';
import Contact from '../Contact/Contact';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <StudySession></StudySession>
           <AllTutors></AllTutors>
           <Collaborate></Collaborate>
           <Review></Review>
           <Contact></Contact>
        </div>
    );
};

export default Home;