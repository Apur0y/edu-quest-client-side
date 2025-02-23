import React from 'react';
import StudySession from '../Home/studySession/studySession';

const AllSession = () => {
    return (
        <div className='pt-24'>
            <StudySession all={true}></StudySession>
        </div>
    );
};

export default AllSession;