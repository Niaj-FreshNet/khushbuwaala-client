import CarouselSlider from '../CarouselSlider/CarouselSlider';
import Category from '../Category/Category';
// import ShowCase from '../ShowCase/ShowCase';
import Services from '../Services/Services';
import Reviews from '../Reviews/Reviews';
import Subscribe from '../Subscribe/Subscribe';
import Banner from '../../../Components/Banner/Banner';
import BestSellers from '../BestSellers/BestSellers';
import InspiredPerfumeProduct from '../ProductSlide/InspiredPerfumeProduct';
import OrientalProduct from '../ProductSlide/OrientalProduct';
import OudProduct from '../ProductSlide/OudProduct';
import InspiredBannerDesktop from "../../../assets/n11.webp";
import InspiredBannerMobile from "../../../assets/n1.webp";
import OrientalBannerDesktop from "../../../assets/n2.webp";
import OrientalBannerMobile from "../../../assets/n21.webp";
import OudBannerDesktop from "../../../assets/n3.webp";
import OudBannerMobile from "../../../assets/n31.webp";

const HomePage = () => {
    return (
        <div className='w-full mx-auto'>
            <div className=''>
                <CarouselSlider />
            </div>
            <div className='bg-gray-50 pt-6 pb-14'>
                <div className='max-w-screen-xl px-2 mx-auto'>
                    <BestSellers />
                </div>
            </div>
            <div className='w-full mx-auto'>
                <Category />
            </div>
            <div className='mx-auto mb-0'>
                <Banner
                    heading={'Premium Inspired Perfume Oils'}
                    text={'Get The Best Perfume Oil Editions Inspired From Designer Perfumes'}
                    button={'Shop Now'}
                    CategoryLink="/inspired-perfume-oil"
                    bannerMobile={InspiredBannerMobile}
                    bannerDesktop={InspiredBannerDesktop}
                />
            </div>
            <div className='bg-gray-50 pt-6 pb-14'>
                <div className='max-w-screen-xl px-2 mx-auto'>
                    <InspiredPerfumeProduct />
                </div>
            </div>
            <div className='mx-auto mb-0'>
                <Banner
                    heading={'Explore Oriental Fragrances'}
                    text={'Choose Your Desired Perfume Oil from Oriental & Arabian Attar Collections'}
                    button={'Shop Now'}
                    CategoryLink="/oriental-attar"
                    bannerDesktop={OrientalBannerDesktop}
                    bannerMobile={OrientalBannerMobile}
                />
            </div>
            <div className='bg-gray-50 pt-6 pb-14'>
                <div className='max-w-screen-xl px-2 mx-auto'>
                    <OrientalProduct />
                </div>
            </div>
            <div className='mx-auto mb-0'>
                <Banner
                    heading={'Best Artificial Editions Of Oud Oils'}
                    text={'Choose The Royal Fragrances From Artificial Oud Collection'}
                    button={'Shop Now'}
                    CategoryLink="/artificial-oud"
                    bannerDesktop={OudBannerDesktop}
                    bannerMobile={OudBannerMobile}
                />
            </div>
            <div className='bg-gray-50 pt-6 pb-14'>
                <div className='max-w-screen-xl px-2 mx-auto'>
                    <OudProduct />
                </div>
            </div>
            <div className='px-2 mx-auto my-8'>
                <Services />
            </div>
            <div className='my-8'>
                <Reviews />
            </div>
            <div className='my-8'>
                <Subscribe />
            </div>
            {/* <div className='mx-auto mb-0'>
                <Banner
                    heading={'Lead Corporate with Inspired Perfume Oil Collection'}
                    text={'Get the most luxurious fragrances at exclusive prices. Limited time offer!'}
                    button={'Shop Now'} 
                    bannerMobile={BannerMobile}
                    bannerDesktop={BannerDesktop}
                    />
            </div> */}
            {/* <div className='my-8'>
                <ShowCase />
            </div> */}
        </div>
    );
};

export default HomePage;