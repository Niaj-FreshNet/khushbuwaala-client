// import React, { useContext, useState } from 'react';
// import { Button, Checkbox, Input, Radio, Form, message } from 'antd';
// import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
// import { CartContext } from '../../../Cart/CartContext';
// import { useNavigate } from 'react-router-dom';

// const CheckOutPage = () => {
//     const { cartItems, calculateSubtotal } = useContext(CartContext);
//     const [shippingMethod, setShippingMethod] = useState('insideDhaka');
//     const [paymentMethod, setPaymentMethod] = useState(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const navigate = useNavigate();

//     // Shipping cost calculation based on shipping method
//     const shippingCost = shippingMethod === 'outsideDhaka' ? 50 : 0;
//     const subtotal = calculateSubtotal();
//     const estimatedTaxes = subtotal * 0.075; // Assuming 7.5% tax
//     const total = subtotal + estimatedTaxes + shippingCost;

//     // Toggle accordion for mobile order summary
//     const toggleAccordion = () => {
//         setIsOpen(!isOpen);
//     };

//     // Handle complete order with validation
//     const handleCompleteOrder = async (values) => {
//         if (!paymentMethod) {
//             message.error("Please select a payment method.");
//             return;
//         }

//         const orderDetails = {
//             cartItems,
//             subtotal,
//             shippingCost,
//             estimatedTaxes,
//             total,
//             paymentMethod,
//             shippingMethod,
//             ...values,
//         };

//         try {
//             const response = await fetch('/api/orders', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(orderDetails),
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 navigate(`/thank-you?orderId=${data.orderId}`);
//             } else {
//                 message.error("Failed to complete the order. Please try again.");
//             }
//         } catch (error) {
//             message.error("Error processing your order. Please try again.");
//         }
//     };

//     const onFinishFailed = (errorInfo) => {
//         message.error("Please complete all required fields before submitting.");
//     };

//     return (
//         <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-8">
//             {/* Checkout Page Header */}
//             <div className="bg-black mx-auto flex justify-center items-center py-2 mb-8">
//                 <h2 className="text-lg font-bold text-white text-center py-[2px] my-auto">Checkout</h2>
//             </div>
//             <div>
//                 {/* Order Summary Details with Smooth Dropdown */}
//                 <div
//                     className={`lg:hidden bg-white border-2 py-6 -mt-8 mb-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen overflow-y-auto' : 'max-h-0'}`}
//                 >
//                     <div
//                         className="lg:hidden bg-gray-200 mx-auto flex justify-between items-center px-5 py-4 -mt-8 mb-8 cursor-pointer"
//                         onClick={toggleAccordion}
//                     >
//                         <div className='flex items-center gap-2'>
//                             <h2 className="text-xs text-black py-[2px] my-auto">Show order summary</h2>
//                             {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
//                         </div>
//                         <h2 className="text-xl font-bold text-black py-[2px] my-auto">Tk {total.toFixed(2)} BDT</h2>
//                     </div>
//                     <div className="p-4 mb-2">
//                         {/* Order Summary Content */}
//                         {/* (Order Summary as in your original layout) */}
//                     </div>
//                 </div>
//             </div>

//             <div className='max-w-screen-xl mx-auto flex flex-wrap px-4 lg:px-8'>
//                 {/* Left Side: Checkout Form */}
//                 <div className='w-full lg:w-1/2 lg:pl-24'>
//                     <Form
//                         layout="vertical"
//                         onFinish={handleCompleteOrder}
//                         onFinishFailed={onFinishFailed}
//                     >
//                         {/* Contact Section */}
//                         <div className="mb-6">
//                             <h2 className="text-md font-bold mb-4">Contact</h2>
//                             <Form.Item
//                                 name="email"
//                                 rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Enter a valid email address' }]}
//                             >
//                                 <Input placeholder="Email" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                             </Form.Item>
//                             <Form.Item name="newsletter" valuePropName="checked">
//                                 <Checkbox>Email me with news and offers</Checkbox>
//                             </Form.Item>
//                         </div>

