import React, { useContext } from "react";
import { Button, Input, Row, Col } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'; // Import icons
import paymentMethod from '../../../assets/paymentMethod.png';
import { CartContext } from '../../../Cart/CartContext';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, calculateSubtotal } = useContext(CartContext);

    const handleQuantityChange = (id, size, increment) => {
        const item = cartItems.find((item) => item.id === id && item.size === size);
        if (item) {
            const newQuantity = Math.max(item.quantity + increment, 1);
            updateQuantity(id, size, newQuantity);
        }
    };

    return (
        <div className="max-w-screen-2xl mx-auto bg-white mt-9 lg:mt-8 py-8">
            {/* Shopping Cart Page Header */}
            <div className="bg-black flex justify-center items-center py-2 mb-8">
                <h2 className="text-lg font-bold text-white text-center">Shopping Cart</h2>
            </div>

            <div className="max-w-screen-lg mx-auto p-3">
                {cartItems.length > 0 ? (
                    <>
                        {/* Mobile Cart Section */}
                        <div className="block md:hidden space-y-6">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex gap-4">
                                        <img src={item.primaryImage} alt={item.name} className="w-20 h-22 rounded-lg border" />
                                        <div className="flex-1 ">
                                            <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                                            <p className="text-gray-500 text-sm">Size: {item.size}</p>
                                            <p className="mt-2 text-gray-800 text-sm font-medium">
                                                Tk {item.price.toFixed(2)} BDT
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                icon={<DeleteOutlined />}
                                                type="link"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFromCart(item.id, item.size)}
                                            />
                                            <Button
                                                size="small"
                                                shape="circle"
                                                onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                                disabled={item.quantity === 1}
                                            >
                                                −
                                            </Button>
                                            <span className="font-medium text-sm">{item.quantity}</span>
                                            <Button
                                                size="small"
                                                shape="circle"
                                                onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <span className="text-gray-600 text-md font-semibold">
                                            Tk {(item.price * item.quantity).toFixed(2)} BDT
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Cart Section */}
                        <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
                            <Row className="bg-gray-100 text-gray-600 font-semibold py-4 px-6 border-b">
                                <Col span={10}>Product</Col>
                                <Col span={4}>Price</Col>
                                <Col span={6}>Quantity</Col>
                                <Col span={4}>Total</Col>
                            </Row>
                            {cartItems.map((item) => (
                                <Row key={`${item.id}-${item.size}`} gutter={[16, 16]} className="py-6 px-6 border-b">
                                    <Col span={10} className="flex items-center gap-4">
                                        <img src={item.primaryImage} alt={item.name} className="w-24 h-26 rounded-lg border shadow-sm" />
                                        <div>
                                            <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                                            <p className="text-gray-500">Color: {item.color}</p>
                                            <p className="text-gray-500">Size: {item.size}</p>
                                        </div>
                                    </Col>
                                    <Col span={4} className="text-gray-800 items-center flex text-md font-medium">
                                        Tk {item.price.toFixed(2)} BDT
                                    </Col>
                                    <Col span={6} className="flex items-center gap-3">
                                        <Button
                                            icon={<DeleteOutlined />}
                                            type="link"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removeFromCart(item.id, item.size)}
                                        />
                                        <Button
                                            size="small"
                                            shape="circle"
                                            onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                            disabled={item.quantity === 1}
                                        >
                                            −
                                        </Button>
                                        <span className="font-semibold">{item.quantity}</span>
                                        <Button
                                            size="small"
                                            shape="circle"
                                            onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                        >
                                            +
                                        </Button>
                                    </Col>
                                    <Col span={4} className="text-gray-800 items-center flex text-md font-semibold">
                                        Tk {(item.price * item.quantity).toFixed(2)} BDT
                                    </Col>
                                </Row>
                            ))}
                        </div>

                        {/* Additional Sections */}
                        <div className="flex flex-col md:flex-row justify-between mt-8 gap-6">
                            {/* Notes & Coupon Section */}
                            <div className="w-full md:w-2/3 space-y-4">
                                <Input.TextArea placeholder="How can we help you?" rows={4} className="shadow-none focus:border-gray-400 transition text-gray-700" />
                                <div className="flex items-center">
                                    <Input placeholder="Coupon code" className="w-full shadow-none focus:border-gray-400 transition" />
                                    <Button type="primary" size="medium" className="ml-3 bg-red-600 hover:bg-red-500 border-none">
                                        Apply
                                    </Button>
                                </div>
                                <div className="px-6 py-4">
                                    <img src={paymentMethod} alt="paymentMethod" />
                                </div>
                            </div>

                            {/* Summary & Checkout */}
                            <div className="w-full md:w-2/5 p-6 border rounded-lg bg-gray-50 shadow-md">
                                <div className="flex justify-between mb-4 text-xl text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">Tk {calculateSubtotal().toFixed(2)} BDT</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-2">Taxes and shipping calculated at checkout.</p>
                                <p className="text-xs text-gray-400 mb-4">All charges are billed in BDT. While the content of your cart is currently displayed in BDT, the checkout will use BDT at the most current exchange rate.</p>
                                <Button type="primary" size="large" className="w-full bg-red-600 hover:bg-red-500 border-none py-3 font-semibold"
                                    onClick={() => window.location.href = '/checkout'}>
                                    Check Out
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    // Empty Cart Section
                    <div className="flex flex-col items-center justify-center my-24">
                        <ShoppingCartOutlined style={{ fontSize: '64px', color: '#999' }} />
                        <h2 className="text-2xl font-bold text-gray-600 mt-4">YOUR CART IS EMPTY.</h2>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Before proceeding to checkout, you must add some products to your shopping cart.<br />
                            You will find a lot of interesting products on our "Shop" page.
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
        </div>
    );
};

export default CartPage;
