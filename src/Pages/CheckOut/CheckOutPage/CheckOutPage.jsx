import React, { useContext, useState } from 'react';
import { Button, Checkbox, Input, Radio, Form, message } from 'antd';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { CartContext } from '../../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const CheckOutPage = () => {
    const axiosPublic = useAxiosPublic();
    const { cartItems, calculateSubtotal, checkoutMode, checkoutItem, proceedToCartCheckout } = useContext(CartContext);
    const [shippingMethod, setShippingMethod] = useState('insideDhaka');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingType, setBillingType] = useState('sameAsShipping'); // Updated variable name
    const [isOpen, setIsOpen] = useState(false);

    // Determine which items to display on checkout
    const itemsToDisplay = checkoutMode && checkoutItem ? [checkoutItem] : cartItems;

    // Shipping cost calculation based on shipping method
    const shippingCost = shippingMethod === 'outsideDhaka' ? 50 : 0;
    const subtotal = calculateSubtotal();
    const estimatedTaxes = subtotal * 0.075; // Assuming 7.5% tax
    const total = subtotal + estimatedTaxes + shippingCost;
    const navigate = useNavigate();

    const handlePaymentChange = e => {
        setPaymentMethod(e.target.value);
    };

    const handleShippingChange = (e) => {
        setShippingMethod(e.target.value);
    };

    const handleBillingChange = e => {
        setBillingType(e.target.value); // Update state with selected billing type
    };

    const handleCompleteOrder = async (values) => {
        if (!paymentMethod) {
            message.error("Please select a payment method.");
            return;
        }

        const { email, firstName, lastName, address, city, postalCode, phone, billingFirstName, billingLastName, billingAddress, billingCity, billingPostalCode, billingPhone } = values;

        const orderDetails = {
            cartItems: itemsToDisplay,
            subtotal,
            shippingCost,
            estimatedTaxes,
            total,
            paymentMethod,
            shippingMethod,
            postStatus: 'Pending',
            paymentStatus: 'Due',
            contactInfo: {
                email,
            },
            shippingAddress: {
                firstName,
                lastName,
                address,
                city,
                postalCode,
                phone,
            },
            billingAddress: billingType === 'sameAsShipping' ?
                { firstName, lastName, address, city, postalCode, phone } :  // Copy shipping info
                {
                    firstName: billingFirstName,
                    lastName: billingLastName,
                    address: billingAddress,
                    city: billingCity,
                    postalCode: billingPostalCode,
                    phone: billingPhone,
                }
        };

        try {
            const response = await axiosPublic.post('/api/orders', orderDetails);
            if (response.status === 201 && response.data.orderId) {
                navigate(`/thank-you?orderId=${response.data.orderId}`);
            } else {
                message.error("Failed to complete the order. Please try again.");
            }
        } catch (error) {
            console.error("Error processing order:", error);
            message.error("Error processing your order. Please try again.");
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Please complete all required fields before submitting.");
    };

    // Toggle the accordion state for order summary
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-8">
            {/* Checkout Page Header */}
            <div className="bg-black mx-auto flex justify-center items-center py-2 mb-8">
                <h2 className="text-lg font-bold text-white text-center py-[2px] my-auto">Checkout</h2>
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
                                {itemsToDisplay.map((product, index) => (
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
                                                Tk {(product.price * product.quantity).toFixed(2)} BDT
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
                            <div className='mt-4'>
                                <Form layout="vertical" className='mt-2'>
                                    <div className='flex items-center w-full'>
                                        <Form.Item className='flex-grow'>
                                            <Input placeholder="Enter discount code" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4 w-full' />
                                        </Form.Item>
                                        <Form.Item className='ml-2'>
                                            <Button type="default" className='text-md font-bold rounded-md bg-black text-white h-[44px]'>
                                                Apply
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
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
                {/* Left Side: Checkout Form */}
                <div className='w-full lg:w-1/2 lg:pl-24'>
                    <Form
                        layout="vertical"
                        onFinish={handleCompleteOrder}
                        onFinishFailed={onFinishFailed}
                    >
                        {/* Contact Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-4">Contact</h2>
                            <Form.Item
                                name="email"
                                rules={[{ required: false, message: 'Please enter your email' }, { type: 'email', message: 'Enter a valid email address' }]}
                            >
                                <Input placeholder="Email" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
                            </Form.Item>
                            <Form.Item name="newsletter" valuePropName="checked" className='-mt-4'>
                                <Checkbox>Email me with news and offers</Checkbox>
                            </Form.Item>
                        </div>

                        {/* Shipping Method Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-4">Shipping Method</h2>
                            <Radio.Group onChange={handleShippingChange} value={shippingMethod} className="flex flex-col mb-4">
                                <Radio value="insideDhaka" className='border-2 p-[10px] text-black bg-white rounded-t-md'>Inside Dhaka - Free</Radio>
                                <Radio value="outsideDhaka" className='border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md'>Outside Dhaka - 50 TK</Radio>
                            </Radio.Group>
                        </div>

                        {/* Shipping Method Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-4">Delivery Address</h2>
                            <div className='flex justify-between gap-4'>
                                <Form.Item name="firstName" rules={[{ required: true, message: '' }]} className='w-1/2'>
                                    <Input placeholder="First Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                </Form.Item>
                                <Form.Item name="lastName" rules={[{ required: false, message: '' }]} className='w-1/2'>
                                    <Input placeholder="Last Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                </Form.Item>
                            </div>
                            <Form.Item name="address" rules={[{ required: true, message: '' }]}>
                                <Input placeholder="Address" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                            </Form.Item>
                            <div className='flex justify-between gap-4'>
                                <Form.Item name="city" rules={[{ required: true, message: '' }]} className='w-1/2'>
                                    <Input placeholder="City" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                </Form.Item>
                                <Form.Item name="postalCode" className='w-1/2'>
                                    <Input placeholder="Postal Code (optional)" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                </Form.Item>
                            </div>
                            <Form.Item name="phone" rules={[{ required: true, message: '' }]}>
                                <Input placeholder="Phone" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>Save this information for next time</Checkbox>
                            </Form.Item>
                        </div>

                        {/* Payment Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-2">Payment</h2>
                            <p className="text-xs text-gray-500 mb-4">All transactions are secure and encrypted.</p>
                            <Radio.Group onChange={handlePaymentChange} value={paymentMethod} className="flex flex-col mb-4">
                                <div className="border-2 p-[10px] text-black bg-white rounded-t-md">
                                    <Radio disabled value="sslCommerz">
                                        SSLCOMMERZ
                                    </Radio>
                                    {paymentMethod === 'sslCommerz' && (
                                        <p className='text-xs text-pretty p-2'>
                                            After clicking “Pay now”, you will be redirected to SSLCOMMERZ to complete your purchase securely.
                                        </p>
                                    )}
                                </div>
                                <div className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md">
                                    <Radio value="cashOnDelivery">
                                        Cash on Delivery (COD)
                                    </Radio>
                                    {paymentMethod === 'cashOnDelivery' && (
                                        <p className='text-xs text-pretty p-2'>
                                            Free shipping for items over 1,000 Taka. Shipping charge applied for items below 1,000 Taka.
                                        </p>
                                    )}
                                </div>
                            </Radio.Group>
                        </div>

                        {/* Billing Address Section */}
                        <div className="mb-8">
                            <h2 className="text-md font-bold mb-4">Billing Address</h2>
                            <Radio.Group onChange={handleBillingChange} value={billingType} className="flex flex-col mb-4">
                                <div className="border-2 p-[10px] text-black bg-white rounded-t-md">
                                    <Radio value="sameAsShipping">
                                        Same as shipping address
                                    </Radio>
                                </div>
                                <div className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md">
                                    <Radio value="differentBillingAddress">
                                        Use a different billing address
                                    </Radio>
                                </div>
                            </Radio.Group>

                            {billingType === 'differentBillingAddress' && (
                                <Form layout="vertical" className=''>
                                    <div className='flex justify-between gap-4'>
                                        <Form.Item name="firstName" rules={[{ required: true, message: 'First name is required' }]} className='w-1/2'>
                                            <Input placeholder="First Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                        <Form.Item name="lastName" rules={[{ required: true, message: 'Last name is required' }]} className='w-1/2'>
                                            <Input placeholder="Last Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                    </div>
                                    <Form.Item name="address" rules={[{ required: true, message: 'Address is required' }]}>
                                        <Input placeholder="Address" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                    </Form.Item>
                                    <div className='flex justify-between gap-4'>
                                        <Form.Item name="city" rules={[{ required: true, message: 'City is required' }]} className='w-1/2'>
                                            <Input placeholder="City" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                        <Form.Item name="postalCode" className='w-1/2'>
                                            <Input placeholder="Postal Code (optional)" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                    </div>
                                    <Form.Item name="phone" rules={[{ required: true, message: 'Phone number is required' }]}>
                                        <Input placeholder="Phone" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                    </Form.Item>
                                </Form>
                            )}
                        </div>


                        <div className="lg:hidden p-4 mb-2 ">
                            <h2 className='text-md font-bold'>Order Summary</h2>
                            <div className='mt-4'>
                                {/* Cart Products */}
                                <div>
                                    {itemsToDisplay.map((product, index) => (
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
                                                    Tk {(product.price * product.quantity).toFixed(2)} BDT
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
                                <div className='mt-4'>
                                    <Form layout="vertical" className='mt-2'>
                                        <div className='flex items-center w-full'>
                                            <Form.Item className='flex-grow'>
                                                <Input placeholder="Enter discount code" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4 w-full' />
                                            </Form.Item>
                                            <Form.Item className='ml-2'>
                                                <Button type="default" className='text-md font-bold rounded-md bg-black text-white h-[44px]'>
                                                    Apply
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                                <div className='flex justify-between text-lg font-bold'>
                                    <span>Total</span>
                                    <span>Tk {total.toFixed(2)} BDT</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                className="w-full text-xl font-bold rounded-md bg-black text-white h-[60px]"
                                htmlType="submit"
                            >
                                Complete Order
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Right Side: Order Summary */}
                <div className='hidden lg:block lg:w-1/2 lg:pl-32 lg:px-4 lg:mt-0'>
                    <div className='sticky lg:top-20'>
                        <div className='bg-white p-8 mb-8 rounded-lg'>
                            <h2 className='text-md font-bold'>Order Summary</h2>
                            <div className='mt-4'>
                                {/* Cart Products */}
                                <div>
                                    {itemsToDisplay.map((product, index) => (
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
                                                    Tk {(product.price * product.quantity).toFixed(2)} BDT
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
                                <div className='mt-4'>
                                    <Form layout="vertical" className='mt-2'>
                                        <div className='flex items-center w-full'>
                                            <Form.Item className='flex-grow'>
                                                <Input placeholder="Enter discount code" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4 w-full' />
                                            </Form.Item>
                                            <Form.Item className='ml-2'>
                                                <Button type="default" className='text-md font-bold rounded-md bg-black text-white h-[44px]'>
                                                    Apply
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                                <div className='flex justify-between text-lg font-bold'>
                                    <span>Total</span>
                                    <span>Tk {total.toFixed(2)} BDT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CheckOutPage;
