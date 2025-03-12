import React from 'react';
import { Button } from 'antd';
import './Banner.css'

const Banner = ({ heading, text, button, bannerMobile, bannerDesktop, CategoryLink}) => {

    return (
        <div className="relative banner-container md:h-[480px]  overflow-hidden">
            <picture>
                <source media="(min-width: 768px)" srcSet={bannerDesktop} />
                <img
                    src={bannerMobile} // Fallback image for mobile
                    alt="Banner"
                    className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                />
            </picture>
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-6">
                <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide leading-tight drop-shadow-lg">
                    {heading}
                </h1>
                <p className="text-white text-md md:text-lg mt-4 max-w-2xl drop-shadow-md">
                    {text}
                </p>
                <Button
                    className="mt-6 px-8 py-3 bg-red-600 text-white font-semibold transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-700 rounded-lg" 
                    type="primary" 
                    size="large"
                    href={CategoryLink}
                >
                    {button}
                </Button>
            </div>
        </div>
    );
};

export default Banner;
