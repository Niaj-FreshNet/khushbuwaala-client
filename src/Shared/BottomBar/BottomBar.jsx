import React from 'react';
import { MdFavoriteBorder, MdOutlineInventory2 } from 'react-icons/md';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { RiHome3Line } from 'react-icons/ri';
import { UserOutlined } from '@ant-design/icons';
import { FaFacebookMessenger } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/')
    };

    const handleShopClick = () => {
        navigate('/shop')
    };

    const handleMessengerClick = (e) => {
        e.preventDefault();
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const messengerUrl = 'https://m.me/111483794112905';

        if (isMobile) {
            // Try to open the Messenger app if installed
            window.location.href = 'fb-messenger://user-thread/111483794112905';
        } else {
            // Open in a new tab for desktop users
            window.open(messengerUrl, '_blank', 'noopener noreferrer');
        }
    };

    const handleCartClick = () => {
        navigate('/cart')
    };

    const handleWishlistClick = () => {
        navigate('/wishlist')
    };

    const handleUserClick = () => {
        navigate('/user')
    };

    return (
        <div className="fixed lg:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
            <div className="flex justify-between my-auto items-center mx-4 px-8 py-2">
                {/* Home Icon */}
                <div onClick={handleHomeClick} className="flex flex-col items-center cursor-pointer">
                    <RiHome3Line size={20} className="mb-1 text-xl transition-transform duration-200 ease-in-out transform hover:scale-120" />
                    <span className="text-xs text-gray-600">Home</span>
                </div>

                {/* Shop Icon */}
                <div onClick={handleShopClick} className="flex flex-col items-center cursor-pointer">
                    <MdOutlineInventory2 size={20} className="mb-1 text-xl transition-transform duration-200 ease-in-out transform hover:scale-120" />
                    <span className="text-xs text-gray-600">Shop</span>
                </div>

                {/* Messenger Icon */}
                <div onClick={handleMessengerClick} className="flex flex-col items-center cursor-pointer">
                    <FaFacebookMessenger size={34} className="mb-1 text-[#0078FF] text-xl transition-transform duration-200 ease-in-out transform hover:scale-120" />
                </div>

                {/* Wishlist Icon */}
                <div onClick={handleWishlistClick} className="flex flex-col items-center cursor-pointer">
                    <MdFavoriteBorder size={20} className="mb-1 text-xl transition-transform duration-200 ease-in-out transform hover:scale-120" />
                    <span className="text-xs text-gray-600">Wishlist</span>
                </div>

                {/* Cart Icon */}
                <div onClick={handleCartClick} className="flex flex-col items-center cursor-pointer">
                    <PiShoppingCartSimpleBold size={20} className="mb-1 text-xl transition-transform duration-200 ease-in-out transform hover:scale-120" />
                    <span className="text-xs text-gray-600">Cart</span>
                </div>

                {/* User Icon */}
                {/* <div onClick={handleUserClick} className="flex flex-col items-center cursor-pointer">
                    <UserOutlined size={20} className="mb-1 text-xl transition-transform duration-200 ease-in-out transform hover:scale-120" />
                    <span className="-mb-1 text-xs text-gray-600">Account</span>
                </div> */}
            </div>
        </div>
    );
};

export default BottomBar;
