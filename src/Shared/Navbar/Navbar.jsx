import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import NavDrawer from './NavDrawer/NavDrawer';
import './Navbar.css';
import { MdFavoriteBorder } from 'react-icons/md';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import CartDrawer from '../../Pages/AddToCart/CartDrawer/CartDrawer';
import { CartContext } from '../../Cart/CartContext';

const Navbar = () => {
    const { cartItems } = useContext(CartContext);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);

    const navOptions = (
        <ul className="flex my-auto space-x-6 uppercase">
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
                    to="/shop"
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
                    Best Perfumes
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/shop"
                    className="hover:text-red-600 transition-colors duration-300"
                >
                    Gifts and Packages
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/ashopbshopout"
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

    return (
        <>
            <div className={`navbar max-w-screen-2xl mx-auto h-2 border-red-600 glassy-navbar ${isVisible ? 'top-0' : '-top-16'} fixed w-full z-50`}>
                <div className='flex-1 justify-between mx-auto my-auto items-center'>
                    <div>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleDrawer}>
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
                        <NavLink className="btn btn-md btn-ghost text-lg">KhushbuWaala</NavLink>
                    </div>
                    <div className="flex-grow hidden lg:flex justify-center items-center">
                        {navOptions}
                    </div>
                    <div className="flex gap-8 items-center">
                        {/* Desktop Icons */}
                        <div className="hidden lg:flex gap-8 items-center">
                            <span  className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110">
                                <SearchOutlined className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </span>
                            <span  className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110">
                                <MdFavoriteBorder className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                            </span>
                            <span onClick={handleAddtoCart} className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110">
                                <PiShoppingCartSimpleBold className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartItems.length}</span>
                            </span>

                            <CartDrawer visible={cartVisible} onClose={handleCloseCart} />

                            <span className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110">
                                <UserOutlined className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </span>
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex lg:hidden gap-8 mr-6 items-center">
                            <span className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110">
                                <SearchOutlined className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                            </span>
                            <span className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110">
                                <PiShoppingCartSimpleBold onClick={handleAddtoCart} className="text-xl transition-colors duration-200 ease-in-out group-hover:text-red-600" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                            </span>
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
                styles={{
                    body: { padding: 0, margin: 0 },
                    header: { backgroundColor: '#001529', color: 'white' },
                }}
                closeIcon={<span style={{ color: 'white' }}>✖</span>}
                height="100%"
                width={220}
                style={{ zIndex: 1000 }}
            >
                <NavDrawer onMenuClick={() => setDrawerOpen(false)} />
            </Drawer>
        </>
    );
};

export default Navbar;
