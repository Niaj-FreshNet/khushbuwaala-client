import React from 'react';
import { SfLink } from '@storefront-ui/react';
import Category1 from '../../assets/Category1.webp'; // Category image
// import Category2 from '../../assets/Category2.webp'; // Category image
import './CategoryCard.css'; // Import custom styles

const CategoryCard = () => {
    return (
        <div className="border border-neutral-200 hover:shadow-lg max-w-[360px] overflow-hidden"> {/* Set overflow to hidden */}
            <div className="relative">
                <SfLink className="block">
                    <img
                        src={Category1}
                        alt="Category"
                        className="w-full h-[420px] md:h-[520px] object-cover transition-opacity duration-300 ease-in-out" // Ensure proper image display
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-20">
                        <p className="text-xl font-bold text-white">
                            Premium Perfumes
                        </p>
                    </div>
                </SfLink>
            </div>
        </div>
    );
};

export default CategoryCard;
