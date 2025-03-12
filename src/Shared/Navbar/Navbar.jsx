import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Dropdown, Menu } from 'antd';
import NavDrawer from './NavDrawer/NavDrawer';
import './Navbar.css';
import { MdFavoriteBorder, MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import CartDrawer from '../../Pages/AddToCart/CartDrawer/CartDrawer';
import { CartContext } from '../../Cart/CartContext';
import logo from '../../assets/KhushbuWaala.webp';
import { IoIosArrowDropdown } from 'react-icons/io';
import SearchDrawer from '../../Pages/Search/SearchDrawer/SearchDrawer';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TbLocation } from 'react-icons/tb';
import { WishlistContext } from '../../Wishlist/WishlistContext';

const Navbar = () => {
    const { cartItems } = useContext(CartContext);
    const { wishlistItems } = useContext(WishlistContext);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const navigate = useNavigate();


    const menu = (
        <Menu className="bg-white border border-gray-200 rounded-md shadow-lg">
            <Menu.Item className="hover:bg-gray-100 transition-colors duration-300">
                <NavLink to="/inspired-perfume-oil" className="block px-4 py-2 text-gray-800 font-semibold text-md">
                    Inspired Perfume Oil
                </NavLink>
            </Menu.Item>
            <Menu.Item className="hover:bg-gray-100 transition-colors duration-300">
                <NavLink to="/oriental-attar" className="block px-4 py-2 text-gray-800 font-semibold text-md">
                    Oriental & Arabian Attar
                </NavLink>
            </Menu.Item>
            <Menu.Item className="hover:bg-gray-100 transition-colors duration-300">
                <NavLink to="/artificial-oud" className="block px-4 py-2 text-gray-800 font-semibold text-md">
                    Artificial Oud
                </NavLink>
            </Menu.Item>
            <Menu.Item className="hover:bg-gray-100 transition-colors duration-300">
                <NavLink to="/natural-attar" className="block px-4 py-2 text-gray-800 font-semibold text-md">
                    Natural Collections
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    const navOptions = (
        <ul className="flex my-auto space-x-6">
            <li>
                <NavLink
                    to="/"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/new-arrivals"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    New In
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/shop"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    All Collection
                </NavLink>
            </li>
            <Dropdown overlay={menu} trigger={['hover']}>
                <li className="dropdown-content flex gap-2 items-center hover:text-red-600 transition-colors duration-300 cursor-pointer">
                    Menu
                    <IoIosArrowDropdown size={16} />
                </li>
            </Dropdown>
            <li>
                <NavLink
                    to="/womens-perfume"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    For Women
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/gifts-and-packages"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    Gifts and Packages
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    Contact
                </NavLink>
            </li>
        </ul>
    );

    const handleScroll = () => {
        const currentScrollTop = window.pageYOffset;
        if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollTop(currentScrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAddtoCart = () => {
        setCartVisible(true);
    };

    const handleCloseCart = () => {
        setCartVisible(false);
    };

    const handleSearch = () => {
        setSearchVisible(true);
    };

    const handleCloseSearch = () => {
        setSearchVisible(false);
    };

    const redirectToWishlist = () => {
        navigate('/wishlist');
    };

    const redirectToTrackOrder = () => {
        navigate('/track-order');
    };

    return (
        <>
            <div className={`navbar max-w-screen-2xl mx-auto h-2 border-red-600 glassy-navbar uppercase text-sm font-thin ${isVisible ? 'top-0' : '-top-16'} fixed w-full z-50`}>
                <div className='flex-1 justify-between px-2 lg:px-8 mx-auto my-auto items-center'>
                    <div>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-gray-300" onClick={toggleDrawer}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                        </div>
                        <NavLink className="hidden lg:btn hover:bg-transparent lg:btn-ghost transition-transform duration-200 ease-in-out transform hover:scale-110 ">
                            <img src={logo} alt="KhushbuWaala" className="h-8 w-auto" />
                        </NavLink>
                    </div>
                    <div className='flex-1 ml-8 text-center lg:hidden justify-center mx-auto my-auto'>
                        <NavLink className="btn btn-ghost hover:bg-transparent transition-transform duration-200 ease-in-out transform hover:scale-110 ">
                            <img src={logo} alt="KhushbuWaala" className="h-8 w-auto" />
                        </NavLink>
                    </div>
                    <div className="flex-grow hidden lg:flex justify-center items-center">
                        {navOptions}
                    </div>
                    <div className="flex gap-8 items-center">
                        {/* Desktop Icons */}
                        <div className="hidden lg:flex gap-8 items-center">
                            <span onClick={handleSearch} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <SearchOutlined className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </span>

                            <SearchDrawer visible={searchVisible} onClose={handleCloseSearch} />

                            <a onClick={redirectToWishlist} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <MdFavoriteBorder className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                                {wishlistItems.length > 0 && (
                                    <a className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {wishlistItems.length}
                                    </a>
                                )}
                            </a>
                            <a onClick={handleAddtoCart} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <PiShoppingCartSimpleBold className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                                <a className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartItems.length}
                                </a>
                            </a>

                            <CartDrawer visible={cartVisible} onClose={handleCloseCart} />

                            {/* <a className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <UserOutlined className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </a> */}

                            <a onClick={redirectToTrackOrder} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <TbLocation className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </a>
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex lg:hidden gap-7 mr-4 items-center">
                            <a onClick={handleSearch} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <SearchOutlined className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </a>
                            <a onClick={handleAddtoCart} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer">
                                <PiShoppingCartSimpleBold className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                                <a className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartItems.length}</a>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ant Design Drawer for Mobile */}
            <Drawer
                placement="left"
                closable={true}
                onClose={toggleDrawer}
                open={drawerOpen}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ backgroundColor: '#000000', color: 'white' }}
                closeIcon={<span style={{ color: 'white' }}>✖</span>}
                width={260}
            >
                <NavDrawer onMenuClick={toggleDrawer} /> {/* Pass the close function to NavDrawer */}
            </Drawer>
        </>
    );
};

export default Navbar;
