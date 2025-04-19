import Notice from "../../Components/Notice/Notice";
import ShopBanner from "../../Components/ShopBanner/ShopBanner";
import CategoryWiseProducts from "../CategoryWise/CategoryWiseProducts/CategoryWiseProducts";
import { Helmet } from "react-helmet-async";
import BannerDesktop from "../../assets/n4.webp";
import BannerMobile from "../../assets/n4.webp";

const NaturalPage = () => {
    const pageTitle = "Natural & Authentic Attar - Premium Fragrance Oils | KhushbuWaala";
    const pageDescription =
        "Explore KhushbuWaala's exclusive collection of natural and authentic attar. Shop the finest quality perfumes made from pure, natural ingredients. Enjoy free shipping and amazing discounts.";
    const pageKeywords =
        "natural attar, authentic attar, premium attar, natural fragrance oils, KhushbuWaala, perfume oils, pure attar collection";
    const bannerImage = "https://khushbuwaala.com/assets/n4.png"; // Replace with hosted image URL

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
                <meta property="og:url" content="https://khushbuwaala.com/natural-attar" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={bannerImage} />
                <link rel="canonical" href="https://khushbuwaala.com/natural-attar" />
            </Helmet>

            {/* Page Content */}
            <div className="max-w-screen-2xl mx-auto">
                <ShopBanner
                    heading="Explore Natural and Authentic Attar"
                    text="Choose The Best Quality Natural & Authentic Attar"
                    button="Shop Now"
                    bannerDesktop={BannerDesktop}
                    bannerMobile={BannerMobile}
                />
            </div>
            <div className="max-w-screen-2xl mx-auto pt-6 pb-1 bg-gray-50">
                <Notice
                    heading="Natural Attar"
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
                    <CategoryWiseProducts filtrationKeyword="natural" />
                </div>
            </div>
        </div>
    );
};

export default NaturalPage;