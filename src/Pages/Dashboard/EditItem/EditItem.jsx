import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload, InputNumber, Button, message, Radio, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { createStyles } from 'antd-style';
import useItems from '../../../Hooks/useItems';

const { TextArea } = Input;
const { Option } = Select;

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const EditItem = ({ visible, onClose, product, refetch }) => {
    const { styles } = useStyle();
    const [form] = Form.useForm();
    const axiosPublic = useAxiosPublic();
    const [items] = useItems();
    const [primaryImage, setPrimaryImage] = useState([]);
    const [secondaryImage, setSecondaryImage] = useState([]);
    const [moreImages, setMoreImages] = useState([]);
    const [measurement, setMeasurement] = useState(null);

    useEffect(() => {
        if (product) {
            const initialValues = {
                name: product.name,
                section: product.section,
                category: product.category,
                sku: product.sku,
                price: product.price,
                discount: product.discount,
                smell: product.smell,
                specification: product.specification,
                description: product.description,
                notes: product.notes,
                stock: product.stock,
                measurement: product.measurement,
                origin: product.origin,
                brand: product.brand,
                supplier: product.supplier,
                relatedProducts: product.relatedProducts,
                isFeatured: product.isFeatured === 'yes',
            };

            // Set variant prices based on measurement type
            if (product.measurement === 'ml') {
                mlOptions.forEach((size) => {
                    initialValues[`ml_${size}`] = product.variantPrices[`${size} ml`] || '';
                });
            } else if (product.measurement === 'gm') {
                gmOptions.forEach((size) => {
                    initialValues[`gm_${size}`] = product.variantPrices[`${size} gm`] || '';
                });
            } else if (product.measurement === 'piece') {
                pieceOptions.forEach((size) => {
                    initialValues[`piece${size}`] = product.variantPrices[`${size} piece`] || '';
                });
            }

            form.setFieldsValue(initialValues);

            setPrimaryImage(product.primaryImage ? [{ uid: '-1', url: product.primaryImage }] : []);
            setSecondaryImage(product.secondaryImage ? [{ uid: '-2', url: product.secondaryImage }] : []);
            setMoreImages(product.moreImages ? product.moreImages.map((url, index) => ({ uid: index.toString(), url })) : []);
        }
    }, [product, form]);

    const handleImageChange = (file, setImage) => {
        // setImage([file]);
        const reader = new FileReader();
        reader.onload = e => setImage([{ url: e.target.result, originFileObj: file }]);
        reader.readAsDataURL(file);
        return false; // Prevent automatic upload
    };

    const handleMultipleImageChange = ({ fileList }) => {
        setMoreImages(fileList.map(file => ({
            uid: file.uid, // Maintain original uid
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file.originFileObj) // Create a URL for preview
        })));
    };

    const handleRemoveImage = (file) => {
        // Safely remove the file based on uid
        setMoreImages(prev => prev.filter(img => img.uid !== file.uid));
    };

    const onFinish = async (values) => {
        message.loading({ content: 'Updating...', key: 'update' });

        try {
            const updateImage = async (imageFile) => {
                const formData = new FormData();
                formData.append('image', imageFile);
                try {
                    const res = await axiosPublic.post(image_hosting_api, formData, {
                        headers: { 'content-type': 'multipart/form-data' },
                    });
                    if (res.data.success) {
                        return res.data.data.display_url;
                    } else {
                        console.error('Image Upload Failed:', res.data);
                        throw new Error('Image upload failed');
                    }
                } catch (error) {
                    console.error('Error during image upload:', error);
                    throw error;
                }
            };            

            // Check if the primary image has changed
            const primaryImageUrl =
                primaryImage[0]?.originFileObj // New image uploaded
                    ? await updateImage(primaryImage[0].originFileObj)
                    : primaryImage[0]?.url === product.primaryImage // Image not changed
                        ? product.primaryImage
                        : primaryImage[0]?.url;

            console.log(primaryImageUrl)

            // Check if the secondary image has changed
            const secondaryImageUrl =
                secondaryImage[0]?.originFileObj // New image uploaded
                    ? await updateImage(secondaryImage[0].originFileObj)
                    : secondaryImage[0]?.url === product.secondaryImage // Image not changed
                        ? product.secondaryImage
                        : secondaryImage[0]?.url;

            // Check for changes in additional images
            const moreImageUrls = await Promise.all(
                moreImages.map((file, index) =>
                    file.originFileObj // New image uploaded
                        ? updateImage(file.originFileObj)
                        : file.url === product.moreImages?.[index] // Image not changed
                            ? product.moreImages[index]
                            : file.url
                )
            );

            console.log('Primary Image State:', primaryImage);
            console.log('Secondary Image State:', secondaryImage);


            // Collect variant prices
            let variantPrices = {};
            if (values.measurement === 'ml') {
                mlOptions.forEach(size => {
                    const price = values[`ml_${size}`];
                    if (price) {
                        variantPrices[`${size} ml`] = parseFloat(price);
                    }
                });
            } else if (values.measurement === 'gm') {
                gmOptions.forEach(size => {
                    const price = values[`gm_${size}`];
                    if (price) {
                        variantPrices[`${size} gm`] = parseFloat(price);
                    }
                });
            } else if (values.measurement === 'piece') {
                pieceOptions.forEach(size => {
                    const price = values[`piece${size}`];
                    if (price) {
                        variantPrices[`${size} piece`] = parseFloat(price);
                    }
                });
            }

            const updatedItem = {
                ...values,
                price: parseFloat(values.price),
                variantPrices: variantPrices,
                primaryImage: primaryImageUrl,
                secondaryImage: secondaryImageUrl,
                moreImages: moreImageUrls,
                isFeatured: values.isFeatured ? 'yes' : 'no',
            };

            console.log(updatedItem)

            const productRes = await axiosPublic.patch(`/item/${product._id}`, updatedItem);
            console.log(productRes)

            if (productRes.data.modifiedCount > 0) {
                message.success({ content: `${values.name} successfully updated!`, key: 'update', duration: 3 });
                onClose();
                refetch();  // Call refetch to update the parent component
            } else {
                throw new Error('Product update failed');
            }
        } catch (error) {
            message.error({ content: 'Error occurred while updating item!', key: 'update', duration: 3 });
        }
    };

    const mlOptions = [3, 6, 12, 25, 100];
    const gmOptions = [3, 6, 12];
    const pieceOptions = [1];

    return (
        <Modal
            title="Edit Product"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={1000} // Adjust the modal width here
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="px-8 py-4 mx-auto border-t"
            >

                {/* <Form.Item
                    name="isFeatured"
                    valuePropName="checked" // This makes sure the value is true/false
                >
                    <Checkbox>Is Featured</Checkbox>
                </Form.Item> */}

                <div className="flex space-x-4">
                    <Form.Item
                        className="flex-grow"
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the product name' }]}
                    >
                        <Input placeholder="Product name" />
                    </Form.Item>

                    <Form.Item
                        label="Section"
                        name="section"
                        rules={[{ required: false, message: 'Please select a section' }]}
                        className="flex"
                    >
                        <Select defaultValue="regular">
                            <Option value="regular">Regular</Option>
                            <Option value="newArrival">New Arrival</Option>
                            <Option value="featured">Featured</Option>
                            <Option value="onSale">On Sale</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="flex space-x-4">
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                        className="flex-1"
                    >
                        <Select placeholder="Select a category">
                            <Option value="inspiredPerfumeOil">Inspired Perfume Oil</Option>
                            <Option value="oriental">Oriental/Arabian</Option>
                            <Option value="artificialOud">Artificial Oud</Option>
                            <Option value="natural">Natural</Option>
                            <Option value="semiorganic">Semi-organic</Option>
                            <Option value="organic">Organic</Option>
                            <Option value="brand">Brand</Option>
                            <Option value="giftsAndPackages">Gifts and Packages</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className="flex-1"
                        label="SKU"
                        name="sku"
                        rules={[{ required: true, message: 'Please enter the SKU' }]}
                    >
                        <Input placeholder="SKU" />
                    </Form.Item><Form.Item
                        className="flex-1"
                        label="Origin"
                        name="origin"
                        rules={[{ required: false, message: 'Please select an origin' }]}
                    >
                        <Select placeholder="Select a country">
                            <Option value="UAE">UAE</Option>
                            <Option value="Saudi Arabia">Saudi Arabia</Option>
                            <Option value="France">France</Option>
                            <Option value="India">India</Option>
                            <Option value="Switzerland">Switzerland</Option>
                            <Option value="Pakistan">Pakistan</Option>
                            <Option value="Bangladesh">Bangladesh</Option>
                            {/* <Option value="Oman">Oman</Option>
                            <Option value="UK">UK</Option>
                            <Option value="USA">USA</Option> */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className="flex-1"
                        label="Brand"
                        name="brand"
                        rules={[{ required: false, message: 'Please enter the brand name' }]}
                    >
                        <Input placeholder="Brand Name" />
                    </Form.Item>

                </div>

                <div className="flex space-x-4">
                    <Form.Item
                        className="flex-grow"
                        label="Smell"
                        name="smell"
                        rules={[{ required: true, message: 'Please select a smell type' }]}
                    >
                        <Select mode="tags" placeholder="Select smell types">
                            <Option value="Corporate">Corporate</Option>
                            <Option value="Citrusy">Citrusy</Option>
                            <Option value="Manly">Manly</Option>
                            <Option value="Earthy">Earthy</Option>
                            <Option value="Leathery">Leathery</Option>
                            <Option value="Soapy">Soapy</Option>
                            <Option value="Refreshing">Refreshing</Option>
                            <Option value="Fruity">Fruity</Option>
                            <Option value="Sweet">Sweet</Option>
                            <Option value="Chocolate">Chocolate</Option>
                            <Option value="Vanilla">Vanilla</Option>
                            <Option value="Candy">Candy</Option>
                            <Option value="Powdery">Powdery</Option>
                            <Option value="Floral">Floral</Option>
                            <Option value="Bergamote">Bergamote</Option>
                            <Option value="Lavender">Lavender</Option>
                            <Option value="Vetiver">Vetiver</Option>
                            <Option value="Woody">Woody</Option>
                            <Option value="Spicy">Spicy</Option>
                            <Option value="Smooky">Smooky</Option>
                            <Option value="Strong">Strong</Option>
                            <Option value="Amber">Amber</Option>
                            <Option value="Musky">Musky</Option>
                            <Option value="Nostalgic">Nostalgic</Option>
                            <Option value="Projective">Projective</Option>
                            <Option value="Longetive">Longetive</Option>
                            <Option value="Synthetic">Synthetic</Option>
                            <Option value="Organic">Organic</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className="w-[160px]"
                        label="Specification"
                        name="specification"
                        rules={[{ required: false, message: 'Please select a specification' }]}
                    >
                        <Select defaultValue={"all"} placeholder="Select a specification">
                            <Option value="all">All</Option>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                >
                    <TextArea rows={4} placeholder="Product Description" />
                </Form.Item>

                <Form.Item
                    label="Notes"
                    name="notes"
                    rules={[{ required: true, message: 'Please enter the notes' }]}
                >
                    <TextArea rows={4} placeholder="Fragrance Notes" />
                </Form.Item>

                <div className="flex space-x-8">

                    <Form.Item
                        label="Measurement"
                        name="measurement"
                        rules={[{ required: true, message: 'Please select a measurement unit' }]}
                    >
                        <Radio.Group onChange={(e) => setMeasurement(e.target.value)} value={measurement}>
                            <Radio value="ml">ml</Radio>
                            <Radio value="gm">gm</Radio>
                            <Radio value="piece">piece</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Conditionally render fields based on the selected measurement */}
                    {/* {measurement === 'ml' && mlOptions.map((size) => ( */}
                    {mlOptions.map((size) => (
                        <Form.Item
                            key={`ml-${size}`}
                            label={`${size} ml`}
                            name={`ml_${size}`}
                            rules={[{ required: true, message: `Please enter the price for ${size} ml` }]}
                        >
                            <Input placeholder={`Price for ${size} ml`} />
                        </Form.Item>
                    ))}

                    {measurement === 'gm' && gmOptions.map((size) => (
                        <Form.Item
                            key={`gm-${size}`}
                            label={`${size} gm`}
                            name={`gm_${size}`}
                            rules={[{ required: true, message: `Please enter the price for ${size} gm` }]}
                        >
                            <Input placeholder={`Price for ${size} gm`} />
                        </Form.Item>
                    ))}

                    {measurement === 'piece' && pieceOptions.map((size) => (
                        <Form.Item
                            key={`piece-${size}`}
                            label={`${size} piece`}
                            name={`piece${size}`}
                            rules={[{ required: true, message: `Please enter the price for ${size} piece` }]}
                        >
                            <Input placeholder={`Price for ${size} piece`} />
                        </Form.Item>
                    ))}

                </div>

                <div className="flex space-x-4">

                    <Form.Item
                        label="Base Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter the price' }]}
                    >
                        <InputNumber min={0} placeholder="Price" className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Discount (%)"
                        name="discount"
                    >
                        <InputNumber min={0} max={100} placeholder="Discount %" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[{ required: true, message: 'Please enter the stock quantity' }]}
                    >
                        <Input min={0} placeholder="Stock" className="w-full" />
                    </Form.Item>

                    <Form.Item
                        className="flex-grow"
                        label="Supplier"
                        name="supplier"
                        rules={[{ required: false, message: 'Please enter the supplier name' }]}
                    >
                        <Input placeholder="Supplier name" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Related Products"
                    name="relatedProducts"
                    rules={[
                        { required: false, message: 'Please select at least four related products' },
                        {
                            validator: (_, value) => {
                                if (value && (value.length < 4 || value.length > 6)) {
                                    return Promise.reject('Please select between 4 and 6 products');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    className="w-full"
                >
                    <Select
                        mode="multiple"
                        placeholder="Select related products"
                        maxTagCount={6}
                    >
                        {items.map((product) => (
                            <Option key={product._id} value={product._id}>
                                {product.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <div className='flex'>
                    <Form.Item
                        label="Primary Image"
                        valuePropName="fileList"
                        getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                        className="flex-1"
                        rules={[{ required: true, message: 'Please upload a primary image' }]}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={file => handleImageChange(file, setPrimaryImage)}
                            fileList={primaryImage}
                            maxCount={1}
                            onRemove={() => setPrimaryImage([])}
                        >
                            {primaryImage.length === 0 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Secondary Image"
                        valuePropName="fileList"
                        getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                        className="flex-1"
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={file => handleImageChange(file, setSecondaryImage)}
                            fileList={secondaryImage}
                            maxCount={1}
                            onRemove={() => setSecondaryImage([])}
                        >
                            {secondaryImage.length === 0 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="More Images"
                        valuePropName="fileList"
                        getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                        className="flex-1"
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={moreImages}
                            onChange={handleMultipleImageChange}
                            onRemove={handleRemoveImage}
                            multiple
                        >
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>

                <Form.Item className="text-center mt-8">
                    <Button type="primary" htmlType="submit" className={styles.linearGradientButton}>
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditItem;
