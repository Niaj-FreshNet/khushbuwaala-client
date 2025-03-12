import Notice from "../../../Components/Notice/Notice";
import ShopBanner from "../../../Components/ShopBanner/ShopBanner";
import CategoryWiseProducts from "../../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";
import { Helmet } from "react-helmet-async";
import BannerDesktop from "../../../assets/banner1.webp";
import BannerMobile from "../../../assets/banner2.webp";

const NewInPage = () => {
    const pageTitle = "New Arrival Perfume Oils - Latest Editions | KhushbuWaala";
    const pageDescription =
        "Explore KhushbuWaala's latest perfume oil arrivals. Shop new collections and elevate your fragrance game. Enjoy free nationwide shipping and exclusive discounts.";
    const pageKeywords =
        "new arrivals, latest perfume oils, fragrance collection, new perfume editions, KhushbuWaala, premium perfume oils";
    const bannerImage = "https://khushbuwaala.com/assets/banner1.png"; // Replace with hosted image URL

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
                <meta property="og:url" content="https://khushbuwaala.com/new-arrivals" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/new-arrivals" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="Get The Latest Perfume Oil Editions"
                    text="Choose Your Desired Perfume Oil from New Arrivals"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                    altText="Banner displaying the best quality perfume oil collection"
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="New Arrival"
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
                    <CategoryWiseProducts filtrationKeyword="newArrival" />
                </div>
            </div>
        </div>
    );
};

export default NewInPage;