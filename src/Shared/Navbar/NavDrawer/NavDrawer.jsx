import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { FcSalesPerformance, FcPaid } from 'react-icons/fc';
import { PieChartOutlined, ShopOutlined } from '@ant-design/icons';
import { PiAirplaneTilt } from 'react-icons/pi';
import { MdOutlineInventory2 } from 'react-icons/md';

function getItem(label, key, icon, path) {
    return {
        key,
        icon,
        label,
        path,
    };
}

const items = [
    getItem('HOME', '1', <PieChartOutlined />, '/'),
    getItem('NEW IN', '2', <ShopOutlined />, '/shop'),
    getItem('BEST PERFUMES', '3', <MdOutlineInventory2 />, '/shop'),
    getItem('GIFTS AND PACKAGES', '4', <FcSalesPerformance />, '/shop'),
    getItem('ABOUT', '5', <FcSalesPerformance />, '/about'),
];

const NavDrawer = () => {
    const navigate = useNavigate();

    const handleMenuClick = (menuItem) => {
        if (menuItem && menuItem.path) {
            navigate(menuItem.path); // Navigate to the selected route
        }
    };

    return (
        <div style={{ height: '100%', width: '220px', backgroundColor: '#001529' }}>
            <Menu
                theme="dark"
                mode="inline"
                items={items}
                onClick={({ key }) => {
                    const menuItem = items.find(i => i.key === key);
                    if (menuItem) {
                        handleMenuClick(menuItem);
                    }
                }}
                style={{ height: '100%', borderRight: 0 }}
            />
        </div>
    );
};

export default NavDrawer;