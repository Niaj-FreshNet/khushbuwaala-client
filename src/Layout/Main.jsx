import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import BottomBar from '../Shared/BottomBar/BottomBar';

const Main = () => {
    return (
        <div className='relative'>
            <Navbar />
            <div className='flex-grow mx-auto'>
                <Outlet />
            </div>
            <Footer />
            <BottomBar />
        </div>
    );
};

export default Main;