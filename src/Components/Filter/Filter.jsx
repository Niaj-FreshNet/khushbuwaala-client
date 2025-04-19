import React, { useState } from 'react';
import { Button, Drawer, Slider, Checkbox, Select } from 'antd';
import { AiOutlineFilter, AiOutlineClose } from 'react-icons/ai';

const { Option } = Select;

const Filter = ({ visible, onClose, onApplyFilters }) => {
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSmells, setSelectedSmells] = useState([]);
    const [availability, setAvailability] = useState([]);

    const handleApplyFilters = () => {
        onApplyFilters({
            priceRange,
            selectedCategories,
            selectedSmells,
            availability,
        });
        onClose(false);
    };

    return (
        <>
            <Button onClick={() => onClose(true)} className="text-sm flex items-center">
                <AiOutlineFilter className="mr-2" /> Filter
            </Button>

            <Drawer
                title="FILTER"
                placement="left"
                onClose={() => onClose(false)}
                visible={visible}
                width={320}
                closable={false}
                extra={
                    <Button onClick={() => onClose(false)} type="text" icon={<AiOutlineClose size={26} />} />
                }
            >
                <div className="flex flex-col space-y-4">

                    {/* Category Filter */}
                    <div className=''>
                        <h4 className='-mt-0 mb-2'>Category</h4>
                        <Select
                            placeholder="Select Category"
                            onChange={setSelectedCategories}
                            className="w-full"
                            showSearch={false}
                            filterOption={false}
                        >
                            <Option value="inspiredPerfumeOil">Inspired Perfume Oil</Option>
                            <Option value="oriental">Oriental</Option>
                            <Option value="artificialOud">Artificial Oud</Option>
                            <Option value="natural">Natural</Option>
                            {/* <Option value="semiorganic">Semi-Organic</Option>
                            <Option value="organic">Organic</Option> */}
                            <Option value="brand">Brand</Option>
                        </Select>
                    </div>

                    {/* Smell Filter */}
                    <div className='flex justify-between px-2 flex-row gap-4'>
                        <div className='flex flex-col gap-4 mt-2'>
                            <div className='flex flex-col'>
                                <div className='flex flex-col'>
                                    <h4 className='mt-2'>Performance</h4>
                                    <span className="block w-16 mb-4 border-b-2 border-red-500"></span>
                                </div>
                                <Checkbox.Group
                                    className='flex flex-col space-y-2'
                                    onChange={setSelectedSmells}
                                >
                                    <Checkbox value="Projective">Projective</Checkbox>
                                    <Checkbox value="Longetive">Longetive</Checkbox>
                                    <Checkbox value="Nostalgic">Nostalgic</Checkbox>
                                    <Checkbox value="Synthetic">Synthetic</Checkbox>
                                    <Checkbox value="Organic">Organic</Checkbox>
                                </Checkbox.Group>
                            </div>

                            <div className='flex flex-col'>
                                <div className='flex flex-col'>
                                    <h4 className='mt-2'>Main Accords</h4>
                                    <span className="block w-16 mb-4 border-b-2 border-red-500"></span>
                                </div>
                                <Checkbox.Group
                                    className='flex flex-col space-y-2'
                                    onChange={setSelectedSmells}
                                >
                                    <Checkbox value="Corporate">Corporate</Checkbox>
                                    <Checkbox value="Refreshing">Refreshing</Checkbox>
                                    <Checkbox value="Manly">Manly</Checkbox>
                                    <Checkbox value="Floral">Floral</Checkbox>
                                    <Checkbox value="Fruity">Fruity</Checkbox>
                                    <Checkbox value="Sweet">Sweet</Checkbox>
                                    <Checkbox value="Spicy">Spicy</Checkbox>
                                    <Checkbox value="Strong">Strong</Checkbox>
                                </Checkbox.Group>
                            </div>
                        </div>

                        <div className='flex flex-col mb-2 mt-2'>
                            <div className='flex flex-col'>
                                <h4 className='mt-2'>Notes</h4>
                                <span className="block w-10 mb-4 border-b-2 border-red-500"></span>
                            </div>
                            <Checkbox.Group
                                className='flex flex-col space-y-2'
                                onChange={setSelectedSmells}
                            >
                                <Checkbox value="Citrusy">Citrusy</Checkbox>
                                <Checkbox value="Manly">Manly</Checkbox>
                                <Checkbox value="Earthy">Earthy</Checkbox>
                                <Checkbox value="Leathery">Leathery</Checkbox>
                                <Checkbox value="Soapy">Soapy</Checkbox>
                                <Checkbox value="Sweet">Sweet</Checkbox>
                                <Checkbox value="Chocolate">Chocolate</Checkbox>
                                <Checkbox value="Vanilla">Vanilla</Checkbox>
                                <Checkbox value="Candy">Candy</Checkbox>
                                <Checkbox value="Powdery">Powdery</Checkbox>
                                <Checkbox value="Bergamote">Bergamote</Checkbox>
                                <Checkbox value="Lavender">Lavender</Checkbox>
                                <Checkbox value="Vetiver">Vetiver</Checkbox>
                                <Checkbox value="Woody">Woody</Checkbox>
                                <Checkbox value="Smooky">Smooky</Checkbox>
                                <Checkbox value="Amber">Amber</Checkbox>
                                <Checkbox value="Musky">Musky</Checkbox>
                            </Checkbox.Group>
                        </div>
                    </div>

                    {/* Specification Filter */}
                    <div className=''>
                        <h4 className='-mt-0 mb-2'>Specification</h4>
                        <Select
                            placeholder="For Men or Women?"
                            onChange={setSelectedCategories}
                            className="w-full"
                            showSearch={false}
                            filterOption={false}
                        >
                            <Option value="all">All</Option>
                            <Option value="men">For Men</Option>
                            <Option value="women">For Women</Option>
                        </Select>
                    </div>

                    {/* Price Filter */}
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <h4>Price</h4>
                            <span className="block w-10 mb-2 border-b-2 border-red-500"></span>
                        </div>
                        <Slider
                            range
                            min={100}
                            max={5000}
                            defaultValue={priceRange}
                            onChange={(value) => setPriceRange(value)}
                        />
                        <p>Price Range: BDT {priceRange[0]} - {priceRange[1]}</p>
                    </div>

                    {/* Availability Filter */}
                    {/* <div className='flex flex-col'>
                        <h4>Availability</h4>
                        <Checkbox.Group
                            className='flex flex-col space-y-2'
                            onChange={setAvailability}
                        >
                            <Checkbox value="inStock">In Stock</Checkbox>
                            <Checkbox value="outOfStock">Out of Stock</Checkbox>
                        </Checkbox.Group>
                    </div> */}

                    {/* Apply Button */}
                    <Button type="primary" onClick={handleApplyFilters} className="btn bg-red-600 text-white font-bold">
                        Apply Filters
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default Filter;
