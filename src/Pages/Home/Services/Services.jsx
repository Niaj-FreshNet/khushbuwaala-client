import React, { useState, useEffect } from 'react';
import Slider from "react-slick"; // Ensure you've installed react-slick and slick-carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Divider } from 'antd'; // Import Ant Design Divider

const Services = () => {
    const services = [
        {
            title: "FREE SHIPPING",
            description: "Free shipping for items over 1000 BDT.",
            icon: "📦",
        },
        {
            title: "SUPPORT 24/7",
            description: "Contact us 24 hours a day, 7 days a week.",
            icon: "🕒",
        },
        {
            title: "EASY EXCHANGE",
            description: "Free exchange within 7 days.",
            icon: "⟳",
        },
        {
            title: "SECURE PAYMENT",
            description: "We ensure secure payment.",
            icon: "🔒",
        },
    ];

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="p-6 text-black">
            {/* Optional Title */}
            {/* <h2 className="text-2xl font-medium text-left mb-4">Our Services</h2> */}

            {isMobile ? (
                <Slider {...sliderSettings}>
                    {services.map((service, index) => (
                        <div key={index} className="p-4">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-2">{service.icon}</span>
                                <h3 className="text-sm font-semibold text-center">{service.title}</h3>
                                <p className="text-gray-600 text-xs text-center">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="flex items-start justify-evenly">
                    {services.map((service, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-start mx-1">
                                <span className="text-3xl mr-2">{service.icon}</span>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold">{service.title}</h3>
                                    <p className="text-gray-600 text-xs">{service.description}</p>
                                </div>
                            </div>
                            {index < services.length - 1 && (
                                <Divider 
                                    type="vertical" 
                                    style={{ height: '80%', backgroundColor: 'black', width: '2px' }} // Custom styles for large divider
                                />
                            )} {/* Add vertical divider except for the last item */}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
