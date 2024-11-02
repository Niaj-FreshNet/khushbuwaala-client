import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, ShopOutlined, GiftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { MdOutlineInventory2 } from 'react-icons/md';

function getItem(label, key, icon, path) {
    return { key, icon, label, path };
}

const items = [
    getItem('Home', '1', <HomeOutlined />, '/'),
    getItem('New In', '2', <ShopOutlined />, '/shop'),
    getItem('Best Perfumes', '3', <MdOutlineInventory2 />, '/shop/best-perfumes'),
    getItem('Gifts & Packages', '4', <GiftOutlined />, '/shop/gifts'),
    getItem('About', '5', <InfoCircleOutlined />, '/about'),
];

const NavDrawer = ({ onMenuClick }) => {
    const navigate = useNavigate();

    const handleMenuClick = (menuItem) => {
        if (menuItem && menuItem.path) {
            navigate(menuItem.path);
            onMenuClick(); // Close the drawer after navigating
        }
    };

    return (
        <Menu
            mode="inline"
            items={items}
            onClick={({ key }) => {
                const menuItem = items.find(i => i.key === key);
                if (menuItem) handleMenuClick(menuItem);
            }}
            style={{ height: '100%' }}
        />
    );
};

export default NavDrawer;
