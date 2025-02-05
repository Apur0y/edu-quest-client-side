import React from 'react';
import Banner from '../Banner/Banner';
import StudySession from '../studySession/studySession';
import AllTutors from '../AllTutors/AllTutors';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <StudySession></StudySession>
           <AllTutors></AllTutors>
        </div>
    );
};

export default Home;