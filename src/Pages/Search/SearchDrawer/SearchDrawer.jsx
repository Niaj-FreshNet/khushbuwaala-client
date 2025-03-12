import { Button, Drawer, Select, Skeleton, Spin, Tag } from 'antd';
import { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CartContext } from '../../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import useItems from '../../../Hooks/useItems';
import { FaTrashAlt } from 'react-icons/fa';

const smellTypes = [
    "Corporate", "Citrusy", "Manly", "Earthy", "Leathery", "Soapy", "Refreshing", "Fruity",
    "Sweet", "Chocolate", "Vanilla", "Candy", "Floral", "Powdery", "Bergamote", "Lavender",
    "Vetiver", "Woody", "Spicy", "Smooky", "Strong", "Amber", "Musky", "Nostalgic",
    "Projective", "Longetive", "Synthetic", "Organic"
];

const SearchDrawer = ({ visible, onClose }) => {
    const [items, fetchItems, isLoading, isError, error] = useItems();
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState("all");
    const [searchValue, setSearchValue] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(true);

    const handleSearch = (value) => {
        setSearchValue(value);
        setSearchPerformed(true);
    };

    const handleTagClick = (tag) => {
        setSearchValue(tag);
        handleSearch(tag);
    };

    // const handleCategoryChange = (value) => {
    //     setSelectedCategories(value);
    // };

    // const filteredItems = items.filter(item => {
    //     const matchesCategory = selectedCategories === "all" || item.category === selectedCategories;
    //     // const matchesSearchValue = item.name.toLowerCase().includes(searchValue.toLowerCase());


    //     const matchesSearchValue = item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    //         item.smell.some(smellType => smellType.toLowerCase().includes(searchValue.toLowerCase()));

    //     return matchesCategory && matchesSearchValue;
    // });

    const filteredItems = items
    .filter(item => {
        const matchesCategory = selectedCategories === "all" || item.category === selectedCategories;
        const matchesSearchValue = item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.smell.some(smellType => smellType.toLowerCase().includes(searchValue.toLowerCase()));

        return matchesCategory && matchesSearchValue;
    })
    .reverse(); // Reverse to show newly added items first

    const handleItemClick = (item) => {
        const categoryPathMapping = {
            inspiredPerfumeOil: "inspired-perfume-oil",
            oriental: "oriental-attar",
            artificialOud: "artificial-oud",
            natural: "natural-attar",
            semiOrganic: "semi-organic",
            organic: "organic",
            brand: "brand",
        };

        const categoryPath = categoryPathMapping[item.category];
        const productNameSlug = item.name.toLowerCase().replace(/ /g, '-'); // Convert product name to URL-friendly slug
        navigate(`/${categoryPath}/${productNameSlug}`);
        onClose(true);
    };

    return (
        <Drawer
            title="SEARCH"
            headerStyle={{ padding: '4px 20px 4px 28px' }}
            placement="right"
            onClose={() => onClose(false)}
            visible={visible}
            width={320}
            closable={false}
            extra={
                <Button onClick={() => onClose(false)} type="text" icon={<AiOutlineClose size={26} />} />
            }
            bodyStyle={{ padding: '0', height: '100%', overflow: 'hidden' }} // Avoid scrolling in the drawer
        >
            <div className="flex flex-col h-full">
                <div className='h-2/5 overflow-y-auto'>
                    {/* Cart Items */}
                    <div className='flex flex-col overflow-y-auto flex-grow p-4'>


                        {/* Search Filter */}
                        <div className='mt-2 mb-2 mx-2'>
                            <Search
                                placeholder="Search products..."
                                enterButton
                                onSearch={handleSearch}
                                allowClear
                                className="w-full"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className='pt-2 pb-4 mx-2'>
                            <Select
                                placeholder="All Categories"
                                defaultValue="all"
                                onChange={setSelectedCategories}
                                className="w-full"
                                showSearch={false}
                                filterOption={false}
                            >
                                <Option value="all">All Categories</Option>
                                <Option value="inspiredPerfumeOil">Inspired Perfume Oil</Option>
                                <Option value="oriental">Oriental</Option>
                                <Option value="artificialOud">Artificial Oud</Option>
                                <Option value="natural">Natural</Option>
                                {/* <Option value="semiorganic">Semi-Organic</Option> */}
                                {/* <Option value="organic">Organic</Option> */}
                                <Option value="brand">Brand</Option>
                            </Select>
                        </div>

                        {/* Quick Search */}
                        <div className='mx-2 px-2'>Quick Search:</div>
                        <div className='flex flex-wrap pt-2 mx-2'>
                            {smellTypes.map((type) => (
                                <Tag
                                    key={type}
                                    color="blue"
                                    className="text-xs m-1 cursor-pointer"
                                    onClick={() => handleTagClick(type)}
                                >
                                    {type}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>


                <div className='w-full flex justify-between items-start shadow-md'>
                    <div className='flex flex-col mx-6 '>
                        <div className='text-sm mt-2 mb-1'>Search Results:</div>
                        <span className="block w-20 mb-2 border-b-2 border-red-500"></span>
                    </div>
                    <div className='text-sm mt-2 mb-1 mx-6 '>{filteredItems.length} Products</div>
                </div>
                <div className='h-3/5 overflow-y-auto'>
                    {/* Search Results */}
                    <div className='flex justify-between items-center mt-5 px-4 pb-3'>
                        <div className='w-full mx-2'>
                            {isLoading ? (
                                <div className='w-full mt-6'>
                                    <Skeleton active />
                                </div>
                            ) : isError ? (
                                <div className='text-red-500'>Error: {error}</div>
                            ) : searchPerformed ? (
                                <div className='grid grid-cols-1 gap-3'>
                                    {filteredItems.map((item, index) => (
                                        <div key={index} className='flex items-start justify-between border-b pb-3 transition-all hover:bg-gray-50 cursor-pointer'
                                            onClick={() => handleItemClick(item)}
                                        >
                                            <div className='w-26 h-36 flex-shrink-0 rounded overflow-hidden'>
                                                <img
                                                    src={item.primaryImage}
                                                    alt={item.name}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                            <div className='flex-1 space-y-1 pl-4'>
                                                <h4 className='font-semibold text-md mb-2'>{item.name}</h4>
                                                <p className='text-xs text-gray-600'>Tk {item.price} BDT</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-gray-500'>No search results to display.</div>
                            )}
                        </div>
                    </div>


                    <div className='flex justify-center p-4'>
                        {/* <Button href='/checkout' type="primary" className='btn bg-red-600  text-white text-lg font-bold w-full'
                            onClick={handleCartCheckout}
                        >
                            Checkout</Button> */}
                    </div>
                </div>

            </div>
        </Drawer>
    );
};

export default SearchDrawer;