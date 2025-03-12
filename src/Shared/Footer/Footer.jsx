import React, { useState } from 'react';
import { HomeOutlined, MailOutlined, PhoneOutlined, ContactsOutlined } from '@ant-design/icons';
import SocialIcons from '../../Components/SocialIcons/SocialIcons';

const Footer = () => {
    const [isOpen, setIsOpen] = useState({
        companyInfo: false,
        quickLinks: false,
        policies: false,
        account: false,
    });

    const toggleSection = (section) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <>
            <footer className="max-w-screen-2xl bg-gray-100 pt-16 pb-8 px-8">
                <div className="max-w-screen-lg mx-auto justify-between flex flex-col md:flex-row gap-4 md:gap-6 px-8">

                    {/* Company Information */}
                    <div>
                        <h3
                            className="text-lg mb-0 md:mb-0 cursor-pointer flex items-start justify-between"
                            onClick={() => toggleSection('companyInfo')}
                        >
                            <div className='flex flex-col'>
                                <span className='mb-0 md:mb-1 -mt-3'>Outfitters</span>
                                <span className="block w-14 mb-4 border-b-2 border-red-500"></span>
                            </div>
                            <span className="-mt-3 ml-2 text-gray-500 md:hidden">{isOpen.companyInfo ? '-' : '+'}</span>
                        </h3>
                        <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${isOpen.companyInfo ? 'max-h-40' : 'max-h-0'} md:max-h-none md:block`}>
                            {/* <li className="flex items-center">
                                <HomeOutlined className="mr-2 text-gray-600" />
                                <a href="/" className="text-sm text-gray-600 hover:text-red-700">KhushbuWaala Outlets</a>
                            </li> */}
                            <li className="flex items-center">
                                <HomeOutlined className="mr-2 text-gray-600" />
                                <a href="/contact" className="text-sm text-gray-600 hover:text-red-700">KhushbuWaala Office</a>
                            </li>
                            <li className="flex items-center">
                                <MailOutlined className="mr-2 text-gray-600" />
                                <a href="mailto:khushbuwaala@gmail.com" className="text-sm text-gray-600 hover:text-red-700">khushbuwaala@gmail.com</a>
                            </li>
                            <li className="flex items-center">
                                <PhoneOutlined className="mr-2 text-gray-600" />
                                <a href="tel:+8801566395807" className="text-sm text-gray-600 hover:text-red-700">+8801566-395807</a>
                            </li>
                            <li className='flex items-center'>
                                <ContactsOutlined className="mr-2 text-gray-600" />
                                <a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            className="text-lg mb-0 md:mb-0 cursor-pointer flex items-start justify-between"
                            onClick={() => toggleSection('quickLinks')}
                        >
                            <div className='flex flex-col'>
                                <span className='mb-0 md:mb-1 -mt-3'>Quick Links</span>
                                <span className="block w-16 mb-4 border-b-2 border-red-500"></span>
                            </div>
                            <span className="-mt-3 ml-2 text-gray-500 md:hidden">{isOpen.quickLinks ? '-' : '+'}</span>
                        </h3>
                        <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${isOpen.quickLinks ? 'max-h-40' : 'max-h-0'} md:max-h-none md:block`}>
                            {/* <li><a href="#" className="text-sm text-gray-600 hover:text-red-700">Khushbu Club Card</a></li> */}
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Who We Are</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">News Feed</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Manifesto</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Career</a></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3
                            className="text-lg mb-0 md:mb-0 cursor-pointer flex items-start justify-between"
                            onClick={() => toggleSection('policies')}
                        >
                            <div className='flex flex-col'>
                                <span className='mb-0 md:mb-1 -mt-3'>Policies</span>
                                <span className="block w-12 mb-4 border-b-2 border-red-500"></span>
                            </div>
                            <span className="-mt-3 ml-2 text-gray-500 md:hidden">{isOpen.policies ? '-' : '+'}</span>
                        </h3>
                        <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${isOpen.policies ? 'max-h-40' : 'max-h-0'} md:max-h-none md:block`}>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Privacy Policy</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Refund Policy</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Shipping Policy</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Exchange Policies</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3
                            className="text-lg mb-0 md:mb-0 cursor-pointer flex items-start justify-between"
                            onClick={() => toggleSection('account')}
                        >
                            <div className='flex flex-col'>
                                <span className='mb-0 md:mb-1 -mt-3'>Order</span>
                                <span className="block w-12 mb-4 border-b-2 border-red-500"></span>
                            </div>
                            <span className="-mt-3 ml-2 text-gray-500 md:hidden">{isOpen.account ? '-' : '+'}</span>
                        </h3>
                        <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${isOpen.account ? 'max-h-40' : 'max-h-0'} md:max-h-none md:block`}>
                            <li><a href="/track-order" className="text-sm text-gray-600 hover:text-red-700">Track Order</a></li>
                            <li><a href="/wishlist" className="text-sm text-gray-600 hover:text-red-700">My Wishlist</a></li>
                            <li><a href="/cart" className="text-sm text-gray-600 hover:text-red-700">My Cart</a></li>
                            <li><a href="/contact" className="text-sm text-gray-600 hover:text-red-700">Click & Collect</a></li>
                        </ul>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center mt-4">
                    <SocialIcons />
                </div>

            </footer>
            {/* Footer bottom */}
            <div className="text-center bg-gray-200 text-xs text-gray-500">
                <p className='m-1 p-1'>Copyright &copy; {new Date().getFullYear()} KhushbuWaala outfitters all rights reserved. Powered by <strong>KhushbuWaala</strong></p>
            </div>
        </>
    );
};

export default Footer;