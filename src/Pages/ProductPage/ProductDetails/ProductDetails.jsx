import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import CartDrawer from '../../AddToCart/CartDrawer/CartDrawer';
import { CartContext } from '../../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import paymentMethod from '../../../assets/paymentMethod.svg';
import { WishlistContext } from '../../../Wishlist/WishlistContext';
import { FiShoppingCart, FiTag } from 'react-icons/fi';
import ReactPixel from 'react-facebook-pixel';


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
    const { addToWishlist, wishlistItems } = useContext(WishlistContext);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [variantPrice, setVariantPrice] = useState(product.price);
    const [cartVisible, setCartVisible] = useState(false);
    const [discount, setDiscount] = useState(product.discount || 0);
    const [discountedPrice, setDiscountedPrice] = useState(product.price);

    // Define sizes based on measurement and set up variant prices
    const sizes = product.measurement === 'ml'
        ? ['3 ml', '6 ml', '12 ml', '25 ml']
        : product.measurpriceement === 'gm'
            ? ['3 gm', '6 gm', '12 gm']
            : ['1 piece'];

    useEffect(() => {
        // Update the price based on the selected size
        if (selectedSize) {
            const price = product.variantPrices?.[selectedSize] || product.price;
            // console.log(product.variantPrices?.[selectedSize], price)
            setVariantPrice(price);
        }
    }, [selectedSize, product.variantPrices, product.price]);

    useEffect(() => {
        // Update the discount whenever the product changes
        setDiscount(product.discount || 0);
    }, [product]);

    useEffect(() => {
        // Recalculate the discounted price whenever variantPrice or discount changes
        const calculatedDiscountedPrice = variantPrice - (variantPrice * discount) / 100;
        setDiscountedPrice(calculatedDiscountedPrice);
    }, [variantPrice, discount]);

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

            // Facebook Pixel AddToCart event
            ReactPixel.track('AddToCart', {
                content_name: product.name,
                content_ids: [product._id],
                content_type: 'product',
                value: discountedPrice * quantity,
                currency: 'BDT',
            });
            message.success(`${product.name} (${selectedSize} * ${quantity} pcs) has been added to your cart!`);
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    const handleAddToWishlist = () => {
        // const existingWishlistItem = wishlistItems.filter(item => item._id === product._id);
        // console.log(existingWishlistItem)
        // console.log(wishlistItems, product._id)

        addToWishlist(product);
        if (!wishlistItems.some(item => item._id === product._id)) {
            addToWishlist(product);

            // Facebook Pixel AddToWishlist event
            ReactPixel.track('AddToWishlist', {
                content_name: product.name,
                content_ids: [product._id],
                content_type: 'product',
                value: product.price,
                currency: 'BDT',
            });
            message.success(`${product.name} has been added to your wishlist!`);
        } else {
            alert('This product is already in your wishlist.');
        }
    };



    const handleBuyNow = () => {
        if (selectedSize) {
            setCheckoutOnlyItem(product, quantity, selectedSize);
            navigate('/checkout');

            // Track InitiateCheckout event for Buy Now
            ReactPixel.track('InitiateCheckout', {
                content_name: product.name,
                content_ids: [product._id],
                content_type: 'product',
                value: product.price * quantity,
                currency: 'BDT',
            });
        } else {
            alert('Please select a size before purchasing.');
        }
    };

    const handleCloseCart = () => {
        setCartVisible(false);
    };

    return (
        <div className="md:col-span-7 flex flex-col gap-0">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            {/* <p className="text-2xl text-gray-600">{variantPrice} BDT</p> */}

            {/* Pricing Section */}
            <div className="flex items-center gap-4 mt-2">
                {discount > 0 ? (
                    <>
                        <div className="flex items-center gap-2">
                            <p className="text-xl text-gray-400 line-through">{variantPrice} BDT</p>
                            <p className="text-3xl text-red-600 font-bold">{discountedPrice.toFixed(2)} BDT</p>
                        </div>
                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <FiTag />
                            {discount}% OFF
                        </div>
                    </>
                ) : (
                    <p className="text-3xl text-red-600 font-bold">{variantPrice} BDT</p>
                )}
            </div>

            {/* Truncated Description with Read More */}
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                {showFullDescription
                    ? product.description  // Show full description
                    : truncateDescription(product.description, 31)}
                {!showFullDescription && (
                    <span
                        onClick={handleReadMore}
                        className="text-blue-600 font-semibold cursor-pointer underline ml-2"
                    >
                        Read more
                    </span>
                )}
            </p>

            {/* Size Selector */}
            <div className="flex flex-col gap-0 mt-4 items-start">
                <p className="text-md font-bold text-gray-600">Size: <span>{selectedSize}</span></p>
                <div className="flex gap-2 text-sm">
                    {sizes.map((size) => (
                        <div
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`cursor-pointer border rounded-none py-2 px-4 text-center transition-colors duration-200 
                            ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-300'}`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            {/* Quantity Selector with Add to Cart and Wishlist Button */}
            <div className="flex flex-col items-start gap-2 mt-4">
                <div className='w-full flex justify-between items-center gap-4 mb-2'>
                    <div className='flex items-center gap-2'>
                        <Button
                            onClick={handleDecrease}
                            className="btn-sm rounded-none text-base border-gray-300 hover:bg-gray-200"
                        >
                            -
                        </Button>
                        <Input
                            min={1}
                            value={quantity}
                            className="btn-sm rounded-none text-base w-12 text-center"

                        />
                        <Button
                            onClick={handleIncrease}
                            className="btn-sm rounded-none text-base border-gray-300 hover:bg-gray-200"
                        >
                            +
                        </Button>
                    </div>
                    <div className='flex flex-end'>
                        <Button
                            onClick={handleAddToWishlist}
                            type="default"
                            icon={<AiOutlineHeart />}
                            className="btn-sm rounded-none text-blue-600 text-xl border-gray-300 hover:border-gray-500 hover:bg-gray-100"
                        >
                        </Button>
                    </div>
                </div>
                <Button
                    onClick={handleAddToCart}
                    size='large'
                    type="primary"
                    icon={<FiShoppingCart />}
                    className="mt-2 btn-md text-base uppercase rounded-none font-semibold bg-red-600 hover:bg-green-700 text-white flex-grow w-full"
                >
                    Add to Cart
                </Button>
                <CartDrawer visible={cartVisible} onClose={handleCloseCart} product={product} />
            </div>

            {/* Buy Now Button */}
            <Button
                size='large'
                type="primary"
                className="mt-3 btn-md text-lg uppercase rounded-none font-bold bg-green-600 text-white hover:bg-green-700 w-full"
                onClick={handleBuyNow}
            >
                Buy Now
            </Button>

            {/* Payment Methods */}
            <div className="mt-4 mb-2 p-2">
                <img src={paymentMethod} alt="paymentMethod" />
            </div>



        </div>
    );
};

export default ProductDetails;
