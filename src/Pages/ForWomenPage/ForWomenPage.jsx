import Notice from "../../Components/Notice/Notice";
import ShopBanner from "../../Components/ShopBanner/ShopBanner";
import CategoryWiseProducts from "../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";
import { Helmet } from "react-helmet-async";
import BannerDesktop from "../../assets/nFF.webp";
import BannerMobile from "../../assets/nF.webp";

const ForWomenPage = () => {
    const pageTitle = "Perfume Oils for Women - Premium Fragrances | KhushbuWaala";
    const pageDescription =
        "Explore premium perfume oils and attar collections for women at KhushbuWaala. Find your ideal fragrance from our exquisite Oriental & Arabian attar selection. Free shipping on orders over 1000 BDT!";
    const pageKeywords =
        "women's perfume oils, oriental attar for women, arabian attar for women, premium fragrance oils, attar for women, KhushbuWaala perfumes, women's fragrance collection";
    const bannerImage = "https://khushbuwaala.com/assets/nFF.png"; // Replace with hosted image URL

    const filtrationKeywords = ["female", "all"];

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
                <meta property="og:url" content="https://khushbuwaala.com/womens-perfume" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/womens-perfume" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="Premium Fragrances Suit For Women"
                    text="Choose Your Desired Perfume Oil from Oriental & Arabian Attar Collections"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="Womens Perfume Oil"
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
                    <CategoryWiseProducts filtrationKeyword={filtrationKeywords} />
                </div>
            </div>
        </div>
    );
};

export default ForWomenPage;