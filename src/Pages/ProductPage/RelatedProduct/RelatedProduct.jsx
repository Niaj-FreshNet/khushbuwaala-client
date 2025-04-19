// RelatedProduct.js
import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import useItem from '../../../Hooks/useItems';

const RelatedProduct = ({ product }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [items, refetch, isLoading, isError, error] = useItem(); // items, not { item }

    useEffect(() => {
        if (product && product.category && Array.isArray(product.smell)) {
            // Filter items based on similar category and at least one matching smell
            const filteredProducts = items.filter((item) => {
                const isSameCategory = item.category === product.category;
                const hasMatchingSmell =
                    Array.isArray(item.smell) && item.smell.some(smell => product.smell.includes(smell));
                return isSameCategory && hasMatchingSmell && item._id !== product._id;
            });

            setRelatedProducts(filteredProducts.slice(0, 4)); // Limit to 4 products
        }
    }, [items, product]);

    return (
        <div className="text-black mt-12 px-2">
            <h2 className="text-lg text-black divider my-10 font-semibold">You may also like</h2>
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
                {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct._id} product={relatedProduct} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProduct;
