import React from 'react';
import { Carousel, Divider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import useItems from '../../../Hooks/useItems';

// Custom Arrows for the Carousel
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className="absolute left-[-5px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-lg rounded-full p-4 z-10 hover:bg-gray-200"
        style={{ display: currentSlide === 0 ? 'none' : 'block' }}
    >
        <LeftOutlined />
    </button>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className="absolute right-[-5px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-lg rounded-full p-4 z-10 hover:bg-gray-200"
    >
        <RightOutlined />
    </button>
);

const OrientalProduct = ({columns}) => {
    const [items, refetch, isLoading, isError, error] = useItems();

    return (
        <div className="container mx-auto">
            <h2 className="text-xl text-center font-bold -mb-2 relative">
                Oriental Perfumes and Attar
            </h2>
            <Divider dashed>
                <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
            </Divider>
            <Carousel
                // autoplay
                arrows
                prevArrow={<SlickArrowLeft />}
                nextArrow={<SlickArrowRight />}
                slidesToShow={4} // Show 3 cards at a time
                slidesToScroll={1} // Scroll 1 card at a time
                dots={false}
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
                            slidesToShow: 1,
                        },
                    },
                ]}
            >
            {items.map((product) => (
              <div key={product._id} className="flex p-2">
                <ProductCard product={product} columns={columns} />
              </div>
            ))}
          </Carousel>
        </div>
    );
};

export default OrientalProduct;
