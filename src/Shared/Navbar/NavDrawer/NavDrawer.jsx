import React from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeOutlined, ShopOutlined, GiftOutlined, InfoCircleOutlined, HeartTwoTone, UserOutlined } from '@ant-design/icons';
import { MdOutlineInventory2 } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { ImNewTab } from 'react-icons/im';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TbLocation } from 'react-icons/tb';

function getItem(label, key, icon, path, children, isMenu = false) {
    return {
        key,
        icon,
        children,
        label: isMenu ? (
            <span className="hover:text-red-600 transition-colors duration-300">
                {label}
            </span>
        ) : (
            <NavLink to={path} className="hover:text-red-600 transition-colors duration-300">
                {label}
            </NavLink>
        ),
    };
}

const items = [
    getItem('Home', '1', <HomeOutlined />, '/'),
    getItem('New In', '2', <ImNewTab />, '/new-arrivals'),
    getItem('All Collection', '3', <MdOutlineInventory2 />, '/shop'),
    getItem('Menu', '4', <RxDropdownMenu />, null, [  // No link for Menu
        getItem('Inspired Perfume Oils', '4-1', null, '/inspired-perfume-oil'),
        getItem('Oriental & Arabian Attar', '4-2', null, '/oriental-attar'),
        getItem('Artificial Oud', '4-3', null, '/artificial-oud'),
        getItem('Natural Collections', '4-4', null, '/natural-attar'),
    ], true), // Pass true to indicate this is the main menu item with no link
    getItem('For Women', '5', <HeartTwoTone />, '/womens-perfume'),
    getItem('Gifts & Packages', '6', <GiftOutlined />, '/gifts-and-packages'),
    getItem('Track Order', '7', <TbLocation />, '/track-order'),
    getItem('Contact Us', '8', <InfoCircleOutlined />, '/contact'),
];

const NavDrawer = ({ onMenuClick }) => {
    const navigate = useNavigate();

    const handleMenuClick = (key) => {
        const findItem = (items, key) => {
            for (const item of items) {
                if (item.key === key) {
                    return item;
                }
                if (item.children) {
                    const found = findItem(item.children, key);
                    if (found) {
                        return found;
                    }
                }
            }
        };

        const menuItem = findItem(items, key);
        if (menuItem && menuItem.label.props.to) {
            navigate(menuItem.label.props.to);
            onMenuClick();
        }
    };

    return (
        <Menu
            mode="inline"
            items={items}
            onClick={({ key }) => handleMenuClick(key)}
            style={{ height: '100%' }}
        />
    );
};

export default NavDrawer;
