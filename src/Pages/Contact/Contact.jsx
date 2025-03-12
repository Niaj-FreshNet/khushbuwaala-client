import React from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
    const pageTitle = "Contact Us | KhushbuWaala - Get in Touch";
    const pageDescription =
        "Reach out to KhushbuWaala for assistance. Whether you need support or have inquiries, we are here to help you. Contact us via phone, email, or visit our office in Dhaka.";
    const pageKeywords = "contact us, KhushbuWaala, Khushbuwala, Khushbu Wala, Khushbu Waala, Khushboowala, Khushboo, Khushbu, customer support, perfume inquiries, contact KhushbuWaala, Dhaka office, customer service";

    return (
        <div className="max-w-screen-2xl mx-auto bg-white mt-9 lg:mt-8 py-8">
            {/* SEO Metadata */}
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://khushbuwaala.com/contact" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <link rel="canonical" href="https://khushbuwaala.com/contact" />
            </Helmet>

            {/* Contact Page Header */}
            <div className="bg-black flex justify-center items-center py-0 mb-8">
                <h2 className="text-2xl pt-2 font-bold text-white text-center">Contact Us</h2>
            </div>

            <div className="max-w-screen-md mx-auto p-4 lg:px-6 py-8">
                <div className="p-6 rounded-md shadow-sm bg-gray-50">
                    <h3 className="text-md font-semibold my-2">Contact Us:</h3>
                    <p className="text-sm mb-4">
                        Please contact us for all kinds of assistance. We are available every day from 10:00 AM to 10:00 PM.
                    </p>

                    {/* Service Center Hotline */}
                    <div className="mb-4">
                        <h3 className="text-md font-semibold mb-2">Call Us:</h3>
                        <a href="tel:+8801566395807" className="text-blue-500 text-sm">
                            +8801566-395807
                        </a>
                    </div>

                    {/* Service Center Email */}
                    <div className="mb-4">
                        <h3 className="text-md font-semibold mb-2">Email Us:</h3>
                        <a href="mailto:khushbuwaala@gmail.com" className="text-blue-500 text-sm">
                            khushbuwaala@gmail.com
                        </a>
                    </div>

                    {/* Office Address */}
                    <div>
                        <h3 className="text-md font-semibold mb-2">Our Office:</h3>
                        <p className="text-sm">
                            E-2 (4th Floor), House: 13, Road: 10 <br /> Block: D, Banasree, Rampura, Dhaka-1219.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;