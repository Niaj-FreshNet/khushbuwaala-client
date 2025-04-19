import Notice from "../../Components/Notice/Notice";
import ShopBanner from "../../Components/ShopBanner/ShopBanner";
import { Helmet } from "react-helmet-async";
import BannerDesktop from "../../assets/nG.jpg";
import BannerMobile from "../../assets/nG.jpg";
import CategoryWiseProducts from "../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";

const GiftsAndPackagesPage = () => {
    const pageTitle = "Perfume Packages and Gift Boxes - Fragrance Gifts | KhushbuWaala";
    const pageDescription =
        "Explore our exclusive perfume oil packages and gift boxes. Perfect for gifting, these seasonal packages are the ideal choice for loved ones. Free nationwide shipping on orders over 1000 BDT.";
    const pageKeywords =
        "perfume gift boxes, perfume packages, fragrance gifts, seasonal gift packages, KhushbuWaala gifts, gift sets, perfume oils gift packs";
    const bannerImage = "https://khushbuwaala.com/assets/nG.png"; // Replace with hosted image URL

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
                <meta property="og:url" content="https://khushbuwaala.com/gifts-and-packages" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/gifts-and-packages" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="Perfume Packages and Gift Boxes"
                    text="Choose Your Desired Perfume Oil Packages and Gifts for The Season"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="Gifts & Packages"
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
                    <CategoryWiseProducts filtrationKeyword="giftsAndPackages" />
                </div>
            </div>
        </div>
    );
};

export default GiftsAndPackagesPage;