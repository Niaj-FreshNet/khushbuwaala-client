import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ThankYouPage = () => {
    const axiosPublic = useAxiosPublic();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    // Extract orderId from query parameters
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get("orderId");

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                // Fetch order details with axiosPublic
                const response = await axiosPublic.get(`/api/orders/${orderId}`);
                console.log(response)
                
                setOrder(response.data); // Set the order data
            } catch (error) {
                message.error("An error occurred while fetching your order.");
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId, axiosPublic]);

    if (loading) return <div>Loading...</div>;
    if (error || !order) return <div>Failed to load order details. Please contact support.</div>;

    return (
        <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-8">
            <div className="bg-black mx-auto flex justify-center items-center py-2 mb-8">
                <h2 className="text-lg font-bold text-white text-center py-[2px] my-auto">Thank You!</h2>
            </div>

            <div className='max-w-screen-xl mx-auto px-4 lg:px-8'>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed</h3>
                <p className="text-gray-600 mb-6">Your order ID: {order._id}</p>

                <h4 className="text-md font-bold mb-2">Order Summary</h4>
                <div className="bg-white p-4 rounded-lg shadow">
                    {order.cartItems.map((product, index) => (
                        <div key={index} className="flex justify-between border-b py-2">
                            <div className="flex gap-4 items-center">
                                <img src={product.primaryImage} alt={product.name} className="w-16 h-20 rounded-md border" />
                                <div>
                                    <h5 className="text-gray-800 font-medium">{product.name}</h5>
                                    <p className="text-gray-500 text-xs">{product.size}</p>
                                    <p className="text-gray-500 text-xs">Qty: {product.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium text-gray-800">Tk {(product.price * product.quantity).toFixed(2)} BDT</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white mt-6 p-4 rounded-lg shadow">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>Tk {order.subtotal.toFixed(2)} BDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>Tk {order.shippingCost.toFixed(2)} BDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Estimated Taxes</span>
                        <span>Tk {order.estimatedTaxes.toFixed(2)} BDT</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span>Tk {order.total.toFixed(2)} BDT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
