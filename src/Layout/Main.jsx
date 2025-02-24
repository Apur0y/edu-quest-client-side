import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import useAuth from '../hooks/useAuth';

const Main = () => {
    const {theme} = useAuth()
    return (
        <div className={`${theme? "bg-[#0D1F1E] text-[#EAEDED]" : "bg-white text-black"}`}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;