import React, { useState } from 'react';
import { Button, Collapse, Input, Rate, Tag } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const { Panel } = Collapse;

const ProductAccordion = ({ product, activeKey, setActiveKey, descriptionPanelRef }) => {

    const [reviewName, setReviewName] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const handlePanelChange = (key) => {
        setActiveKey(key);
    };

    // Custom header to include both the existing arrow and the +/-
    // Ensure activeKey is initialized properly
    const renderHeader = (key, title) => {
        // Ensure activeKey is defined
        const isActive = Array.isArray(activeKey) ? activeKey.includes(key) : activeKey === key;

        return (
            <div className="flex justify-between items-center">
                <span>{title}</span>
                <span>{isActive ? <MinusOutlined /> : <PlusOutlined />}</span>
            </div>
        );
    };

    const categoryMapping = {
        inspiredPerfumeOil: "Inspired Perfume Oil",
        oriental: "Oriental",
        artificialOud: "Artificial Oud",
        natural: "Natural",
        semiOrganic: "Semi-Organic",
        organic: "Organic",
        brand: "Brand",
        giftsAndPackages: "Gifts and Packages",
    };

    const handleMessengerClick = (e) => {
        e.preventDefault();
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const messengerUrl = 'https://m.me/111483794112905';

        if (isMobile) {
            // Try to open the Messenger app if installed
            window.location.href = 'fb-messenger://user-thread/111483794112905';
        } else {
            // Open in a new tab for desktop users
            window.open(messengerUrl, '_blank', 'noopener noreferrer');
        }
    };

    const handleReviewSubmit = () => {
        if (!reviewName || !reviewComment || reviewRating === 0) {
            alert('Please fill out all fields before submitting your review.');
            return;
        }

        // Simulate submission logic (replace with actual API call)
        // console.log({
        //     name: reviewName,
        //     comment: reviewComment,
        //     rating: reviewRating,
        // });

        // Clear form fields
        setReviewName('');
        setReviewComment('');
        setReviewRating(0);

        alert('Thank you for your review!');
    };

    return (
        <>
            <Collapse
                className="mt-4"
                activeKey={activeKey}
                onChange={handlePanelChange}
            >
                <Panel
                    header={<span style={{ fontWeight: 'bold' }}>{renderHeader("1", "Perfume Description")}</span>} // Apply bold style here
                    key="1"
                    ref={descriptionPanelRef}
                >
                    <span className=''>
                        <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
                        <p className='whitespace-pre-line'><span className='whitespace-pre-line font-semibold text-sm text-gray-500'>Fragrance Notes: <br /></span>{product.notes}</p>
                        {/* <p><span className='font-semibold text-sm text-gray-500'>Ingredients:</span>{product.note}</p> */}
                        {/* <p><span className='font-semibold text-sm text-gray-500'>Care:</span>{product.note}</p> */}
                    </span>
                </Panel>
                <Panel
                    header={<span style={{ fontWeight: 'bold' }}>{renderHeader("2", "Customer Reviews")}</span>} // Apply bold style here
                    key="2"
                >
                    {product.reviews && product.reviews?.length > 0 ? (
                        <div>
                            {product.reviews.map((review, index) => (
                                <div key={index} className="mb-4 border-b pb-2">
                                    <div className="flex justify-between items-center">
                                        <strong>{review.name}</strong>
                                        <Rate disabled defaultValue={review.rating} />
                                    </div>
                                    <p className="text-gray-600 text-sm">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet. Be the first to review this product!</p>
                    )}
                    <div className="mt-4">
                        <h4>Add Your Review</h4>
                        <Input
                            placeholder="Your Name"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="mb-2"
                        />
                        <Rate
                            className="mb-2"
                            value={reviewRating}
                            onChange={(value) => setReviewRating(value)}
                        />
                        <TextArea
                            rows={4}
                            placeholder="Write your review..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="mb-2"
                        />
                        <Button disabled type="primary" onClick={handleReviewSubmit}>
                            Submit Review
                        </Button>
                    </div>
                </Panel>
            </Collapse>

            {/* SKU, Category, and Smells */}
            <div className="text-xs text-black mt-6">
                <p>SKU: <span className='text-gray-600'>{product.sku}</span></p>
                <p>Category: <span className='text-gray-600'>{categoryMapping[product.category] || product.category}</span></p>
                <div className="mt-2">
                    <span className="font-semibold">Fragrances: </span>
                    {product.smell && product.smell.length > 0 ? (
                        product.smell.map((smell, index) => (
                            <Tag color="blue" key={index} className="m-1">
                                {smell}
                            </Tag>
                        ))
                    ) : (
                        <span>No smells defined</span>
                    )}
                </div>
            </div>

            {/* Ask a Question */}
            <div className="text-sm mt-4">
                <Button onClick={handleMessengerClick} className="text-red-600 border-red-400">Ask a Question</Button>
            </div>
        </>
    );
};

export default ProductAccordion;