//                         {/* Shipping Method Section */}
//                         <div className="mb-6">
//                             <h2 className="text-md font-bold mb-4">Shipping Method</h2>
//                             <Radio.Group onChange={(e) => setShippingMethod(e.target.value)} value={shippingMethod} className="flex flex-col mb-4">
//                                 <Radio value="insideDhaka" className='border-2 p-[10px] text-black bg-white rounded-t-md'>Inside Dhaka - Free</Radio>
//                                 <Radio value="outsideDhaka" className='border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md'>Outside Dhaka - 50 TK</Radio>
//                             </Radio.Group>
//                         </div>

//                         {/* Delivery Address Section */}
//                         <div className="mb-6">
//                             <h2 className="text-md font-bold mb-4">Delivery Address</h2>
//                             <div className='flex justify-between gap-4'>
//                                 <Form.Item name="firstName" rules={[{ required: true, message: 'First name is required' }]} className='w-1/2'>
//                                     <Input placeholder="First Name" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                                 </Form.Item>
//                                 <Form.Item name="lastName" rules={[{ required: true, message: 'Last name is required' }]} className='w-1/2'>
//                                     <Input placeholder="Last Name" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                                 </Form.Item>
//                             </div>
//                             <Form.Item name="address" rules={[{ required: true, message: 'Address is required' }]}>
//                                 <Input placeholder="Address" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                             </Form.Item>
//                             <div className='flex justify-between gap-4'>
//                                 <Form.Item name="city" rules={[{ required: true, message: 'City is required' }]} className='w-1/2'>
//                                     <Input placeholder="City" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                                 </Form.Item>
//                                 <Form.Item name="postalCode" className='w-1/2'>
//                                     <Input placeholder="Postal Code (optional)" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                                 </Form.Item>
//                             </div>
//                             <Form.Item name="phone" rules={[{ required: true, message: 'Phone number is required' }]}>
//                                 <Input placeholder="Phone" className='placeholder-gray-600 px-4 py-[10px] bg-white' />
//                             </Form.Item>
//                         </div>

//                         {/* Payment Section */}
//                         <div className="mb-6">
//                             <h2 className="text-md font-bold mb-2">Payment</h2>
//                             <p className="text-xs text-gray-500 mb-4">All transactions are secure and encrypted.</p>
//                             <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} className="flex flex-col mb-4">
//                                 <div className="border-2 p-[10px] text-black bg-white rounded-t-md">
//                                     <Radio disabled value="sslCommerz">
//                                         SSLCOMMERZ
//                                     </Radio>
//                                 </div>
//                                 <div className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md">
//                                     <Radio value="cashOnDelivery">Cash on Delivery (COD)</Radio>
//                                 </div>
//                             </Radio.Group>
//                         </div>

//                         {/* Complete Order Button */}
//                         <Form.Item>
//                             <Button
//                                 type="primary"
//                                 size="large"
//                                 className="w-full text-xl font-bold rounded-md bg-black text-white h-[60px]"
//                                 htmlType="submit"
//                             >
//                                 Complete Order
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </div>

//                 {/* Right Side: Order Summary (as before) */}
//                 <div className='hidden lg:block lg:w-1/2 lg:pl-32 lg:px-4 lg:mt-0'>
//                     <div className='sticky lg:top-20'>
//                         <div className='bg-white p-8 mb-8 rounded-lg'>
//                             <h2 className='text-md font-bold'>Order Summary</h2>
//                             <div className='mt-4'>
//                                 {/* Cart Products */}
//                                 {/* Render cart items and totals as in the previous structure */}
//                                 <div className='flex justify-between text-lg font-bold'>
//                                     <span>Total</span>
//                                     <span>Tk {total.toFixed(2)} BDT</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckOutPage;


// <div className='flex justify-between gap-4'>
//                                         <Form.Item name="firstName" className='w-1/2'>
//                                             <Input placeholder="First Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
//                                         </Form.Item>
//                                         <Form.Item name="lastName" className='w-1/2'>
//                                             <Input placeholder="Last Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
//                                         </Form.Item>
//                                     </div>
//                                     <Form.Item name="Address">
//                                         <Input placeholder="Address" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
//                                     </Form.Item>
//                                     <div className='flex justify-between gap-4'>
//                                         <Form.Item name="city" className='w-1/2'>
//                                             <Input placeholder="City" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
//                                         </Form.Item>
//                                         <Form.Item name="postalCode" className='w-1/2'>
//                                             <Input placeholder="Postal Code (optional)" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
//                                         </Form.Item>
//                                     </div>