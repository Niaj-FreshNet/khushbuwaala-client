import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const [checkoutItem, setCheckoutItem] = useState(null);
    const [checkoutMode, setCheckoutMode] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity, selectedSize) => {
        // console.log("Adding to cart:", product, product._id, quantity, selectedSize);
        // console.log("Current cart items:", cartItems);

        const existingProductIndex = cartItems.findIndex(
            (item) => item._id === product._id && item.size === selectedSize
        );

        if (existingProductIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity, size: selectedSize }]);
        }
    };

    // const addToCart = (product) => {
    //     setCartItems((prevItems) => {
    //       const existingItemIndex = prevItems.findIndex(
    //         (item) => item.id === product.id && item.size === product.size
    //       );
    
    //       if (existingItemIndex >= 0) {
    //         const updatedItems = [...prevItems];
    //         updatedItems[existingItemIndex].quantity += product.quantity;
    //         return updatedItems;
    //       }
    
    //       return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    //     });
    //   };

    const updateQuantity = (productId, size, quantity) => {
        setCartItems(cartItems.map(item =>
            item._id === productId && item.size === size ? { ...item, quantity } : item
        ));
    };

    const removeFromCart = (productId, size) => {
        setCartItems(cartItems.filter(item => item._id !== productId || item.size !== size));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.variantPrices[item.size] * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const taxes = subtotal * 0.00; // e.g., 0% tax rate
        return subtotal + taxes;
    };

    const setCheckoutOnlyItem = (product, quantity, size) => {
        setCheckoutItem({ ...product, quantity, size });
        setCheckoutMode(true); // Enable single-item checkout
    };

    const proceedToCartCheckout = () => {
        setCheckoutMode(false); // Normal checkout mode for all cart items
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            calculateSubtotal,
            calculateTotal,
            setCheckoutOnlyItem,
            proceedToCartCheckout,
            checkoutItem,
            checkoutMode,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
