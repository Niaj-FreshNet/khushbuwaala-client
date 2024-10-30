import React from 'react';
import CarouselSlider from '../CarouselSlider/CarouselSlider';
import Category from '../Category/Category';
import ShowCase from '../ShowCase/ShowCase';
import Services from '../Services/Services';
import Reviews from '../Reviews/Reviews';
import Subscribe from '../Subscribe/Subscribe';
import Banner from '../../../Components/Banner/Banner';
import BestSellers from '../BestSellers/BestSellers';
import InspiredPerfumeProduct from '../ProductSlide/InspiredPerfumeProduct';
import OrientalProduct from '../ProductSlide/OrientalProduct';
import OudProduct from '../ProductSlide/OudProduct';

const HomePage = () => {
    return (
        <div className='w-full mx-auto'>
            <div className='max-w-screen-2xl mx-auto'>
                <CarouselSlider />
            </div>
            <div className='bg-gray-50 pt-8 pb-12'>
                <div className='max-w-screen-xl px-1 mx-auto'>
                    <BestSellers />
                </div>
            </div>
            <div className='max-w-screen-2xl mx-auto mb-0'>
                <Banner
                    heading={'Lead Corporate with Inspired Perfume Oil Collection'}
                    text={'Get the most luxurious fragrances at exclusive prices. Limited time offer!'}
                    button={'Shop Now'} />
            </div>
            <div className='px-1 mt-1 mb-1'>
                <Category />
            </div>
            <div className='max-w-screen-2xl mx-auto mb-0'>
                <Banner
                    heading={'Lead Corporate with Inspired Perfume Oil Collection'}
                    text={'Get the most luxurious fragrances at exclusive prices. Limited time offer!'}
                    button={'Shop Now'} />
            </div>
            <div className='bg-gray-50 pt-8 pb-12'>
                <div className='max-w-screen-xl px-1 mx-auto'>
                    <InspiredPerfumeProduct />
                </div>
            </div>
            <div className='max-w-screen-2xl mx-auto mb-0'>
                <Banner
                    heading={'Feel the Arabian Fragrances'}
                    text={'Get the most luxurious fragrances at exclusive prices. Limited time offer!'}
                    button={'Shop Now'} />
            </div>
            <div className='bg-gray-50 pt-8 pb-12'>
                <div className='max-w-screen-xl px-1 mx-auto'>
                    <OrientalProduct />
                </div>
            </div>
            <div className='max-w-screen-2xl mx-auto mb-0'>
                <Banner
                    heading={'Sniff Our Precious and Royal Oud Collection'}
                    text={'Get the most luxurious fragrances at exclusive prices. Limited time offer!'}
                    button={'Shop Now'} />
            </div>
            <div className='bg-gray-50 pt-8 pb-12'>
                <div className='max-w-screen-xl px-1 mx-auto'>
                    <OudProduct />
                </div>
            </div>
            <div className='my-8'>
                <Reviews />
            </div>
            <div className='max-w-screen-2xl mx-auto my-8'>
                <Services />
            </div>
            <div className='my-8'>
                <ShowCase />
            </div>
            <div className='my-8'>
                <Subscribe />
            </div>
        </div>
    );
};

export default HomePage;