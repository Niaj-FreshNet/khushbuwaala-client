import React, { useEffect, useMemo, useState } from 'react';
import { Carousel, Divider, Skeleton } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import useItem from '../../../Hooks/useItems';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

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

const BestSellers = ({ columns }) => {
  const [items, isLoading, isError, error] = useItem();

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <h2 className="text-xl text-center font-bold -mb-2 relative">
          Best Sellers
        </h2>
        <Divider dashed>
          <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
        </Divider>
        <div className='max-w-screen-xl flex justify-center mx-auto p-[2px] md:p-2'>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col"
                style={{ width: `200px`, height: `350px` }} // Match dimensions of ProductCard
              >
                {/* Skeleton for Image */}
                <Skeleton.Input
                  active
                  className="w-full h-[100%] rounded-t-md"
                />

                {/* Skeleton for Title and Price */}
                <div className="p-2 flex flex-col gap-2 border-t border-neutral-200">
                  <Skeleton.Input active className="w-full h-4 mb-4" />

                  {/* Skeleton for Button */}
                  <div className='flex flex-row justify-between'>
                    <Skeleton.Button active className="w-full h-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto">
        <h2 className="text-xl text-center font-bold -mb-2 relative">
          Best Sellers
        </h2>
        <Divider dashed>
          <span className="block w-36 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
        </Divider>
        <div className='max-w-screen-xl flex justify-center mx-auto p-[2px] md:p-2'>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col"
                style={{ width: `200px`, height: `350px` }} // Match dimensions of ProductCard
              >
                {/* Skeleton for Image */}
                <Skeleton.Input
                  active
                  className="w-full h-[100%] rounded-t-md"
                />

                {/* Skeleton for Title and Price */}
                <div className="p-2 flex flex-col gap-2 border-t border-neutral-200">
                  <Skeleton.Input active className="w-full h-4 mb-4" />

                  {/* Skeleton for Button */}
                  <div className='flex flex-row justify-between'>
                    <Skeleton.Button active className="w-full h-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log('isLoading', isLoading)
  // console.log('refetch', refetch)

  return (
    <div className="container mx-auto">
      <h2 className="text-xl text-center font-bold -mb-2 relative">
        Best Sellers
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
          .filter((product) => product.property === 'featured')
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

export default BestSellers;