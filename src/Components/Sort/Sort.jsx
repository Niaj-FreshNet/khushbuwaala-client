// src/Components/Sort.jsx

import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { AiOutlineSortAscending, AiOutlineClose } from 'react-icons/ai';

const Sort = ({ visible, onClose, onSortChange }) => {
    const sortOptions = [
        { label: 'Featured', value: 'featured' },
        { label: 'Best selling', value: 'best-selling' },
        { label: 'Alphabetically, A-Z', value: 'a-z' },
        { label: 'Alphabetically, Z-A', value: 'z-a' },
        { label: 'Price, low to high', value: 'low-to-high' },
        { label: 'Price, high to low', value: 'high-to-low' },
        { label: 'Date, old to new', value: 'old-to-new' },
        { label: 'Date, new to old', value: 'new-to-old' },
    ];

    // State to track the selected sort option (initially set to "new-to-old")
    const [selectedSort, setSelectedSort] = useState('new-to-old');

    // Handle sort change
    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption); // Update the selected sort option
        onSortChange(sortOption); // Call the parent function
    };

    return (
        <>
            <Button onClick={() => onClose(true)} className="text-sm flex items-center">
                <AiOutlineSortAscending className="mr-2" /> Sort
            </Button>

            <Drawer
                title="SORT BY:"
                headerStyle={{ padding: '4px 20px 4px 28px' }}
                placement="bottom"
                height={300}
                onClose={() => onClose(false)}
                visible={visible}
                closable={false} // Hide the default close button
                extra={
                    <Button onClick={() => onClose(false)} type="text" icon={<AiOutlineClose size={26} />} />
                }
            >
                <div className="flex flex-col space-y-2">
                    {/* Directly visible sort options */}
                    {sortOptions.map((option) => (
                        <Button
                            key={option.value}
                            className={`text-left w-full text-md p-2 rounded-none hover:bg-red-100 ${
                                selectedSort === option.value ? 'bg-red-100 text-red-600' : 'text-gray-800'
                            }`}
                            style={{ border: 'none', justifyContent: 'flex-start' }} // No border and left-aligned text
                            onClick={() => handleSortChange(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </Drawer>
        </>
    );
};

export default Sort;