// import BasicBanner from "../../Home/Banners/BasicBanner";
// import BestSellers from "../../Home/BestSellers/BestSellers";
// import CarouselSlider from "../../../Home/CarouselSlider/CarouselSlider";
// import Category from "../../../Home/Category/Category";
import Notice from "../../../Components/Notice/Notice";
import ShopBanner from "../../../Components/ShopBanner/ShopBanner";
import ShopProducts from "../ShopProducts/ShopProducts";


const ShopPage = () => {
    return (
        <div className='w-full mx-auto'>
            <div className='max-w-screen-2xl mx-auto'>
                <ShopBanner
                    heading={'Lead Corporate with Inspired Perfume Oil Collection'}
                    text={'Lead Corporate with Inspired'}
                    button={'Shop Now'}
                />
            </div>
            <div className='max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50'>
                <Notice
                    heading="New Arrivals"
                    notices={['Free Nationwide Shipping on Orders Over 1000 BDT.', 'Up to 50% Off!', 'Alter Your Attire Effortlessly at KhushbuWaala Banasree Outlet']}
                    interval={4000}
                />
            </div>
            <div className='bg-white'>
                <div className='max-w-screen-2xl lg:px-4 pb-8 mx-auto'>
                    <ShopProducts />
                </div>
            </div>
        </div>
    );
};

export default ShopPage;