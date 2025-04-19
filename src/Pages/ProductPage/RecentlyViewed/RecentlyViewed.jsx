// RecentlyViewedProducts.js
import React from 'react';
import { Divider } from 'antd';
import ProductCard from '../../../Components/ProductCard/ProductCard';

const RecentlyViewed = () => {
    return (
        <div className="mt-16 px-2">
            <h2 className="text-lg divider my-6 font-semibold">Recently Viewed Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
};

export default RecentlyViewed;
