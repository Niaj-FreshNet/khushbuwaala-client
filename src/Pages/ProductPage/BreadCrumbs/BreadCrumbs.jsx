// Breadcrumbs.js
import React from 'react';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ product }) => {
    // console.log(product)
    return (
        <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{product.category}</Breadcrumb.Item>
            <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
