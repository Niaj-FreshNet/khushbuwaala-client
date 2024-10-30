import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, InputNumber, message, Radio } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { GrAdd } from "react-icons/gr";
import { createStyles } from "antd-style";
import useItem from "../../../Hooks/useItems";

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

const AddItem = () => {
    const axiosPublic = useAxiosPublic();
    const [items, refetch, isLoading, isError, error] = useItem(); // items, not { item }
    const [form] = Form.useForm();
    const { styles } = useStyle();
    const [primaryImage, setPrimaryImage] = useState(null);
    const [secondaryImage, setSecondaryImage] = useState(null);
    const [moreImages, setMoreImages] = useState([]);
    const [sku, setSku] = useState("");
    const [measurement, setMeasurement] = useState(null);

    const onFinish = async (values) => {
        message.loading({ content: 'Uploading...', key: 'upload', duration: 10 });

        try {
            const uploadImage = async (imageFile) => {
                try {
                    const formData = new FormData();
                    formData.append("image", imageFile);

                    console.log("FormData content before upload:");
                    for (let pair of formData.entries()) {
                        // console.log(pair[0] + ', ' + pair[1]);
                    }

                    const res = await axiosPublic.post(image_hosting_api, formData, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    });

                    if (res.data.success) {
                        return res.data.data.display_url;
                    } else {
                        // console.error('Image upload failed:', res.data);
                        throw new Error('Image upload failed');
                    }
                } catch (error) {
                    // console.error('Upload error:', error);
                    throw error;
                }
            };

            const primaryImageUrl = await uploadImage(primaryImage);
            const secondaryImageUrl = secondaryImage ? await uploadImage(secondaryImage) : null;

            const moreImageUrls = await Promise.all(
                moreImages.map(file => uploadImage(file.originFileObj))
            );

            // console.log("Uploaded Image URLs:", {
            //     primaryImageUrl,
            //     secondaryImageUrl,
            //     moreImageUrls,
            // });

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

            const productItem = {
                name: values.name,
                section: values.section,
                category: values.category,
                sku: sku,
                price: parseFloat(values.price),
                discount: values.discount,
                smell: values.smell,
                specification: values.specification,
                description: values.description,
                stock: values.stock,
                measurement: values.measurement,
                origin: values.origin,
                brand: values.brand,
                supplier: values.supplier,
                relatedProducts: values.relatedProducts,
                primaryImage: primaryImageUrl,
                secondaryImage: secondaryImageUrl,
                moreImages: moreImageUrls,
                variantPrices: variantPrices,
            };

            const productRes = await axiosPublic.post('/item', productItem);

            if (productRes.data.insertedId) {
                message.success({ content: `${values.name} successfully added!`, key: 'upload', duration: 3 });
                resetForm();
            } else {
                throw new Error('Product addition failed');
            }
        } catch (error) {
            message.error({ content: 'Error occurred while adding item!', key: 'upload', duration: 3 });
        }
    };


    const resetForm = () => {
        setPrimaryImage(null);
        setSecondaryImage(null);
        setMoreImages([]);
        setSku("");
        form.resetFields();
    };

    const handleImageChange = (file, setImage) => {
        // console.log(file); // Inspect the file object
        setImage(file);
        return false; // Prevent automatic upload
    };

    const handleMultipleImageChange = ({ fileList }) => {
        console.log(fileList);
        setMoreImages(fileList.map(file => ({
            uid: file.uid,
            name: file.name,
            status: 'done',
            originFileObj: file.originFileObj,
            url: URL.createObjectURL(file.originFileObj)
        })));
    };


    const handleRemoveImage = (file) => {
        // Safely remove the file based on uid
        setMoreImages(prev => prev.filter(img => img.uid !== file.uid));
    };

    const handleCategoryChange = (value) => {
        const categoryPrefix = value.slice(0, 3).toUpperCase(); // First three letters of category
        const newSku = `KBW-${categoryPrefix}-100`; // Create SKU format
        setSku(newSku); // Set new SKU
        form.setFieldsValue({ sku: newSku });
    };

    const mlOptions = [3, 6, 12, 25, 100];
    const gmOptions = [3, 6, 12];
    const pieceOptions = [1];

    // console.log(item.name)

    return (
        <div className="min-h-screen">
            <div className="mx-auto text-center">
                <h3 className="text-xl uppercase">Add A Product</h3>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="w-5/6 mx-auto mt-6"
            >
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
                        <Select placeholder="Select a category" onChange={handleCategoryChange}>
                            <Option value="inspiredPerfumeOil">Inspired Perfume Oil</Option>
                            <Option value="oriental">Oriental/Arabian</Option>
                            <Option value="artificialOud">Artificial Oud</Option>
                            <Option value="natural">Natural</Option>
                            <Option value="semiorganic">Semi-organic</Option>
                            <Option value="organic">Organic</Option>
                            <Option value="brand">Brand</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="SKU"
                        name="sku"
                        rules={[{ required: true, message: 'Please enter the SKU' }]}
                    >
                        <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" />
                    </Form.Item>
                    <Form.Item
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
                            <Option value="Refreshing">Refreshing</Option>
                            <Option value="Fruity">Fruity</Option>
                            <Option value="Sweet">Sweet</Option>
                            <Option value="Chocolate">Chocolate</Option>
                            <Option value="Floral">Floral</Option>
                            <Option value="Spicy">Spicy</Option>
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
                    {measurement === 'ml' && mlOptions.map((size) => (
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

                <div className="flex justify-between items-start">
                    <Form.Item
                        label="Product Image (Primary)"
                        name="primaryImage"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            beforeUpload={(file) => handleImageChange(file, setPrimaryImage)}
                            listType="picture"
                            fileList={primaryImage ? [primaryImage] : []}
                            onRemove={() => setPrimaryImage(null)}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Product Image (Secondary)"
                        name="secondaryImage"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            beforeUpload={(file) => handleImageChange(file, setSecondaryImage)}
                            listType="picture"
                            fileList={secondaryImage ? [secondaryImage] : []}
                            onRemove={() => setSecondaryImage(null)}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Product Images (More)"
                        name="moreImages"
                        rules={[{ required: false, message: 'Please upload images' }]}
                    >
                        <Upload
                            multiple
                            beforeUpload={() => false} // Prevent automatic upload
                            listType="picture"
                            fileList={moreImages}
                            onChange={handleMultipleImageChange}
                            onRemove={handleRemoveImage} // Using the updated remove handler
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit" icon={<GrAdd size={16} />} className={`${styles.linearGradientButton} font-semibold w-full mt-4 p-2`}>
                        Add Item
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddItem;