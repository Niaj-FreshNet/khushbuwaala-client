import React from 'react';
import ShowCase1 from '../../../assets/ShowCase1.jpg';
import './ShowCase.css';

const ShowCase = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-6'>
            {/* First image container */}
            <div className='relative group'>
                <div className='transition-transform duration-500 ease-in-out transform group-hover:scale-105 shadow-lg'>
                    <img
                        className='rounded-lg'
                        src={ShowCase1}
                        alt="Showcase Image 1"
                    />
                    <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                        <p className='text-white text-xl font-bold animate-fade-in'>Discover More</p>
                    </div>
                </div>
            </div>

            {/* Second image container */}
            <div className='relative group'>
                <div className='transition-transform duration-500 ease-in-out transform group-hover:scale-105 shadow-lg'>
                    <img
                        className='rounded-lg'
                        src={ShowCase1}
                        alt="Showcase Image 2"
                    />
                    <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                        <p className='text-white text-xl font-bold animate-fade-in'>Discover More</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowCase;
