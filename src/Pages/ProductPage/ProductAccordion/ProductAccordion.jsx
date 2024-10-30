import React from 'react';
import { Button, Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const ProductAccordion = ({ product, activeKey, setActiveKey, descriptionPanelRef }) => {
    const handlePanelChange = (key) => {
        setActiveKey(key);
    };

    // Custom header to include both the existing arrow and the +/-
    // Ensure activeKey is initialized properly
    const renderHeader = (key, title) => {
        // Ensure activeKey is defined
        const isActive = Array.isArray(activeKey) ? activeKey.includes(key) : activeKey === key;

        return (
            <div className="flex justify-between items-center">
                <span>{title}</span>
                <span>{isActive ? <MinusOutlined /> : <PlusOutlined />}</span>
            </div>
        );
    };

    return (
        <>
            <Collapse
                className="mt-4"
                activeKey={activeKey}
                onChange={handlePanelChange}
            >
                <Panel
                    header={renderHeader("1", "Description & Size Info")}
                    key="1"
                    ref={descriptionPanelRef}
                >
                    <span className=''>
                        <p>{product.description}</p>
                        <p><span className='font-semibold text-sm text-gray-500'>Note:</span>{product.note}</p>
                        <p><span className='font-semibold text-sm text-gray-500'>Ingredients:</span>{product.note}</p>
                        <p><span className='font-semibold text-sm text-gray-500'>Care:</span>{product.note}</p>
                    </span>
                </Panel>
                <Panel
                    header={renderHeader("2", "Customer Reviews")}
                    key="2"
                >
                    <p>Reviews will go here...</p>
                </Panel>
            </Collapse>

            {/* SKU & Category */}
            <div className="text-xs mt-6">
                <p>SKU: {product.sku}</p>
                <p>Category: {product.category}</p>
            </div>

            {/* Ask a Question */}
            <div className="text-sm mt-4">
                <Button className="text-red-600 border-red-400">Ask a Question</Button>
            </div>
        </>
    );
};

export default ProductAccordion;