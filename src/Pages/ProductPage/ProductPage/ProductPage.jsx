import { useState, useRef, useEffect } from 'react';
import { NavLink, useLoaderData, useLocation, useParams } from 'react-router-dom';
import Breadcrumbs from '../BreadCrumbs/BreadCrumbs';
import ProductAccordion from '../ProductAccordion/ProductAccordion';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductGallery from '../ProductGallery/ProductGallery';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { PiSquaresFour } from 'react-icons/pi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useItem from '../../../Hooks/useItems';
import { Helmet } from 'react-helmet-async';
import ReactPixel from 'react-facebook-pixel';


const ProductPage = () => {
    const product = useLoaderData();
    // const  { name, _id } = product;
    // console.log(name, _id)
    const { state } = useLocation();
    const { productSlug } = useParams();
    const [activeKey, setActiveKey] = useState(null);
    const descriptionPanelRef = useRef(null);

    const [items, refetch, isLoading, isError, error] = useItem();

    // const product = state?.product || items.find(item => item.slug === productSlug) || {};

    useEffect(() => {
        ReactPixel.track('ViewContent', {
            content_name: product.name,
            content_ids: [product._id],
            content_type: 'product',
            value: product.price,
            currency: 'BDT',
        });
    }, [product]);


    useEffect(() => {
        window.scrollTo(0, 0);
        if (!state && !product.name && !isLoading) {
            refetch();
        }
    }, [productSlug, state, product, isLoading, refetch]);

    if (isLoading) {
        return (
            <div className="mx-auto mt-9 lg:mt-8 mb-8 py-8">
                <div className="bg-gray-100 mx-auto flex justify-between px-6 lg:px-20 py-2 lg:py-4">
                    <Skeleton width={150} height={30} />
                    <Skeleton circle width={30} height={30} />
                </div>
                <div className="max-w-screen-xl px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
                        <div className="lg:w-1/2">
                            <Skeleton height={400} />
                        </div>
                        <div className="lg:w-1/2 mt-2 lg:mt-0 flex flex-col lg:pr-8">
                            <Skeleton height={40} width="80%" />
                            <Skeleton count={3} height={20} style={{ marginTop: '1rem' }} />
                            <Skeleton height={200} style={{ marginTop: '2rem' }} />
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 mx-auto mt-8">
                    <Skeleton height={40} width="50%" />
                    <Skeleton height={300} style={{ marginTop: '1rem' }} />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto mt-9 lg:mt-8 mb-8 py-8">
                <div className="bg-gray-100 mx-auto flex justify-between px-6 lg:px-20 py-2 lg:py-4">
                    <Skeleton width={150} height={30} />
                    <Skeleton circle width={30} height={30} />
                </div>
                <div className="max-w-screen-xl px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
                        <div className="lg:w-1/2">
                            <Skeleton height={400} />
                        </div>
                        <div className="lg:w-1/2 mt-2 lg:mt-0 flex flex-col lg:pr-8">
                            <Skeleton height={40} width="80%" />
                            <Skeleton count={3} height={20} style={{ marginTop: '1rem' }} />
                            <Skeleton height={200} style={{ marginTop: '2rem' }} />
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 mx-auto mt-8">
                    <Skeleton height={40} width="50%" />
                    <Skeleton height={300} style={{ marginTop: '1rem' }} />
                </div>
            </div>
        );
    }

    if (!product.name) {
        return (
            <div className="mx-auto mt-9 lg:mt-8 mb-8 py-8">
                <div className="bg-gray-100 mx-auto flex justify-between px-6 lg:px-20 py-2 lg:py-4">
                    <Skeleton width={150} height={30} />
                    <Skeleton circle width={30} height={30} />
                </div>
                <div className="max-w-screen-xl px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
                        <div className="lg:w-1/2">
                            <Skeleton height={400} />
                        </div>
                        <div className="lg:w-1/2 mt-2 lg:mt-0 flex flex-col lg:pr-8">
                            <Skeleton height={40} width="80%" />
                            <Skeleton count={3} height={20} style={{ marginTop: '1rem' }} />
                            <Skeleton height={200} style={{ marginTop: '2rem' }} />
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 mx-auto mt-8">
                    <Skeleton height={40} width="50%" />
                    <Skeleton height={300} style={{ marginTop: '1rem' }} />
                </div>
            </div>
        );
    }

    const handleReadMoreClick = () => {
        descriptionPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveKey('1');
    };

    return (
        <div className="w-full mx-auto mt-9 lg:mt-8 mb-8 py-8">

            {/* Dynamic Metadata */}
            <Helmet>
                <title>{product.name} | KhushbuWaala</title>
                <meta name="description" content={product.description || 'Premium product available at KhushbuWaala.'} />
                <meta name="keywords" content={`${product.name}, KhushbuWaala, Perfume, Attars, Fragrance`} />
                <link rel="canonical" href={`https://khushbuwaala.com/product/${productSlug}`} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={`${product.name} | KhushbuWaala`} />
                <meta property="og:description" content={product.description || 'Premium product available at KhushbuWaala.'} />
                <meta property="og:image" content={product.imageUrl || 'https://khushbuwaala.com/assets/n11.png'} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={`https://khushbuwaala.com/product/${productSlug}`} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:title" content={`${product.name} | KhushbuWaala`} />
                <meta name="twitter:description" content={product.description || 'Premium product available at KhushbuWaala.'} />
                <meta name="twitter:image" content={product.imageUrl || 'https://khushbuwaala.com/assets/n11.png'} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="bg-gray-100 mx-auto flex justify-between px-6 lg:px-20 py-2 lg:py-4">
                <Breadcrumbs product={product} />
                <NavLink to="/shop">
                    <PiSquaresFour size={24} cursor="pointer" />
                </NavLink>
            </div>
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
                    <div className="lg:w-1/2">
                        <ProductGallery product={product} />
                    </div>
                    <div className="mt-2 lg:mt-0 lg:w-1/2 flex flex-col lg:pr-8">
                        <ProductDetails product={product} onReadMore={handleReadMoreClick} />
                        <ProductAccordion
                            product={product}
                            activeKey={activeKey}
                            setActiveKey={setActiveKey}
                            descriptionPanelRef={descriptionPanelRef}
                        />
                    </div>
                </div>
            </div>
            <div>
                <RelatedProduct product={product} />
            </div>
        </div>
    );
};

export default ProductPage;