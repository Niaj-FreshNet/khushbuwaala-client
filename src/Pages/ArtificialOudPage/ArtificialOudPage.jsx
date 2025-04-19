import Notice from "../../Components/Notice/Notice";
import ShopBanner from "../../Components/ShopBanner/ShopBanner";
import BannerDesktop from "../../assets/n31.webp";
import BannerMobile from "../../assets/n3.webp";
import CategoryWiseProducts from "../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";
import { Helmet } from "react-helmet-async";

const ArtficialOudPage = () => {
    const pageTitle = "Artificial Oud Perfume Oils - Royal Fragrance Collection | KhushbuWaala";
    const pageDescription =
        "Discover KhushbuWaala's Artificial Oud Collection. Royal fragrances crafted for a luxurious scent experience. Free nationwide shipping and exclusive discounts available.";
    const pageKeywords =
        "artificial oud, oud oils, royal fragrances, artificial oud perfume, KhushbuWaala, premium oud collection, shop oud oils";
    const bannerImage = "https://khushbuwaala.com/assets/n31.png"; // Replace with hosted image URL

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
                <meta property="og:url" content="https://khushbuwaala.com/artificial-oud" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/artificial-oud" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="The Best Artificial Editions Of Oud Oils"
                    text="Choose The Royal Fragrances From Artificial Oud Collection"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                    altText="Banner displaying the best quality perfume oil collection"
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="Artificial Oud"
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
                    <CategoryWiseProducts filtrationKeyword="artificialOud" />
                </div>
            </div>
        </div>
    );
};

export default ArtficialOudPage;