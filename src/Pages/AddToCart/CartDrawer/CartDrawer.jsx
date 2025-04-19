import { Button, Drawer } from 'antd';
import { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CartContext } from '../../../Cart/CartContext';
import { FcEmptyTrash } from 'react-icons/fc';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

const CartDrawer = ({ visible, onClose, product }) => {
    const { cartItems, updateQuantity, removeFromCart, calculateSubtotal, proceedToCartCheckout } = useContext(CartContext);
    const navigate = useNavigate();

    const redirectToCart = () => {
        onClose(true);
        navigate('/cart');
    };

    const handleCartCheckout = () => {
        // Trigger Meta Pixel "Initiate Checkout" event
        ReactPixel.track('InitiateCheckout', {
            content_ids: cartItems.map(item => item._id),
            content_type: 'product',
            value: calculateSubtotal(),
            currency: 'BDT',
        });

        onClose(true);
        proceedToCartCheckout();
        navigate('/checkout');
    };

    return (
        <Drawer
            title="Shopping Cart"
            headerStyle={{ padding: '4px 20px 4px 28px' }}
            placement="right"
            onClose={() => onClose(false)}
            visible={visible}
            width={300}
            closable={false}
            extra={
                <Button onClick={() => onClose(false)} type="text" icon={<AiOutlineClose size={26} />} />
            }
            bodyStyle={{ padding: '0', height: '100%', overflow: 'hidden' }} // Avoid scrolling in the drawer
        >
            <div className="flex flex-col h-full">
                {/* Cart Items */}
                <div className='flex flex-col overflow-y-auto flex-grow p-4'>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={index} className='flex items-start justify-between border-b py-4 transition-all hover:bg-gray-50'>
                                {/* Product Image */}
                                <div className='w-26 h-36 flex-shrink-0 rounded overflow-hidden'>
                                    <img
                                        src={item.primaryImage || 'https://via.placeholder.com/150'} // Placeholder image if not available
                                        alt={item.name}
                                        className='w-full h-full object-cover'
                                    />
                                </div>

                                {/* Product Details */}
                                <div className='flex-1 space-y-1 pl-4'>
                                    <h4 className='font-semibold text-base mb-2'>{item.name}</h4>
                                    <p className='text-sm text-gray-500'>Size: {item.size}</p>
                                    <p className='text-md text-gray-800'>Tk {item.variantPrices[item.size]?.toFixed(2)} BDT</p>
                                    <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                                    <Button
                                        icon={<FaTrashAlt size={20} className='mt-8' />}
                                        type="link"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeFromCart(item._id, item.size)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10">
                            <FcEmptyTrash className="w-32 h-32 mb-4 opacity-50" />
                            <p className="text-lg text-gray-500">Your cart is empty.</p>
                            <p className="text-sm text-gray-400">Add some products to see them here.</p>
                        </div>
                    )}
                </div>


                <div className='h-2/5'>
                    <div className='flex justify-between items-center px-4 pt-4 pb-3'>
                        <span>Subtotal:</span>
                        <span className='font-semibold'>Tk {calculateSubtotal()?.toFixed(2)} BDT</span>
                    </div>
                    {/* <p className='text-sm text-gray-500 p-4'>Taxes and shipping calculated at checkout</p> */}

                    {/* Add View Cart button here */}
                    <div className='flex justify-center px-4 pt-2 pb-2'>
                        <Button onClick={redirectToCart} type="default" className='border-gray-800 text-black w-full'>
                            View Cart
                        </Button>
                    </div>

                    <p className='text-xs text-gray-500 px-4 pt-4'>
                        All charges are billed in BDT. While the content of your cart is currently displayed in BDT, the checkout will use BDT at the most current exchange rate.
                    </p>
                    <div className='flex justify-center p-4'>
                        <Button type="primary" className='btn bg-red-600  text-white text-lg font-bold w-full'
                            onClick={handleCartCheckout}
                        >
                            Checkout</Button>
                    </div>
                </div>

            </div>
        </Drawer>
    );
};

export default CartDrawer;