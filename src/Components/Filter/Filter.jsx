// src/Components/Filter.jsx

import React from 'react';
import { Button, Drawer, Slider, Checkbox } from 'antd';
import { AiOutlineFilter, AiOutlineClose } from 'react-icons/ai';

const Filter = ({ visible, onClose }) => {
    return (
        <>
            <Button onClick={() => onClose(true)} className="text-sm flex items-center">
                <AiOutlineFilter className="mr-2" /> Filter
            </Button>

            <Drawer
                title="FILTER"
                headerStyle={{ padding: '4px 20px 4px 28px' }}
                placement="left"
                onClose={() => onClose(false)}
                visible={visible}
                width={320}
                closable={false} // Hide the default close button
                extra={
                    <Button onClick={() => onClose(false)} type="text" icon={<AiOutlineClose size={26} />} />
                }
            >
                <div className="flex flex-col space-y-4">

                    <div className='flex flex-col'>
                        <h4 className='mt-0 mb-2'>Size</h4>
                        <span className="block w-14 border-b-2 border-black"></span>
                    </div>
                    <Slider range defaultValue={[20, 80]} />
                    <p>Price: <span className='text-black font-semibold'>BDT 20 - BDT 80</span></p>

                    <div className="flex justify-start mt-4">
                        <Button type="primary">FILTER</Button>
                    </div>
                    <div className='divider w-full'></div>

                    <div className='flex flex-col'>
                        <h4 className='mt-0 mb-2'>Fragrance</h4>
                        <span className="block w-14 border-b-2 border-black"></span>
                    </div>
                    <Checkbox.Group className='flex flex-col space-y-2'>
                        <Checkbox value="floral">Floral</Checkbox>
                        <Checkbox value="woody">Woody</Checkbox>
                        <Checkbox value="fruity">Fruity</Checkbox>
                        <Checkbox value="spicy">Spicy</Checkbox>
                    </Checkbox.Group>


                    <div className='divider w-full'></div>

                    <div className='flex flex-col'>
                        <h4 className='mt-0 mb-2'>Size</h4>
                        <span className="block w-14 border-b-2 border-black"></span>
                    </div>
                    <Checkbox.Group className='flex flex-col space-y-2'>
                        <Checkbox value="tester">Tester (1ml)</Checkbox>
                        <Checkbox value="3ml">3ml</Checkbox>
                        <Checkbox value="6ml">6ml</Checkbox>
                        <Checkbox value="12ml">12ml</Checkbox>
                        <Checkbox value="25ml">25ml</Checkbox>
                    </Checkbox.Group>


                    <div className='divider w-full'></div>

                    <div className='flex flex-col'>
                        <h4 className='mt-0 mb-2'>Availability</h4>
                        <span className="block w-14 border-b-2 border-black"></span>
                    </div>
                    <Checkbox.Group className='flex flex-col space-y-2'>
                        <Checkbox value="inStock">In Stock</Checkbox>
                        <Checkbox value="outOfStock">Out of Stock</Checkbox>
                    </Checkbox.Group>
                </div>
            </Drawer >
        </>
    );
};

export default Filter;