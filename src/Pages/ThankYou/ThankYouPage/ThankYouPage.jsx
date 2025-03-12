import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { Button, Checkbox, Input, Radio, Form, message, Tag, Skeleton } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import useOrders from '../../../Hooks/useOrders';
import OrderReciept from '../../Dashboard/Orders/OrderReciept';

const ThankYouPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Toggle the accordion state for order summary
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    // Extract orderId from query parameters
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get("orderId");


    const [order, refetch, loading, error] = useOrders(orderId);

    if (loading) {
        return (
            <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-6">
                {/* Skeleton Header */}
                <div className="bg-black mx-auto flex justify-center items-center py-2 mb-8">
                    <Skeleton.Input active style={{ width: '60%' }} />
                </div>

                <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center my-8">
                        <Skeleton.Avatar active size="large" />
                        <Skeleton.Input active style={{ width: '40%' }} className="ml-3" />
                    </div>

                    <div className="text-center mb-8">
                        {/* <Skeleton.Input active style={{ width: '80%' }} /> */}
                        {/* <Skeleton.Input active style={{ width: '60%' }} className="mt-2" /> */}
                    </div>

                    <div className="border-t-2 border-b-2 py-6 my-8">
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="border text-sm p-4 rounded-lg bg-gray-50"
                                >
                                    <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 2 }} />
                                </div>
                            ))}
                    </div>

                    <div className="border text-sm p-4 rounded-lg bg-gray-50 mt-6">
                        <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 1 }} />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-6">
                {/* Skeleton Header */}
                <div className="bg-black mx-auto flex justify-center items-center py-2 mb-8">
                    <Skeleton.Input active style={{ width: '60%' }} />
                </div>

                <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center my-8">
                        <Skeleton.Avatar active size="large" />
                        <Skeleton.Input active style={{ width: '40%' }} className="ml-3" />
                    </div>

                    <div className="text-center mb-8">
                        {/* <Skeleton.Input active style={{ width: '80%' }} /> */}
                        {/* <Skeleton.Input active style={{ width: '60%' }} className="mt-2" /> */}
                    </div>

                    <div className="border-t-2 border-b-2 py-6 my-8">
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="border text-sm p-4 rounded-lg bg-gray-50"
                                >
                                    <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 2 }} />
                                </div>
                            ))}
                    </div>

                    <div className="border text-sm p-4 rounded-lg bg-gray-50 mt-6">
                        <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 1 }} />
                    </div>
                </div>
            </div>
        );
    }

    const { contactInfo, shippingAddress, billingAddress, cartItems, paymentMethod, subtotal, shippingCost, estimatedTaxes, total } = order;
    console.log(cartItems)

    // Show the receipt modal
    const showReceiptModal = (order) => {
        setSelectedOrder(order);
        setIsReceiptModalVisible(true);
    };

    const hideReceiptModal = () => {
        setIsReceiptModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-8">
            {/* Checkout Page Header */}
            <div className="bg-black mx-auto flex justify-center items-center py-0 mb-8">
                <h2 className="text-lg font-bold pt-2 text-white text-center py-[2px] my-auto">Alhamdulillah! Order Confirmed</h2>
            </div>
            <div>

                {/* Order Summary Details with Smooth Dropdown */}
                <div
                    className={`lg:hidden bg-white border-2 py-6 -mt-8 mb-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen overflow-y-auto' : 'max-h-0'}`}
                >
                    {/* Dropdown Header */}
                    <div
                        className="lg:hidden bg-gray-200 mx-auto flex justify-between items-center px-5 py-4 -mt-8 mb-8 cursor-pointer"
                        onClick={toggleAccordion}
                    >
                        <div className='flex items-center gap-2'>
                            <h2 className="text-xs text-black py-[2px] my-auto">Show order summary</h2>
                            {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                        </div>
                        <h2 className="text-xl font-bold text-black py-[2px] my-auto">Tk {total.toFixed(2)} BDT</h2>
                    </div>
                    <div className="p-4 mb-2">
                        {/* <h2 className='text-md font-bold'>Order Summary</h2> */}
                        <div className='mt-4'>
                            {/* Cart Products */}
                            <div>
                                {cartItems.map((product, index) => (
                                    <div key={index} className='flex flex-col border-b py-2 mb-2'>
                                        <div className='flex gap-4 items-start'>
                                            <div className='flex relative'>
                                                <img src={product.primaryImage} alt={product.name} className="w-16 h-20 bg-gray-100 p-1 rounded-md border" />
                                                {/* Quantity Badge */}
                                                <span className='absolute -top-2 -right-2 bg-gray-300 text-white text-xs rounded-full px-2 py-0.5'>
                                                    {product.quantity}
                                                </span>
                                            </div>

                                            {/* Product Details */}
                                            <div className='flex-1'>
                                                <h2 className='text-lg text-gray-800'>{product.name}</h2>
                                                <div className='flex gap-2'>
                                                    <p className='text-gray-500 text-sm'>{product.size}</p>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <span className="font-medium text-sm text-gray-800">
                                                Tk {(product.variantPrices[product.size] * product.quantity).toFixed(2)} BDT
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between text-sm mb-2 mt-6'>
                                <span>Subtotal</span>
                                <span>Tk {subtotal.toFixed(2)} BDT</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span>Shipping</span>
                                <span>Tk {shippingCost.toFixed(2)} BDT</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span>Estimated Taxes</span>
                                <span>Tk {estimatedTaxes.toFixed(2)} BDT</span>
                            </div>


                            <div className='flex justify-between text-lg font-bold'>
                                <span>Total</span>
                                <span>Tk {total.toFixed(2)} BDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-screen-xl mx-auto flex flex-wrap px-4 lg:px-8'>

                <div className='w-full lg:w-1/2 lg:pl-24'>


                    <div className="flex items-center justify-center my-8 text-green-600">
                        <div className='-mt-2'>
                            <CheckCircleOutlined style={{ fontSize: '36px' }} />
                        </div>
                        <h1 className="text-md font-bold ml-3">Thank you, {order.shippingAddress.name}!</h1>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-sm font-semibold">Your order is confirmed</p>
                        <p className='text-sm'>Your Order Number is: <span className='font-bold text-gray-600'>{order.orderId}</span></p>
                    </div>

                    <div className="border-t-2 border-b-2 py-6 my-8">
                        <div className='flex justify-between items-start -mt-2 mb-4'>
                            <h2 className="text-xl px-2 font-bold">Order details</h2>
                            <div>
                                <Button
                                    className='text-base bg-blue-800 text-white btn font-bold'
                                    onClick={() => showReceiptModal(order)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Invoice
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                            {/* Contact Information */}
                            <div className="border text-sm p-4 rounded-lg bg-gray-50">
                                <div className='flex flex-col'>
                                    <span className='text-md font-semibold mb-2'>Contact Information</span>
                                    <span className="block w-28 mb-3 border-b-2 border-red-500"></span>
                                </div>
                                <p>{order.contactInfo.email}</p>
                            </div>

                            {/* Payment Method */}
                            <div className="border text-sm p-4 rounded-lg bg-gray-50">
                                <div className='flex flex-col'>
                                    <span className='text-md font-semibold mb-2'>Payment Method</span>
                                    <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                                </div>
                                <p>{order.paymentMethod === 'cashOnDelivery' &&
                                    <p>Cash On Delivery</p>
                                }
                                    <p className='text-base'>৳{order.total.toFixed(2)} <span className="text-sm">({order.paymentStatus})</span></p>
                                </p>
                            </div>

                            {/* Shipping Address */}
                            <div className="border p-4 text-sm rounded-lg bg-gray-50">
                                <div className='flex flex-col space-y-1'>
                                    <div className='flex flex-col'>
                                        <span className='text-md font-semibold mb-2'>Shipping Address</span>
                                        <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                                    </div>
                                    <p className="font-light">{shippingAddress.name}</p>
                                    <p className="font-light">{shippingAddress.address}</p>
                                    <p className="font-light">{shippingAddress.contactNumber}</p>
                                    <p className="font-light">District: {shippingAddress.district}</p>
                                    <p className="font-light">Thana: {shippingAddress.thana}</p>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="border text-sm p-4 rounded-lg bg-gray-50">
                                <div className='flex-1 flex-col space-y-1'>
                                    <div className='flex flex-col'>
                                        <span className='text-md font-semibold mb-2'>Billing Address</span>
                                        <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                                    </div>
                                    <p className="font-light">{billingAddress.name}</p>
                                    <p className="font-light">{billingAddress.address}</p>
                                    <p className="font-light">{billingAddress.contactNumber}</p>
                                    <p className="font-light">District: {billingAddress.district}</p>
                                    <p className="font-light">Thana: {billingAddress.thana}</p>
                                    {/* <p className="font-light">{contactInfo.email}</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Shipping Method */}
                        <div className="border text-sm p-4 rounded-lg bg-gray-50 mt-6">
                            <div className='flex flex-col'>
                                <span className='text-md font-semibold mb-2'>Shipping method</span>
                                <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                            </div>
                            <p>{order.shippingMethod === 'insideDhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}</p>
                        </div>
                    </div>




                    <div className="lg:hidden p-4 mb-2 ">
                        <h2 className='text-md font-bold'>Order Summary</h2>
                        <div className='mt-4'>
                            {/* Cart Products */}
                            <div>
                                {cartItems.map((product, index) => (
                                    <div key={index} className='flex flex-col border-b py-2 mb-2'>
                                        <div className='flex gap-4 items-start'>
                                            <div className='flex relative'>
                                                <img src={product.primaryImage} alt={product.name} className="w-16 h-20 bg-gray-100 p-1 rounded-md border" />
                                                {/* Quantity Badge */}
                                                <span className='absolute -top-2 -right-2 bg-gray-300 text-white text-xs rounded-full px-2 py-0.5'>
                                                    {product.quantity}
                                                </span>
                                            </div>

                                            {/* Product Details */}
                                            <div className='flex-1'>
                                                <h2 className='text-md text-gray-800'>{product.name}</h2>
                                                <div className='flex gap-2'>
                                                    <p className='text-gray-500 text-xs'>{product.size}</p>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <span className="font-medium text-sm text-gray-800">
                                                Tk {(product.variantPrices[product.size] * product.quantity).toFixed(2)} BDT
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between text-sm mb-2 mt-6'>
                                <span>Subtotal</span>
                                <span>Tk {subtotal.toFixed(2)} BDT</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span>Shipping</span>
                                <span>Tk {shippingCost.toFixed(2)} BDT</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span>Estimated Taxes</span>
                                <span>Tk {estimatedTaxes.toFixed(2)} BDT</span>
                            </div>


                            <div className='flex justify-between text-lg font-bold'>
                                <span>Total</span>
                                <span>Tk {total.toFixed(2)} BDT</span>
                            </div>
                        </div>
                    </div>

                    {/* Continue Button */}
                    <Button href='/shop' type="primary" size="medium" className="flex justify-center text-md font-bold rounded-md bg-black text-white h-[60px]">
                        Continue Shopping
                    </Button>
                </div>

                {/* Right Side: Order Summary */}
                <div className='hidden lg:block lg:w-1/2 lg:pl-32 lg:px-4 lg:mt-0'>
                    <div className='sticky lg:top-20'>
                        <div className='bg-white p-8 mb-8 rounded-lg'>
                            <h2 className='text-md font-bold'>Order Summary</h2>
                            <div className='mt-4'>
                                {/* Cart Products */}
                                <div>
                                    {cartItems.map((product, index) => (
                                        <div key={index} className='flex flex-col border-b py-2 mb-2'>
                                            <div className='flex gap-4 items-start'>
                                                <div className='flex relative'>
                                                    <img src={product.primaryImage} alt={product.name} className="w-16 h-20 bg-gray-100 p-1 rounded-md border" />
                                                    {/* Quantity Badge */}
                                                    <span className='absolute -top-2 -right-2 bg-gray-300 text-white text-xs rounded-full px-2 py-0.5'>
                                                        {product.quantity}
                                                    </span>
                                                </div>

                                                {/* Product Details */}
                                                <div className='flex-1'>
                                                    <h2 className='text-lg text-gray-800'>{product.name}</h2>

                                                    <div className='flex gap-2'>
                                                        {/* <p className='text-gray-500 text-sm'>{product.color}</p>
                                                        <p className='text-gray-500 text-sm'>/</p> */}
                                                        <p className='text-gray-500 text-sm'>{product.size}</p>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <span className="font-medium text-sm text-gray-800">
                                                    Tk {(product.variantPrices[product.size] * product.quantity).toFixed(2)} BDT
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-between text-sm mb-2 mt-6'>
                                    <span>Subtotal</span>
                                    <span>Tk {subtotal.toFixed(2)} BDT</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Shipping</span>
                                    <span>Tk {shippingCost.toFixed(2)} BDT</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Estimated Taxes</span>
                                    <span>Tk {estimatedTaxes.toFixed(2)} BDT</span>
                                </div>


                                <div className='flex justify-between text-lg font-bold'>
                                    <span>Total</span>
                                    <span>Tk {total.toFixed(2)} BDT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isReceiptModalVisible && (
                <OrderReciept
                    visible={isReceiptModalVisible}
                    onClose={hideReceiptModal}
                    order={selectedOrder} // Pass selected order to receipt modal
                />
            )}
        </div >
    );
};

export default ThankYouPage;
