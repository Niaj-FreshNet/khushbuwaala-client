import React, { useState, useEffect } from 'react';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import Filter from '../../../Components/Filter/Filter'; // Import the Filter component
import Sort from '../../../Components/Sort/Sort';
import { Button, Skeleton, Spin } from 'antd';
import { PiColumnsFill } from 'react-icons/pi';
import { HiViewColumns } from 'react-icons/hi2';
import { TbColumns1 } from 'react-icons/tb';
import useItem from '../../../Hooks/useItems';

const CategoryWiseProducts = ({ filtrationKeyword }) => {
    const [items, refetch, isLoading, isError, error] = useItem();
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [columns, setColumns] = useState(2); // Default column layout for mobile
    const [loadingMore, setLoadingMore] = useState(false); // Track loading state for "Load More"
    const [visibleProducts, setVisibleProducts] = useState(20); // Initial number of products to show
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const sortedItems = [...items].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setFilteredItems(sortedItems); // Initialize with all items sorted alphabetically
    }, [items]);
    
    useEffect(() => {
        if (filtrationKeyword.length > 0) {
            const filtered = items.filter(product =>
                filtrationKeyword.includes(product.category) ||
                filtrationKeyword.includes(product.specification) ||
                filtrationKeyword.includes(product.section)
            );
            const sortedFiltered = [...filtered].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setFilteredItems(sortedFiltered);
        } else {
            const sortedItems = [...items].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setFilteredItems(sortedItems); // If no keyword is provided, show all sorted items
        }
    }, [filtrationKeyword, items]);
    
    const handleApplyFilters = (filters) => {
        const { priceRange, selectedCategories, selectedSmells, availability } = filters;

        const filtered = items.filter((item) => {
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
            const matchesSmell = selectedSmells.length === 0 || selectedSmells.some(smell => item.smell?.includes(smell));
            const matchesAvailability =
                availability.length === 0 ||
                (availability.includes('inStock') || item.stock > 0) ||
                (availability.includes('outOfStock') || item.stock === 0);

            return matchesPrice && matchesCategory && matchesSmell && matchesAvailability;
        });

        setFilteredItems(filtered);
    };

    // Total number of products (in a real app, this would be fetched from the backend)
    const totalProducts = filteredItems.length;

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // // Dummy products data
    // const products = Array.from({ length: 50 }, (_, i) => ({
    //     id: i + 1,
    //     name: `Product ${i + 1}`,
    //     price: `${(i + 1) * 100} BDT`,
    // }));

    // Column control handler
    const handleColumnChange = (cols) => {
        setColumns(cols);
    };

    // Load more products handler
    const handleLoadMore = () => {
        setLoadingMore(true); // Show spinner while loading
        setTimeout(() => {
            // Simulate loading more products
            setVisibleProducts((prev) => Math.min(prev + 20, items.length)); // Load 4 more products each time
            setLoadingMore(false); // Stop spinner
        }, 1500); // Simulate a 1.5 second loading time
    };

    // Effect to set initial columns based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) { // Assuming 640px is the breakpoint for mobile
                setColumns(5); // Set to 4 columns for desktop
            } else {
                setColumns(2); // Set to 2 columns for mobile
            }
        };

        // Initial check
        handleResize();

        // Attach resize event listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    return (
        <div className="flex flex-col gap-4">

            {/* Column Control & Sort Component */}
            <div className="flex justify-between items-center bg-white px-2 py-3 -mb-3">

                <Filter
                    visible={filterVisible}
                    onClose={setFilterVisible}
                    onApplyFilters={handleApplyFilters}
                />

                <div className="flex gap-2">
                    {/* Show only 1 and 2 columns on mobile, and 2, 3, 4, 5 on larger screens */}
                    <Button onClick={() => handleColumnChange(1)} className="sm:hidden text-sm">
                        <TbColumns1 size={20} />
                    </Button>
                    <Button onClick={() => handleColumnChange(2)} className="text-sm">
                        <PiColumnsFill size={20} />
                    </Button>
                    <Button onClick={() => handleColumnChange(3)} className="hidden md:block text-sm">
                        <HiViewColumns size={20} />
                    </Button>
                    <Button onClick={() => handleColumnChange(4)} className="hidden md:block text-sm">
                        <div className='flex'>
                            <PiColumnsFill size={20} />
                            <PiColumnsFill size={20} />
                        </div>
                    </Button>
                    <Button onClick={() => handleColumnChange(5)} className="hidden md:block text-sm">
                        <div className='flex'>
                            <PiColumnsFill size={20} />
                            <HiViewColumns size={20} />
                        </div>
                    </Button>
                </div>

                <Sort visible={sortVisible} onClose={setSortVisible} />

            </div>

            {/* Product List */}
            {isLoading ? (
                <div className={`grid gap-1 md:gap-2 w-full ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : columns === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className="border p-2 rounded-md">
                            <Skeleton.Image className="w-full h-40 mb-2" />
                            <Skeleton active paragraph={{ rows: 1 }} />
                            <Skeleton.Button active className="mt-2" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`grid gap-1 md:gap-2 w-full ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : columns === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
                    {filteredItems
                        .slice(0, visibleProducts)
                        .map((product) => (
                            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
                        ))}
                </div>)}

            {filteredItems.length > 0 && (
                <div className='divider h-px bg-gray-50 mt-6'></div>
            )}

            {/* Show how many products have been viewed */}
            <div className="text-center mt-2">
                <p className="text-sm">
                    You've viewed {visibleProducts >= totalProducts ? totalProducts : visibleProducts} of {totalProducts} products
                </p>
                <Button
                    className="mt-0 mb-6 py-5 px-8 text-base font-semibold bg-white text-gray-800 rounded-md"
                    onClick={handleLoadMore}
                    disabled={visibleProducts >= totalProducts}
                >
                    {loadingMore ? <Spin /> : 'Load More'}
                </Button>
            </div>
        </div>
    );
};

export default CategoryWiseProducts;