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
        const existingProductIndex = cartItems.findIndex(
            (item) => item.id === product.id && item.size === selectedSize
        );

        if (existingProductIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity, size: selectedSize }]);
        }
    };

    const updateQuantity = (productId, size, quantity) => {
        setCartItems(cartItems.map(item =>
            item.id === productId && item.size === size ? { ...item, quantity } : item
        ));
    };

    const removeFromCart = (productId, size) => {
        setCartItems(cartItems.filter(item => item.id !== productId || item.size !== size));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const taxes = subtotal * 0.075; // e.g., 7.5% tax rate
        return subtotal + taxes;
    };

    const setCheckoutOnlyItem = (product, quantity, size) => {
        setCheckoutItem({ ...product, quantity, size });
        setCheckoutMode(true); // Enable single-item checkout
    };

    const proceedToCartCheckout = () => {
        setCheckoutMode(false); // Normal checkout mode for all cart items
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
        }}>
            {children}
        </CartContext.Provider>
    );
};
