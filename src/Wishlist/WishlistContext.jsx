import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlistItems');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        // console.log('Adding to wishlist:', product);

        // Check if the product already exists in the wishlist
        const existingProduct = wishlistItems.some((item) => item._id === product._id);

        if (!existingProduct) {
            const updatedWishlist = [...wishlistItems, product];
            // console.log('Updated wishlist:', updatedWishlist);
            setWishlistItems(updatedWishlist);
        } else {
            // console.log('Product already exists in the wishlist');
        }
    };

    const removeFromWishlist = (product) => {
        // console.log(product);
        const updatedWishlist = wishlistItems.filter(item => item._id !== product._id);
        setWishlistItems(updatedWishlist);
        localStorage.removeItem('wishlistItems', JSON.stringify(updatedWishlist)); // Update localStorage
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};