import React from 'react';
import { FacebookFilled, InstagramFilled } from '@ant-design/icons'; // Ensure you have these icons installed
import { Divider } from 'antd';
import review1 from '../../../assets/r5.webp';
import review2 from '../../../assets/r6.webp';
import review3 from '../../../assets/r3.webp';
import review4 from '../../../assets/r4.webp';

const celebrities = [
    {
        image: review1,
        facebookLink: "https://www.facebook.com/khushbuwaala",
        instagramLink: "https://www.instagram.com/khushbuwaala",
    },
    {
        image: review2,
        facebookLink: "https://www.facebook.com/khushbuwaala",
        instagramLink: "https://www.instagram.com/khushbuwaala",
    },
    {
        image: review3,
        facebookLink: "https://www.facebook.com/khushbuwaala",
        instagramLink: "https://www.instagram.com/khushbuwaala",
    },
    {
        image: review4,
        facebookLink: "https://www.facebook.com/khushbuwaala",
        instagramLink: "https://www.instagram.com/khushbuwaala",
    },
];

const Reviews = () => {
    return (
        <div className="py-4 px-4 text-center">
            <h2 className="text-xl font-bold mb-2 relative">
                Inspired by us
            </h2>
            <Divider dashed>
                <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
            </Divider>

            {/* Centering the grid container */}
            <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-screen-lg">
                    {celebrities.map((celebrity, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={celebrity.image}
                                alt={`Celebrity ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-center">
                                <div className="flex space-x-4">
                                    <a href={celebrity.facebookLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <FacebookFilled className="text-white text-3xl" />
                                    </a>
                                    <a href={celebrity.instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <InstagramFilled className="text-white text-3xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
