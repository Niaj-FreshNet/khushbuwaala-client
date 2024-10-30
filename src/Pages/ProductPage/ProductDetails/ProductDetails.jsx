import React, { useContext, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import CartDrawer from '../../AddToCart/CartDrawer/CartDrawer';
import { CartContext } from '../../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';

// Function to truncate the description to a specified number of words
const truncateDescription = (description = '', maxLength) => {
    if (!description) return ''; // Ensure description is not undefined
    const words = description.split(' '); // Safely split the description
    return words.length > maxLength
        ? words.slice(0, maxLength).join(' ') + '...'
        : description;
};

const ProductDetails = ({ product, onReadMore }) => {
    const { addToCart, setCheckoutOnlyItem } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [variantPrice, setVariantPrice] = useState(product.price);
    const [cartVisible, setCartVisible] = useState(false);

    // Define sizes based on measurement and set up variant prices
    const sizes = product.measurement === 'ml'
        ? ['3 ml', '6 ml', '12 ml', '25 ml']
        : product.measurement === 'gm'
            ? ['3 gm', '6 gm', '12 gm']
            : ['1 piece'];

    useEffect(() => {
        // Update the price based on the selected size
        if (selectedSize) {
            const price = product.variantPrices?.[selectedSize] || product.price;
            setVariantPrice(price);
        }
    }, [selectedSize, product.variantPrices, product.price]);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    // Handle "Read more" click to show the full description and scroll to the accordion
    const handleReadMore = () => {
        setShowFullDescription(false);
        onReadMore();  // Trigger the scroll and accordion opening
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product, quantity, selectedSize);
            setCartVisible(true);
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    const handleBuyNow = () => {
        if (selectedSize) {
            setCheckoutOnlyItem(product, quantity, selectedSize);
            navigate('/checkout');
        } else {
            alert('Please select a size before purchasing.');
        }
    };

    const handleCloseCart = () => {
        setCartVisible(false);
    };

    return (
        <div className="md:col-span-7 flex flex-col gap-0">
            <h1 className="text-2xl text-black">{product.name}</h1>
            <p className="text-2xl text-gray-600">{variantPrice} BDT</p>

            {/* Truncated Description with Read More */}
            <p className="text-sm text-gray-600 mt-2 font-thin">
                {showFullDescription
                    ? product.description  // Show full description
                    : truncateDescription(product.description, 31)}
                {!showFullDescription && (
                    <span
                        onClick={handleReadMore}
                        className="text-blue-500 cursor-pointer underline ml-2"
                    >
                        Read more
                    </span>
                )}
            </p>

            {/* Size Selector */}
            <div className="flex flex-col gap-1 mt-4 items-start">
                <p className="text-md font-bold text-gray-600">Size: <span>{selectedSize}</span></p>
                <div className="flex gap-2 text-sm">
                    {sizes.map((size) => (
                        <div
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`cursor-pointer border rounded-md py-2 px-4 text-center transition-colors duration-200 
                            ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-300'}`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            {/* Quantity Selector with Add to Cart and Wishlist Button */}
            <div className="flex flex-col items-start gap-2 mt-6">
                <div className='flex justify-between items-center gap-4 mb-2'>
                    <div className='flex items-center gap-2'>
                        <Button
                            onClick={handleDecrease}
                            className="border border-gray-300 hover:bg-gray-200"
                        >
                            -
                        </Button>
                        <Input
                            min={1}
                            value={quantity}
                            className="w-12 text-center"

                        />
                        <Button
                            onClick={handleIncrease}
                            className="border border-gray-300 hover:bg-gray-200"
                        >
                            +
                        </Button>
                    </div>
                    <div className='flex flex-end'>
                        <Button
                            type="default"
                            icon={<AiOutlineHeart />}
                            className="text-blue-600 text-lg border-gray-300 hover:border-gray-500 hover:bg-gray-100"
                        >
                        </Button>
                    </div>
                </div>
                <Button
                    onClick={handleAddToCart}
                    size='large'
                    type="primary"
                    icon={<AiOutlineShoppingCart />}
                    className="mt-2 uppercase font-semibold bg-red-600 hover:bg-red-700 text-white flex-grow w-full"
                >
                    Add to Cart
                </Button>
                <CartDrawer visible={cartVisible} onClose={handleCloseCart} product={product} />
            </div>

            {/* Buy Now Button */}
            <Button
                size='large'
                type="primary"
                className="mt-2 uppercase font-bold bg-green-600 text-white hover:bg-green-700 w-full"
                onClick={handleBuyNow}
            >
                Buy it Now
            </Button>

            {/* Payment Methods */}
            <div className="mt-6">
                <p>Payment Methods: Visa, Mastercard, PayPal, etc.</p>
            </div>
        </div>
    );
};

export default ProductDetails;
