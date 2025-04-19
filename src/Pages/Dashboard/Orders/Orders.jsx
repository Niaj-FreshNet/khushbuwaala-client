import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Table, Input, Space, Modal, message, Tag } from "antd";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useOrders from "../../../Hooks/useOrders";
import { GrPrint } from "react-icons/gr";
import moment from "moment";
import OrderReciept from "./OrderReciept";

const { Search } = Input;

const Orders = ({ products }) => {
    const [searchText, setSearchText] = useState("");
    const [orders, refetch, isLoading] = useOrders();
    const axiosPublic = useAxiosPublic();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); // Track the order for receipt
    const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false); // Control receipt modal

    // Show the receipt modal
    const showReceiptModal = (order) => {
        setSelectedOrder(order);
        setIsReceiptModalVisible(true);
    };

    const hideReceiptModal = () => {
        setIsReceiptModalVisible(false);
        setSelectedOrder(null);
    };

    const showDeleteConfirm = (item) => {
        setCurrentItem(item);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (currentItem) {
            try {
                const res = await axiosPublic.delete(`/api/orders/${currentItem._id}`);
                if (res.data.deletedCount > 0) {
                    message.success(`${currentItem.name} deleted!`);
                    refetch();
                    setIsModalVisible(false);
                    setCurrentItem(null);
                } else {
                    message.error("Error: Order not deleted");
                }
            } catch (error) {
                message.error("Error deleting order");
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // const handleSearch = (value) => {
    //     setSearchText(value);
    // };

    // // Sort and filter orders based on search text
    // const filteredOrders = orders
    //     .filter((order) =>
    //         order._id.toLowerCase().includes(searchText.toLowerCase()) ||
    //         order.cartItems.some(item =>
    //             item.name.toLowerCase().includes(searchText.toLowerCase())
    //         )
    //     )
    //     .sort((a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)); // Sort to show the newest orders first

    const handleSearch = (value) => {
        setSearchText(value);
    };

    // Modify the filteredOrders to allow search by multiple fields
    const filteredOrders = orders
        .filter((order) =>
            (order._id && order._id.toLowerCase().includes(searchText.toLowerCase())) || // Search by order ID
            (order.orderId && order.orderId.toLowerCase().includes(searchText.toLowerCase())) || // Search by order ID
            (order.shippingAddress?.name && order.shippingAddress.name.toLowerCase().includes(searchText.toLowerCase())) || // Search by customer name
            (order.shippingAddress?.address && order.shippingAddress.address.toLowerCase().includes(searchText.toLowerCase())) || // Search by shipping address
            order.cartItems?.some(item =>
                (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) || // Search by item name
                (item.size && item.size.toLowerCase().includes(searchText.toLowerCase())) // Search by item size
            )
        )
        .sort((a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)); // Sort to show the newest orders first

    const updateOrderStatus = async (id, currentStatus) => {
        // Define the sequence of order statuses
        const statusSequence = ["Pending", "Processing", "Shipped", "Delivered"];

        // Find the index of the current status and determine the next status
        const currentIndex = statusSequence.indexOf(currentStatus);
        const newStatus = currentIndex < statusSequence.length - 1 ? statusSequence[currentIndex + 1] : statusSequence[currentIndex];

        // Show confirmation modal
        Modal.confirm({
            title: `Change order status to ${newStatus}?`,
            content: `Are you sure you want to change the order status from ${currentStatus} to ${newStatus}?`,
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                try {
                    // Call the updated API endpoint to change the status
                    const response = await axiosPublic.patch(`/api/orders/${id}/orderStatus`, { orderStatus: newStatus });

                    if (response.status === 200) {
                        message.success('Order Status updated successfully');
                        refetch(); // Refetch data to update UI
                    } else {
                        message.error('Failed to update Order Status');
                    }
                } catch (err) {
                    console.error('Error updating Order Status:', err);
                    message.error('Failed to update Order Status');
                }
            },
            onCancel() {
                message.info('Order Status update cancelled');
            },
        });
    };


    const updatePaymentStatus = async (id, paymentStatus) => {
        // Determine the new payment status
        const newPaymentStatus = paymentStatus === 'Due' ? 'Paid' : 'Due';

        // Show confirmation modal
        Modal.confirm({
            title: `Change payment status to ${newPaymentStatus}?`,
            content: `Are you sure you want to mark this payment as ${newPaymentStatus}?`,
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                try {
                    // Call the updated API endpoint to change the status
                    await axiosPublic.patch(`/api/orders/${id}/paymentStatus`, { id, paymentStatus: newPaymentStatus });

                    // Refetch data after the update
                    refetch();

                    message.success('Payment Status updated successfully');
                } catch (err) {
                    console.error('Error updating Payment Status:', err);
                    message.error('Failed to update Payment Status');
                }
            },
            onCancel() {
                message.info('Payment Status update cancelled');
            },
        });
    };

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
            dataIndex: 'orderId',
            key: 'orderId',
            align: 'center',
        },
        {
            title: 'Placed At',
            dataIndex: 'orderPlacedAt',
            key: 'orderPlacedAt',
            align: 'center',
            render: (orderPlacedAt) => {
                if (!orderPlacedAt) return <span className="text-gray-500">No date available</span>;

                const formattedDate = moment(orderPlacedAt).format("DD-MM-YYYY"); // e.g., 2023-10-31
                const formattedTime = moment(orderPlacedAt).format("hh:mm a"); // e.g., 03:45:12.123 PM

                // Calculate "time ago" text
                const timeAgo = moment(orderPlacedAt).fromNow(); // e.g., "3 hours ago"

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'semibold', color: '#333', fontSize: '0.9rem' }}>{formattedDate}</div>
                        <div style={{ fontWeight: 'normal', color: '#333', fontSize: '0.9rem' }}>{formattedTime}</div>
                        <hr className="my-2" /> {/* Divider to separate sections */}
                        <div className="text-left mt-2">
                            <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px' }}>{timeAgo}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Delivery',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            align: 'center',
            render: (shippingAddress, record) => (
                shippingAddress ? (
                    <div className="flex flex-col">
                        <div className="text-left flex-grow">
                            <strong>Name:</strong> <span className="font-semibold text-gray-600">{shippingAddress.name}</span><br />
                            <strong>Address:</strong> <span className="font-semibold text-gray-600">{shippingAddress.address}</span><br />
                            <strong>Thana:</strong> <span className="font-semibold text-gray-600">{shippingAddress.thana}</span><br />
                            <strong>District:</strong> <span className="font-semibold text-gray-600">{shippingAddress.district}</span><br />
                            <strong>Phone:</strong> <span className="font-semibold text-gray-600">{shippingAddress.contactNumber}</span>
                        </div>
                        <hr className="my-2" /> {/* Divider to separate sections */}
                        <div className="text-left mt-2">
                            <strong>Billing By:</strong> <span className="font-semibold text-gray-600">{record.billingAddress?.name}</span>
                        </div>
                        <hr className="my-2" /> {/* Divider to separate sections */}
                        <div className="text-left mt-2">
                            <strong>Notes:</strong> <span className="font-semibold text-gray-600">{record.notes}</span>
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-500">No shipping information available</span>
                )
            ),
        },
        {
            title: 'Products',
            dataIndex: 'cartItems',
            key: 'cartItems',
            align: 'center',
            render: (cartItems) => (
                <div>
                    {cartItems?.map((item, index) => (
                        <div className="text-left" key={index}>
                            <div className="flex gap-2 border-2 bg-gray-50 p-4 text-md">
                                <strong>{index + 1}.</strong> {/* Serial number for each product */}
                                <div>
                                    <strong> Product:</strong> <span className="font-semibold text-gray-600">{item.name}</span><br />
                                    <strong>Size:</strong> <span className="font-semibold text-gray-600">{item.size}</span><br />
                                    <strong>Qty:</strong> <span className="font-semibold text-gray-600">{item.quantity} pcs</span><br />
                                </div>
                            </div>
                            {/* <div className="divider"></div> */}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (text) => `${text}`,
            align: 'center',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text) => `${text}`,
            align: 'center',
        },
        {
            title: 'Status',
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            align: 'center',
            render: (status, record) => {
                // Set a default status if `status` is undefined
                const currentStatus = status || 'Pending';

                // Determine color based on current status
                let color;
                if (currentStatus === 'Pending') color = 'red';
                else if (currentStatus === 'Processing') color = 'orange';
                else if (currentStatus === 'Shipped') color = 'blue';
                else if (currentStatus === 'Delivered') color = 'green';

                return (
                    <Tag
                        color={color}
                        key={currentStatus}
                        className='text-base font-bold'
                        onClick={() => updateOrderStatus(record._id, currentStatus)}
                        style={{ cursor: 'pointer' }}
                    >
                        {currentStatus.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Payment',
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            align: 'center',
            sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
            render: (status, record) => {
                if (!status) {
                    return <Tag color="default" className='font-semibold'>UNKNOWN</Tag>;
                }

                let color;
                if (status === 'Due') {
                    color = 'red';
                } else if (status === 'Paid') {
                    color = 'green';
                }
                return (
                    <Tag
                        color={color}
                        key={status}
                        className='text-base font-bold'
                        onClick={() => updatePaymentStatus(record._id, status, record.orderStatus)}
                        style={{ cursor: 'pointer' }}
                    >
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => showReceiptModal(record)}
                        icon={<GrPrint color="green" size={18} />}
                    />
                    <Button onClick={() => showDeleteConfirm(record)} type="danger" icon={<FaTrashAlt color="red" size={18} />} />
                </Space>
            ),
            align: 'center',
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="md:w-2/3 mx-auto text-center mb-4">
                <h3 className="text-xl uppercase">Manage All Orders</h3>
            </div>
            <div className="flex justify-between items-center -mt-4 -mb-2">
                <Search
                    placeholder="Search orders..."
                    onSearch={handleSearch}
                    onChange={handleSearchChange}
                    style={{ width: 300, marginBottom: 20 }}
                />
                <p>Total Orders: {filteredOrders.length}</p>
            </div>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={filteredOrders}
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

            {isReceiptModalVisible && (
                <OrderReciept
                    visible={isReceiptModalVisible}
                    onClose={hideReceiptModal}
                    order={selectedOrder} // Pass selected order to receipt modal
                />
            )}
        </div>
    );
};

export default Orders;
