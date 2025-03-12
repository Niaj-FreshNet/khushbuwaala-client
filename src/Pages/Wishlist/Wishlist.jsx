import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Row, Col } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'; // Import icons
import { FcEmptyTrash } from "react-icons/fc";
import { WishlistContext } from "../../Wishlist/WishlistContext";
import ProductCard from '../../Components/ProductCard/ProductCard';
import { PiColumnsFill } from 'react-icons/pi';
import { HiViewColumns } from 'react-icons/hi2';
import { TbColumns1 } from 'react-icons/tb';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
    const [columns, setColumns] = useState(1); // Default column layout for mobile

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Column control handler
    const handleColumnChange = (cols) => {
        setColumns(cols);
    };

    // Effect to set initial columns based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) { // Assuming 640px is the breakpoint for mobile
                setColumns(4); // Set to 4 columns for desktop
            } else {
                setColumns(1); // Set to 2 columns for mobile
            }
        };

        // Initial check
        handleResize();

        // Attach resize event listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto bg-white mt-9 lg:mt-8 py-8">
            {/* Shopping Cart Page Header */}
            <div className="bg-black flex justify-center wishlistItems-center py-0 mb-8">
                <h2 className="text-lg pt-2 font-bold text-white text-center">Wishlist</h2>
            </div>

            <div className="'max-w-screen-2xl lg:px-4 pb-8 max-w-screen-lg mx-auto p-3">
                {wishlistItems.length > 0 ? (
                    <>
                        <div className="flex flex-col gap-4">

                            {/* Column Control & Sort Component */}
                            <div className="flex justify-center bg-white px-2 mb-3">

                                <div className="flex gap-2">
                                    {/* Show only 1 and 2 columns on mobile, and 2, 3, 4, 5 on larger screens */}
                                    <Button onClick={() => handleColumnChange(1)} className="sm:hidden text-sm">
                                        <TbColumns1 size={20} />
                                    </Button>
                                    <Button onClick={() => handleColumnChange(2)} className="text-sm">
                                        <PiColumnsFill size={20} />
                                    </Button>
                                    <Button onClick={() => handleColumnChange(3)} className="hidden md:block text-sm">
                                        <HiViewColumns size={20} />
                                    </Button>
                                    <Button onClick={() => handleColumnChange(4)} className="hidden md:block text-sm">
                                        <div className='flex'>
                                            <PiColumnsFill size={20} />
                                            <PiColumnsFill size={20} />
                                        </div>
                                    </Button>
                                    <Button onClick={() => handleColumnChange(5)} className="hidden md:block text-sm">
                                        <div className='flex'>
                                            <PiColumnsFill size={20} />
                                            <HiViewColumns size={20} />
                                        </div>
                                    </Button>
                                </div>

                            </div>

                            {/* Product List */}
                            <div className={`grid gap-1 md:gap-2 w-full ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : columns === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
                                {wishlistItems.map((product) => (
                                    <div key={product._id} className="relative">
                                        <ProductCard
                                            product={product}
                                            onAddToCart={handleAddToCart}
                                        />
                                        <Button
                                            onClick={() => removeFromWishlist(product)}
                                            type="default"
                                            icon={<DeleteOutlined />}
                                            className="absolute bottom-14 right-2 text-red-600"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    // Empty Cart Section
                    <div className="flex flex-col text-center justify-center mx-auto w-full my-24">
                        <div className="mx-auto">
                            <FcEmptyTrash className="w-48 h-48 mb-4 opacity-50" />
                        </div>
                        <h2 className="text-2xl text-center font-bold text-gray-600 mt-4">YOUR WISHLIST IS EMPTY.</h2>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            {/* Before proceeding to checkout, you must add some products to your shopping cart.<br /> */}
                            You will find a lot of interesting products on our "All Collection" page.
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            className="mt-6 text-sm font-semibold rounded-none bg-red-600 hover:bg-red-500 border-none"
                            onClick={() => window.location.href = '/shop'} // Adjust link to your shop page
                        >
                            RETURN TO SHOP
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Wishlist;