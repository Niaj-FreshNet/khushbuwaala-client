import React from 'react';
import { Button } from 'antd';
import BannerDesktop from '../../assets/Banner1.webp'; // Desktop Banner
import BannerMobile from '../../assets/Banner2.webp'; // Mobile Banner

const ShopBanner = ({ heading, text, button}) => {
    return (
        <div className="mt-16 relative banner-container md:h-[460px] overflow-hidden">
            <div className="w-full md:w-full mx-auto"> {/* Set width for mobile and desktop */}
                <picture>
                    <source media="(min-width: 768px)" srcSet={BannerDesktop} />
                    <img
                        src={BannerMobile} // Fallback image for mobile
                        alt="Banner"
                        className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                    />
                </picture>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-6">
                    <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide leading-tight drop-shadow-lg">
                        {heading}
                    </h1>
                    <p className="text-white text-lg md:text-xl mt-4 max-w-xl drop-shadow-md">
                        {text}
                    </p>
                    <Button 
                        className="mt-6 px-8 py-3 bg-red-600 text-white font-semibold transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-700 rounded-lg" 
                        type="primary" 
                        size="large"
                    >
                        {button}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShopBanner;