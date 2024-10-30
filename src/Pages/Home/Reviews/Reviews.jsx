import React from 'react';
import { FacebookFilled, InstagramFilled } from '@ant-design/icons'; // Ensure you have these icons installed
import { Divider } from 'antd';

const celebrities = [
    {
        name: "Celebrity 1",
        image: "https://via.placeholder.com/150", // Replace with the actual image URL
    },
    {
        name: "Celebrity 2",
        image: "https://via.placeholder.com/150", // Replace with the actual image URL
    },
    {
        name: "Celebrity 3",
        image: "https://via.placeholder.com/150", // Replace with the actual image URL
    },
    {
        name: "Celebrity 3",
        image: "https://via.placeholder.com/150", // Replace with the actual image URL
    },
];

const Reviews = () => {
    return (
        <div className="py-4 px-4 text-center">
            <h2 className="text-xl font-bold -mb-2 relative">
                Inspired by us
            </h2>
            <Divider dashed>
                <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
            </Divider>

            {/* Centering the grid container */}
            <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-screen-md">
                    {celebrities.map((celebrity, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={celebrity.image}
                                alt={celebrity.name}
                                className="w-full h-64 object-cover rounded-lg shadow-md mx-auto" // Image centered
                            />
                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-center">
                                <div className="flex space-x-4" style={{ marginTop: '60%' }}>
                                    <a href="#" aria-label="Facebook">
                                        <FacebookFilled className="text-white text-3xl" />
                                    </a>
                                    <a href="#" aria-label="Instagram">
                                        <InstagramFilled className="text-white text-3xl" />
                                    </a>
                                </div>
                            </div>
                            <p className="text-center mt-2 font-semibold">{celebrity.name}</p> {/* Name below the image */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
