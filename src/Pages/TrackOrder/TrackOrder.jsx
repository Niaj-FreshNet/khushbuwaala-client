import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col, Spin, Alert, Tag } from "antd";
import useOrders from "../../Hooks/useOrders";
import OrderReciept from "../Dashboard/Orders/OrderReciept";
import Search from "antd/es/transfer/search";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [orders, refetch] = useOrders();

    const handleSearch = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const order = orders.find(order => order.orderId.toLowerCase() === orderId.toLowerCase());
            if (order) {
                setOrder(order);
            } else {
                setOrder(null);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Show the receipt modal
    const showReceiptModal = (order) => {
        setSelectedOrder(order);
        setIsReceiptModalVisible(true);
    };

    const hideReceiptModal = () => {
        setIsReceiptModalVisible(false);
        setSelectedOrder(null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const formattedDate = moment(order?.orderPlacedAt).format("DD MMMM YYYY"); // e.g., 2023-10-31
    const formattedTime = moment(order?.orderPlacedAt).format("hh:mm a"); // e.g., 03:45:12.123 PM

    const timeAgo = moment(order?.orderPlacedAt).fromNow(); // e.g., "3 hours ago"

    return (
        <div className="max-w-screen-2xl mx-auto bg-white mt-9 lg:mt-8 py-8">
            <Helmet>
                <title>Track Your Order | Order Tracking</title>
                <meta
                    name="description"
                    content="Track your order status and view detailed information about your recent purchases."
                />
                <meta name="keywords" content="Order Tracking, Track Order, Order Status" />
                <meta name="author" content="KhushbuWaala" />
            </Helmet>

            {/* Track Order Page Header */}
            <div className="bg-black flex justify-center items-center py-0 mb-8">
                <h2 className="text-lg pt-2 font-bold text-white text-center">Track Order</h2>
            </div>

            <div className="max-w-screen-md mx-auto justify-center p-3 lg:px-4 pb-8">
                <div className="mx-auto w-full flex flex-col items-center">
                    <label htmlFor="orderId" className="text-xl font-semibold mb-4">
                        Search with your order ID:
                    </label>
                    <div className="w-full flex justify-center gap-0 p-4 mx-auto">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <Input
                                id="orderId"
                                placeholder="Enter your order ID"
                                className="rounded h-14 text-lg"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                onKeyDown={handleKeyDown}
                                allowClear
                                size="large" // Uniform height for input
                            />
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/5">
                            <Button
                                className="rounded h-14 text-lg"
                                type="primary"
                                onClick={handleSearch}
                                loading={isLoading}
                                block
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {isLoading && <Spin className="my-4" />}

                {order === null && !isLoading && !isError && (
                    <div className="mt-8 mb-16 p-6 bg-blue-100 border border-blue-500 rounded-lg text-center">
                        <h3 className="text-lg font-bold text-blue-700">Oops! We couldn't find your order.</h3>
                        <p className="text-sm text-blue-600 mt-4">
                            Don't worry! It's possible that you entered the wrong order ID, or it may take a moment to update. Please double-check the ID or try again later.
                        </p>
                        <div className="mt-6">
                            <Button type="primary" onClick={handleSearch} size="large" className="font-semibold">
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}

                {order === null && isLoading && (
                    <div className="mt-8 mb-16 p-6 bg-gray-200 border border-gray-400 rounded-lg text-center">
                        <Spin size="large" />
                        <p className="mt-4 text-sm">We are still looking for your order... Please hang tight!</p>
                    </div>
                )}

                {order && !isError && !isLoading && (
                    <div className="border-t-2 border-b-2 py-8 my-8">
                        <div className='flex justify-between items-start -mt-2 mb-4'>
                            <h2 className="text-lg px-2 font-bold">Order details</h2>
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
                            {/* Order Status */}
                            <div className="border text-sm p-4 rounded-lg bg-gray-50">
                                <div className='flex-1 flex-col space-y-1'>
                                    <div className='flex flex-col'>
                                        <span className='text-md font-semibold mb-2'>Order Status</span>
                                        <span className="block w-20 mb-3 border-b-2 border-red-500"></span>
                                    </div>
                                    <p><strong>Order ID:</strong> {order.orderId}</p>
                                    <p><strong>Order Placed At:</strong> {formattedDate}, {formattedTime} <br /> <span className="text-xs">({timeAgo})</span></p>
                                    <p><strong>Status:</strong> <Tag color="blue" className="text-sm font-semibold">{order.orderStatus}</Tag></p>
                                </div>
                            </div>

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

                            {/* Shipping Method */}
                            <div className="border text-sm p-4 rounded-lg bg-gray-50">
                                <div className='flex-1 flex-col space-y-1'>
                                    <div className='flex flex-col'>
                                        <span className='text-md font-semibold mb-2'>Shipping method</span>
                                        <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                                    </div>
                                    <p>{order.shippingMethod === 'insideDhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}</p>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="border p-4 text-sm rounded-lg bg-gray-50">
                                <div className='flex flex-col space-y-1'>
                                    <div className='flex flex-col'>
                                        <span className='text-md font-semibold mb-2'>Shipping Address</span>
                                        <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                                    </div>
                                    <p className="font-light">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                    <p className="font-light">{order.shippingAddress.address}</p>
                                    <p className="font-light">{order.shippingAddress.phone}</p>
                                    <p className="font-light">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="border text-sm p-4 rounded-lg bg-gray-50">
                                <div className='flex-1 flex-col space-y-1'>
                                    <div className='flex flex-col'>
                                        <span className='text-md font-semibold mb-2'>Billing Address</span>
                                        <span className="block w-24 mb-3 border-b-2 border-red-500"></span>
                                    </div>
                                    <p className="font-light">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                                    <p className="font-light">{order.billingAddress.address}</p>
                                    <p className="font-light">{order.billingAddress.city}, {order.billingAddress.postalCode}</p>
                                    <p className="font-light">{order.billingAddress.phone}</p>
                                    <p className="font-light">{order.contactInfo.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isError && !isLoading && (
                    <Alert message="Error fetching order details. Please try again later." type="error" showIcon className="my-4" />
                )}
            </div>

            {isReceiptModalVisible && (
                <OrderReciept
                    visible={isReceiptModalVisible}
                    onClose={hideReceiptModal}
                    order={selectedOrder} // Pass selected order to receipt modal
                />
            )}
        </div>
    );
};

export default TrackOrder;