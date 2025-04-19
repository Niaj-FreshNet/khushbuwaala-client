import { useEffect, useState } from 'react';
import { Carousel, Divider, Skeleton } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import useItem from '../../../Hooks/useItems';

// Custom Arrows for the Carousel
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className="hidden md:block absolute left-[-5px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-lg rounded-full p-2 md:p-4 z-10 hover:bg-gray-200"
        style={{ display: currentSlide === 0 ? 'none' : 'block' }}
    >
        <LeftOutlined />
    </button>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className="hidden md:block absolute right-[-5px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-lg rounded-full p-2 md:p-4 z-10 hover:bg-gray-200"
    >
        <RightOutlined />
    </button>
);

const OudProduct = ({ columns }) => {
    const [items, refetch, isLoading, isError, error] = useItem();
    const [itemsCount, setItemsCount] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsCount(2); // 2 items for small screen
            } else {
                setItemsCount(4); // 4 items for large screen
            }
        };

        // Set initial count based on the screen size
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto">
                <h2 className="text-xl text-black text-center font-bold -mb-2 relative">
                    Artificial Oud
                </h2>
                <Divider dashed>
                    <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
                </Divider>
                <div className={`mx-auto px-2 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 w-full`}>
                    {Array.from({ length: itemsCount }).map((_, index) => (
                        <div key={index} className="border p-2 rounded-md">
                            <Skeleton.Image className="w-full h-40 mb-2" />
                            <Skeleton active paragraph={{ rows: 1 }} />
                            <Skeleton.Button active className="mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto">
                <h2 className="text-xl text-black text-center font-bold -mb-2 relative">
                    Artificial Oud
                </h2>
                <Divider dashed>
                    <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
                </Divider>
                <div className={`mx-auto px-2 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 w-full`}>
                    {Array.from({ length: itemsCount }).map((_, index) => (
                        <div key={index} className="border p-2 rounded-md">
                            <Skeleton.Image className="w-full h-40 mb-2" />
                            <Skeleton active paragraph={{ rows: 1 }} />
                            <Skeleton.Button active className="mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    console.log('isLoading', isLoading)
    // console.log('refetch', refetch)

    return (
        <div className="container mx-auto">
            <h2 className="text-xl text-black text-center font-bold -mb-2 relative">
                Artificial Oud
            </h2>
            <Divider dashed>
                <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
            </Divider>

            <Carousel
                autoplay={false}
                arrows
                prevArrow={<SlickArrowLeft />}
                nextArrow={<SlickArrowRight />}
                slidesToShow={4} // Show 4 cards at a time
                slidesToScroll={2} // Scroll 1 card at a time
                dots={false} // Custom dots styling
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                ]}
            >
                {/* Filter items for 'featured' products only */}
                {items
                    .filter((product) => product.category === 'artificialOud')
                    .map((product) => (
                        <div key={product._id} className="flex p-[2px] md:p-2">
                            {/* <div>{product.name}</div> */}
                            <ProductCard product={product} columns={columns} />
                        </div>
                    ))}
            </Carousel>
        </div>
    );
};

export default OudProduct;