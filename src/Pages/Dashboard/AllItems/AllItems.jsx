import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Table, Input, Space, Modal, message } from "antd";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useItem from "../../../Hooks/useItems";
import EditItem from "../EditItem/EditItem";
import { GrPrint } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";

const { Search } = Input;

const AllItems = ({ products }) => {
    const [searchText, setSearchText] = useState("");
    const [items, refetch, isLoading, isError, error] = useItem();
    const axiosPublic = useAxiosPublic();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalVisible(true);
    };

    const hideEditModal = () => {
        setIsEditModalVisible(false);
        setSelectedProduct(null);
    };

    const showDeleteConfirm = (item) => {
        setCurrentItem(item);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (currentItem) {
            try {
                console.log("Attempting to delete:", currentItem._id); // Log current item ID
                const res = await axiosPublic.delete(`/item/${currentItem._id}`);
                console.log("Delete response:", res.data); // Log response data
    
                if (res.data.deletedCount > 0) {
                    message.success(`${currentItem.name} deleted!`);
                    refetch(); // Refetch items after delete
                    setIsModalVisible(false);
                    setCurrentItem(null); // Clear current item
                } else {
                    message.error("Error: Item not deleted");
                }
            } catch (error) {
                console.error("Error deleting item:", error); // Log error
                message.error("Error deleting item");
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Serial',
            dataIndex: 'serial',
            key: 'serial',
            render: (_, __, index) => index + 1,
            align: 'center',
        },
        {
            title: 'Image',
            dataIndex: 'primaryImage',
            key: 'primaryImage',
            render: (text) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={text}
                        alt="primaryImage"
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: '20%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </div>
            ),
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
            align: 'left',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$ ${text}`,
            sorter: (a, b) => a.price - b.price,
            align: 'right',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            sorter: (a, b) => a.discount - b.discount,
            align: 'center',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: (a, b) => a.stock - b.stock,
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => showEditModal(record)} icon={<GrPrint color="green" size={18} />} />
                    <Button type="link" onClick={() => showEditModal(record)} icon={<BiEdit color="black" size={18} />} />
                    <Button onClick={() => showDeleteConfirm(record)} type="danger" icon={<FaTrashAlt color="red" size={18} />} />
                </Space>
            ),
            align: 'center',
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="md:w-2/3 mx-auto text-center mb-4">
                <h3 className="text-xl uppercase">Manage All Items</h3>
            </div>
            <div className="flex justify-between items-center -mt-4 -mb-2">
                <Search
                    placeholder="Search items..."
                    onSearch={handleSearch}
                    onChange={handleSearchChange}
                    style={{ width: 300, marginBottom: 20 }}
                />
                <p>Total Products: {items.length}</p>
            </div>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={filteredItems}
                rowKey="_id"
                pagination={false}
                bordered
            />
            <Modal
                title="Confirm Delete"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes, delete it!"
                cancelText="No"
            >
                <p>Are you sure you want to delete {currentItem?.name}?</p>
            </Modal>

            {isEditModalVisible && (
                <EditItem
                    visible={isEditModalVisible}
                    onClose={hideEditModal}
                    product={selectedProduct}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default AllItems;