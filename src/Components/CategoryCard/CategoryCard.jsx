import React from 'react';
import { SfLink } from '@storefront-ui/react';
import './CategoryCard.css'; // Import custom styles

const CategoryCard = ({ CategoryImage, CategoryName, CategoryLink }) => {
    return (
        <div className="category-card border border-neutral-200 hover:shadow-lg  overflow-hidden">
            <div className="relative">
                <SfLink href={CategoryLink} className="block">
                    <img
                        src={CategoryImage}
                        alt="Category"
                        className="w-full h-[420px] md:h-[520px] object-cover transition-opacity duration-300 ease-in-out"
                    />
                    <div className="overlay absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-20 transition-opacity duration-300">
                        <p className="category-name text-2xl md:text-3xl font-bold text-white px-4 text-shadow transition-transform duration-300">
                            {CategoryName}
                        </p>
                    </div>
                </SfLink>
            </div>
        </div>
    );
};

export default CategoryCard;
