import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Table, Input, Space, Modal, message } from "antd";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useOrders from "../../../Hooks/useOrders";
import OrderDetails from "./OrderDetails";
import { GrPrint } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";

const { Search } = Input;

const Orders = ({ products }) => {
    const [searchText, setSearchText] = useState("");
    const [orders, refetch, isLoading, isError, error] = useOrders();
    const axiosPublic = useAxiosPublic();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    // console.log(orders.cartItems.length)

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
                    refetch(); // Refetch orders after delete
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

    // const filteredorders = orders.filter((item) =>
    //     item.name.toLowerCase().includes(searchText.toLowerCase())
    // );

    const columns = [
        {
            title: 'Serial',
            dataIndex: 'serial',
            key: 'serial',
            render: (_, __, index) => index + 1,
            align: 'center',
        },
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a.category.localeCompare(b.category),
            align: 'center',
        },
        {
            title: 'Product',
            dataIndex: 'orderId',
            key: 'orderId',
            sorter: (a, b) => a.category.localeCompare(b.category),
            align: 'center',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (text) => `$ ${text}`,
            sorter: (a, b) => a.price - b.price,
            align: 'center',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text) => `$ ${text}`,
            sorter: (a, b) => a.price - b.price,
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => showEditModal(record)} icon={<GrPrint color="green" size={18} />} />
                    {/* <Button type="link" onClick={() => showEditModal(record)} icon={<BiEdit color="black" size={18} />} /> */}
                    <Button onClick={() => showDeleteConfirm(record)} type="danger" icon={<FaTrashAlt color="red" size={18} />} />
                </Space>
            ),
            align: 'center',
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="md:w-2/3 mx-auto text-center mb-4">
                <h3 className="text-xl uppercase">Manage All orders</h3>
            </div>
            <div className="flex justify-between orders-center -mt-4 -mb-2">
                <Search
                    placeholder="Search orders..."
                    onSearch={handleSearch}
                    onChange={handleSearchChange}
                    style={{ width: 300, marginBottom: 20 }}
                />
                <p>Total Products: {orders.length}</p>
            </div>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={orders}
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
                <OrderDetails
                    visible={isEditModalVisible}
                    onClose={hideEditModal}
                    product={selectedProduct}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default Orders;