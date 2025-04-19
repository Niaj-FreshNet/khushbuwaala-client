import Notice from "../../Components/Notice/Notice";
import ShopBanner from "../../Components/ShopBanner/ShopBanner";
import BannerDesktop from "../../assets/n111.webp";
import BannerMobile from "../../assets/n1.webp";
import CategoryWiseProducts from "../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";
import { Helmet } from "react-helmet-async";

const InspiredPerfumeOilPage = () => {
    const pageTitle = "Inspired Perfume Oils - Unique Fragrances | KhushbuWaala";
    const pageDescription =
        "Discover KhushbuWaala's exclusive range of inspired perfume oils, crafted to bring you the essence of luxury. Free nationwide shipping and discounts available.";
    const pageKeywords =
        "inspired perfume oils, unique fragrances, KhushbuWaala, shop inspired scents, high-quality perfumes";
    const bannerImage = "https://khushbuwaala.com/assets/n111.png"; // Replace with hosted image URL

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
                <meta property="og:url" content="https://khushbuwaala.com/inspired-perfume-oils" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/inspired-perfume-oils" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="Explore Inspired Perfume Oils"
                    text="Choose Your Desired Perfume Oil from Inspired Perfume Oil Collections"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                    altText="Banner displaying inspired perfume oil collection"
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="Inspired Perfume Oils"
                    notices={[
                        "Free Nationwide Shipping on Orders Over 1000 BDT.",
                        "Up to 50% Off!",
                        "Alter Your Attire Effortlessly at KhushbuWaala Banasree Outlet",
                    ]}
                    interval={4000}
                />
            </div>
            <div className="bg-white">
                <div className="max-w-screen-2xl lg:px-4 pb-8 mx-auto">
                    <CategoryWiseProducts filtrationKeyword="inspiredPerfumeOil" />
                </div>
            </div>
        </div>
    );
};

export default InspiredPerfumeOilPage;