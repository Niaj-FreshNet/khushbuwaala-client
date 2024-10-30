// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import Breadcrumbs from '../BreadCrumbs/BreadCrumbs';
// import ProductAccordion from '../ProductAccordion/ProductAccordion';
// import ProductDetails from '../ProductDetails/ProductDetails';
// import ProductGallery from '../ProductGallery/ProductGallery';
// import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';
// import RelatedProduct from '../RelatedProduct/RelatedProduct';
// import { PiSquaresFour } from 'react-icons/pi';
// import Card1 from '../../../assets/Card1.jpg';
// import Card2 from '../../../assets/Card2.jpg';

// const ProductPage = () => {
//     const { state } = useLocation(); // Get the state from the navigate call
//     const { productSlug } = useParams(); // Get the slug from the URL params
//     const [product, setProduct] = useState(state?.product || {}); // Initialize state with the product passed via state or an empty object
//     const [selectedSize, setSelectedSize] = useState('');
//     const [activeKey, setActiveKey] = useState(null);
//     const descriptionPanelRef = useRef(null);

//     useEffect(() => {
//         if (!product.name) {
//             // Fetch the product by slug if it's not passed via state
//             // Replace with your actual fetching logic
//             fetch(`/api/products/${productSlug}`)
//                 .then((response) => response.json())
//                 .then((data) => setProduct(data))
//                 .catch((error) => console.error('Error fetching product:', error));
//         }
//     }, [productSlug, product.name]);

//     if (!product.name) {
//         return <div>Loading...</div>;
//     }

//     console.log('Product in ProductPage:', product);

//     if (!selectedSize && product.sizes?.length > 0) {
//         setSelectedSize(product.sizes[0]);
//     }

//     const handleReadMoreClick = () => {
//         descriptionPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
//         setActiveKey('1');
//     };

//     return (
//         <div className="max-w-screen-2xl mx-auto mt-9 lg:mt-8 mb-8 py-8">
//             <div className="bg-gray-100 mx-auto flex justify-between px-6 lg:px-20 py-2 lg:py-4">
//                 <Breadcrumbs />
//                 <PiSquaresFour href="/shop" size={24} cursor="pointer" />
//             </div>
//             <div className="max-w-screen-xl px-4 mx-auto">
//                 <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
//                     <div className="lg:w-1/2">
//                         <ProductGallery
//                             images={product.images || [
//                                 { imageSrc: Card1, imageThumbSrc: Card1, alt: 'Card 1' },
//                                 { imageSrc: Card2, imageThumbSrc: Card2, alt: 'Card 2' }
//                             ]}
//                             productName={product.name}
//                         />
//                     </div>
//                     <div className="lg:w-1/2 mt-2 lg:mt-0 flex flex-col lg:pr-8">
//                         <ProductDetails
//                             product={product}
//                             selectedSize={selectedSize}
//                             setSelectedSize={setSelectedSize}
//                             onReadMore={handleReadMoreClick}
//                         />
//                         <ProductAccordion
//                             product={product}
//                             activeKey={activeKey}
//                             setActiveKey={setActiveKey}
//                             descriptionPanelRef={descriptionPanelRef}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <RelatedProduct />
//             <RecentlyViewed />
//         </div>
//     );
// };

// export default ProductPage;

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumbs from '../BreadCrumbs/BreadCrumbs';
import ProductAccordion from '../ProductAccordion/ProductAccordion';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductGallery from '../ProductGallery/ProductGallery';
import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { PiSquaresFour } from 'react-icons/pi';
import Card1 from '../../../assets/Card1.jpg';
import Card2 from '../../../assets/Card2.jpg';
import useItem from '../../../Hooks/useItems';

const ProductPage = () => {
    const { state } = useLocation(); // Get the state from the navigate call
    const { productSlug } = useParams(); // Get the slug from the URL params
    const [activeKey, setActiveKey] = useState(null);
    const descriptionPanelRef = useRef(null);
    
    // Use the custom hook to retrieve all items
    const [items, refetch, isLoading, isError, error] = useItem();

    // Find the product by slug
    const product = state?.product || items.find(item => item.slug === productSlug) || {};

    // Handle cases when product data is still loading or missing
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!state && !product.name && !isLoading) {
            refetch(); // Trigger refetch if the product wasn't found in initial load
        }
    }, [productSlug, state, product, isLoading, refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!product.name) {
        return <div>Product not found</div>;
    }


    console.log('Product in ProductPage:', product);

    const handleReadMoreClick = () => {
        descriptionPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveKey('1');
    };

    return (
        <div className="max-w-screen-2xl mx-auto mt-9 lg:mt-8 mb-8 py-8">
            <div className="bg-gray-100 mx-auto flex justify-between px-6 lg:px-20 py-2 lg:py-4">
                <Breadcrumbs product={product} />
                <PiSquaresFour href="/shop" size={24} cursor="pointer" />
            </div>
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
                    <div className="lg:w-1/2">
                        <ProductGallery
                            // images={product.images || [
                            //     { imageSrc: Card1, imageThumbSrc: Card1, alt: 'Card 1' },
                            //     { imageSrc: Card2, imageThumbSrc: Card2, alt: 'Card 2' }
                            // ]}
                            // productName={product.name}
                            product={product}
                        />
                    </div>
                    <div className="lg:w-1/2 mt-2 lg:mt-0 flex flex-col lg:pr-8">
                        <ProductDetails
                            product={product}
                            onReadMore={handleReadMoreClick}
                        />
                        <ProductAccordion
                            product={product}
                            activeKey={activeKey}
                            setActiveKey={setActiveKey}
                            descriptionPanelRef={descriptionPanelRef}
                        />
                    </div>
                </div>
            </div>
            <RelatedProduct product={product} />
            <RecentlyViewed />
        </div>
    );
};

export default ProductPage;
