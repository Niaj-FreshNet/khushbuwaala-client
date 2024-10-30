import { Button, Drawer } from 'antd';
import { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { DeleteOutlined } from '@ant-design/icons'; // Import icons
import { CartContext } from '../../../Cart/CartContext';

const CartDrawer = ({ visible, onClose, product }) => {
    const { cartItems, updateQuantity, removeFromCart, calculateSubtotal, proceedToCartCheckout } = useContext(CartContext);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);



    const handleCartCheckout = () => {
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
            width={320}
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
                                    <h4 className='font-semibold text-base mb-1'>{item.name}</h4>
                                    <p className='text-xs text-gray-500'>Size: {item.size}</p>
                                    <p className='text-sm text-gray-800'>Tk {item.price.toFixed(2)} BDT</p>
                                    <p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        type="link"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeFromCart(item.id, item.size)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Empty Cart"
                                className="w-32 h-32 mb-4 opacity-50"
                            />
                            <p className="text-lg text-gray-500">Your cart is empty.</p>
                            <p className="text-sm text-gray-400">Add some products to see them here.</p>
                        </div>
                    )}
                </div>


                <div className='flex justify-between items-center font-bold p-4'>
                    <span>Subtotal:</span>
                    <span>Tk {subtotal.toFixed(2)} BDT</span>
                </div>
                <p className='text-sm text-gray-500 p-4'>Taxes and shipping calculated at checkout</p>

                {/* Add View Cart button here */}
                <div className='flex justify-center p-4'>
                    <Button href='/cart' type="default" className='w-full'>
                        View Cart
                    </Button>
                </div>

                <p className='text-xs text-gray-500 p-4'>
                    All charges are billed in BDT. While the content of your cart is currently displayed in BDT, the checkout will use BDT at the most current exchange rate.
                </p>
                <div className='flex justify-center p-4'>
                    <Button href='/checkout' type="primary" className='w-full's
                        onClick={handleCartCheckout}
                    >
                        Check Out</Button>
                </div>

            </div>
        </Drawer>
    );
};

export default CartDrawer;