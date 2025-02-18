import React from 'react';
import Banner from '../Banner/Banner';
import StudySession from '../studySession/studySession';
import AllTutors from '../AllTutors/AllTutors';
import Collaborate from '../Collaborate/Collaborate';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <StudySession></StudySession>
           <AllTutors></AllTutors>
           <Collaborate></Collaborate>
        </div>
    );
};

export default Home;