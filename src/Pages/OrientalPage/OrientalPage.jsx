import Notice from "../../Components/Notice/Notice";
import ShopBanner from "../../Components/ShopBanner/ShopBanner";
import BannerDesktop from "../../assets/n21.webp";
import BannerMobile from "../../assets/n2.webp";
import CategoryWiseProducts from "../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";
import { Helmet } from "react-helmet-async";

const OrientalPage = () => {
    const pageTitle = "Oriental Fragrances - Arabian Attar Collection | KhushbuWaala";
    const pageDescription =
        "Dive into KhushbuWaala's Oriental and Arabian attar collection. Exquisite perfume oils designed to captivate your senses. Free nationwide shipping and discounts available.";
    const pageKeywords =
        "oriental fragrances, arabian attar, oriental perfume oils, KhushbuWaala, shop oriental scents, Arabian attar collection";
    const bannerImage = "https://khushbuwaala.com/assets/n21.png"; // Replace with hosted image URL

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
                <meta property="og:url" content="https://khushbuwaala.com/oriental-fragrances" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/oriental-fragrances" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="Explore Oriental Fragrances"
                    text="Choose Your Desired Perfume Oil from Oriental & Arabian Attar Collections"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                    altText="Banner displaying the best quality perfume oil collection"
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="Oriental & Arabian Attar"
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
                    <CategoryWiseProducts filtrationKeyword="oriental" />
                </div>
            </div>
        </div>
    );
};

export default OrientalPage;