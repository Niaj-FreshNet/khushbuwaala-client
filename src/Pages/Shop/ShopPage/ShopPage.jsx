import Notice from "../../../Components/Notice/Notice";
import ShopBanner from "../../../Components/ShopBanner/ShopBanner";
import ShopProducts from "../ShopProducts/ShopProducts";
import BannerDesktop from "../../../assets/n111.webp";
import BannerMobile from "../../../assets/n1.webp";
import { Helmet } from "react-helmet-async";


const ShopPage = () => {
    const pageTitle = "Shop - Best Quality Perfume Oil Collection | KhushbuWaala";
    const pageDescription =
        "Explore KhushbuWaala's collection of world-class perfume oils. Free nationwide shipping on orders over 1000 BDT. Up to 50% off!";
    const pageKeywords = "perfume oil, fragrance, best perfume oils, KhushbuWaala, shop perfume online";
    const bannerImage = "https://khushbuwaala.com/assets/n111.png"; // Replace with the hosted image URL

    return (
        <div className="w-full mx-auto">
            {/* SEO Metadata */}
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={bannerImage} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://khushbuwaala.com/shop" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/shop" />
            </Helmet>

            {/* Page Content */}
            <div>
                <ShopBanner
                    heading={'Best Quality Perfume Oil Collection'}
                    text={'Choose Your Desired Perfume Oil from Worlds Best Perfume Oil Collection'}
                    button={'Shop Now'}
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                    altText="Banner displaying the best quality perfume oil collection"
                />
            </div>
            <div className='pt-6 pb-1 bg-gray-50'>
                <Notice
                    heading="World's Best Perfume Oils"
                    notices={['Free Nationwide Shipping on Orders Over 1000 BDT.', 'Up to 50% Off!', 'Alter Your Attire Effortlessly at KhushbuWaala Banasree Outlet']}
                    interval={4000}
                />
            </div>
            <div className='bg-white'>
                <div className='lg:px-4 pb-8 mx-auto'>
                    <ShopProducts />
                </div>
            </div>
        </div>
    );
};

export default ShopPage;