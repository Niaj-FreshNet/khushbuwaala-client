import React, { useRef, useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const ProductGallery = ({ product }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const thumbsRef = useRef(null);
    const firstThumbRef = useRef(null);
    const lastThumbRef = useRef(null);
    const [firstThumbVisible, setFirstThumbVisible] = useState(false);
    const [lastThumbVisible, setLastThumbVisible] = useState(false);

    const images = [
        ...(product?.primaryImage ? [product.primaryImage] : []),
        ...(product?.secondaryImage ? [product.secondaryImage] : []),
        ...(product?.moreImages || []),
    ];

    useEffect(() => {
        // console.log('Images array:', images); // Debugging to see the images array
        const options = {
            root: thumbsRef.current,
            threshold: 1.0,
        };

        const firstObserver = new IntersectionObserver(([entry]) => {
            setFirstThumbVisible(entry.isIntersecting);
        }, options);

        const lastObserver = new IntersectionObserver(([entry]) => {
            setLastThumbVisible(entry.isIntersecting);
        }, options);

        if (firstThumbRef.current) {
            firstObserver.observe(firstThumbRef.current);
        }

        if (lastThumbRef.current) {
            lastObserver.observe(lastThumbRef.current);
        }

        return () => {
            if (firstThumbRef.current) {
                firstObserver.unobserve(firstThumbRef.current);
            }
            if (lastThumbRef.current) {
                lastObserver.unobserve(lastThumbRef.current);
            }
        };
    }, [thumbsRef, images]);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const onNext = () => {
        if (activeIndex < images.length - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1);
        }
    };

    const onPrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1);
        }
    };
    // console.log(images)
    // console.log(images.length)
    images.map((image, index) => {
        // console.log(`Image ${index}:`, image);
    });

    if (images.length === 0) {
        return <p>No images available.</p>;
    }

    return (
        <div className="relative flex flex-col w-full max-h-[600px] aspect-[4/4]">
            {/* Active Image Display */}
            <div className="w-full h-full mb-2">
                <img
                    src={images[activeIndex]} // Directly using image URL
                    alt={product?.name}
                    className="absolute object-cover w-full h-full rounded-lg shadow-lg"
                />
            </div>

            {/* Thumbnails Scrollable */}
            <div
                ref={thumbsRef}
                className="overflow-x-auto flex scrollbar-hide"
            >
                {!firstThumbVisible && (
                    <button
                        onClick={onPrevious}
                        className="absolute top-4 left-0 z-10 rounded-full bg-white"
                        disabled={activeIndex === 0}
                    >
                        <BiChevronLeft />
                    </button>
                )}
                    {!lastThumbVisible && (
                        <button
                            onClick={onNext}
                            className="absolute top-4 right-0 z-10 rounded-full bg-white"
                            disabled={activeIndex === images.length - 1}
                        >
                            <BiChevronRight />
                        </button>
                    )}
                <div className="flex lg:flex-row items-center lg:items-start">
                    {images.map((image, index) => (
                        <button
                            key={`thumbnail-${index}`}
                            ref={index === 0 ? firstThumbRef : index === images.length - 1 ? lastThumbRef : null}
                            type="button"
                            aria-current={activeIndex === index ? 'true' : 'false'}
                            className={`relative pb-1 pt-1 cursor-pointer ${activeIndex === index ? 'border-b-4 border-primary-700' : 'border-transparent'}`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <img
                                src={image} // Directly using image URL
                                alt={`Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
