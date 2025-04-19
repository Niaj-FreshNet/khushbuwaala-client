import React from 'react';
import { Button } from 'antd';

const ShopBanner = ({ heading, text, button, bannerDesktop, bannerMobile }) => {
    return (
        <div className="mt-16 relative md:h-[360px] overflow-hidden">
            <div className="w-full md:w-full mx-auto">
                <picture>
                    <source media="(min-width: 768px)" srcSet={bannerDesktop} />
                    <img
                        src={bannerMobile} // Fallback image for mobile
                        alt="Banner"
                        className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                    />
                </picture>
                <div className="absolute inset-0 bg-gray-600 bg-opacity-60 flex flex-col justify-center items-center text-center p-6">
                    <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-widest leading-tight drop-shadow-lg">
                        {heading}
                    </h1>
                    <p className="absolute bottom-2 text-white text-md md:text-xl mt-4 px-6 md:px-0 max-w-2xl drop-shadow-md">
                        {text}
                    </p>
                    {/* <Button 
                        className="absolute bottom-10 mt-6 px-8 py-3 bg-red-600 text-white font-semibold transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-700 rounded-lg" 
                        type="primary" 
                        size="large"
                    >
                        {button}
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default ShopBanner;
