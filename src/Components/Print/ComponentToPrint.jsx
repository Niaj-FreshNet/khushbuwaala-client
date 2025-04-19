import React from "react";
import { Table, Typography } from "antd";
import moment from 'moment';

const { Title, Text } = Typography;

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { order } = props;

    const columns = [
        {
            title: 'Sl.',
            dataIndex: 'serial',
            key: 'serial',
            render: (_, __, index) => index + 1,
            align: 'center',
        },
        {
            title: 'Product Description',
            dataIndex: 'name',
            key: 'name',
            className: 'text-left font-medium',
            render: (text, record) => (
                <div className="flex flex-col">
                    <div>
                        <span className="font-medium">{record.name} </span>
                        <span className="text-gray-500 text-sm">× {record.size}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Unit Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => `${(record.variantPrices[record.size]).toFixed(2)} BDT`,
            align: 'right',
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) => `${(record.variantPrices[record.size] * record.quantity).toFixed(2)} BDT`,
            align: 'right',
        },
    ];

    return (
        <div ref={ref}>
            <div className="px-4 py-4 bg-white shadow-sm rounded-lg">
            
              <div className="text-center mb-8">
                <h2 className="text-3xl divider font-semibold text-gray-700 tracking-wide">Invoice</h2>
                <p className="text-gray-500">Thank you for choosing KhushbuWaala Perfumes</p>
              </div>

                <div className="flex flex-row justify-between  mb-8 text-gray-700">
                    <div className="flex flex-col space-y-2 text-left mb-4 sm:mb-0">
                        <div className='flex flex-col'>
                            <span className="text-sm font-semibold">Invoice No </span>
                            <span className="font-light italic">#{order.orderId}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-sm font-semibold">Invoice Date </span>
                            <span className="font-light">{moment(order.orderPlacedAt).format("DD MMMM YYYY")}</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 text-right">
                        <div className='flex flex-col mb-2'>
                            <span className="text-sm font-semibold">Order Status</span>
                            <span
                                className={`font-bold text-sm ${order.orderStatus === 'Pending'
                                    ? 'text-yellow-500'
                                    : order.orderStatus === 'Processing'
                                        ? 'text-blue-500'
                                        : order.orderStatus === 'Shipped'
                                            ? 'text-purple-500'
                                            : order.orderStatus === 'Delivered'
                                                ? 'text-green-500'
                                                : 'text-gray-500'
                                    }`}
                            >
                                {order.orderStatus}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Payment Method</span>
                            <span className="font-light">
                                {order.paymentMethod === 'cashOnDelivery' && <p>Cash On Delivery</p>}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-sm font-semibold">
                                Amount
                                <span className={`ml-2 font-bold ${order.paymentStatus === 'Due' ? 'text-red-500' : 'text-green-500'}`}>
                                    {order.paymentStatus}
                                </span>
                            </span>
                            <span className="font-bold text-lg">{order.total.toFixed(2)} BDT</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-between w-full mb-10 text-gray-700'>
                    <div className='flex flex-col sm:flex-row sm:justify-between'>
                    <div className="flex flex-col space-y-1 mb-4 sm:mb-0">
                        <p className="text-sm font-semibold">Shipping Address</p>
                        <p className="font-light">{order.shippingAddress.name}</p>
                        <p className="font-light">{order.shippingAddress.address}</p>
                        <p className="font-light">Thana: {order.shippingAddress.thana}</p>
                        <p className="font-light">District: {order.shippingAddress.district}</p>
                        <p className="font-light">{order.shippingAddress.contactNumber}</p>
                    </div>

                    <div className="w-px bg-gray-300 mx-8 hidden sm:block"></div>

                    <div className="flex flex-col space-y-1 mb-4 sm:mb-0">
                        <p className="text-sm font-semibold">Billing Address</p>
                        <p className="font-light">{order.billingAddress.name}</p>
                        <p className="font-light">{order.billingAddress.address}</p>
                        <p className="font-light">{order.billingAddress.contactNumber}</p>
                        <p className="font-light">Thana: {order.billingAddress.thana}</p>
                        <p className="font-light">District: {order.billingAddress.district}</p>
                        <p className="font-light">{order.contactInfo.email}</p>
                    </div>
                    </div>

                    <div className="flex flex-col space-y-1 text-right">
                        <p className="text-sm font-semibold">Bill From</p>
                        <p className="font-light">KhushbuWaala Perfumes Ltd.</p>
                        <p className="font-light">E-2, H:13, R:10, Block: D <br /> Banasree, Rampura, Dhaka-1219</p>
                        <p className="font-light">+880 1566-395807 (bKash, Nagad, Rocket)</p>
                        <p className="font-light">khushbuwaala@gmail.com</p>
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={order.cartItems.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                    bordered
                    className="mb-8"
                />

                <div className="flex justify-end mb-8">
                    <div className="w-full sm:w-1/2">
                        <div className="flex justify-between text-gray-700 text-sm mb-1">
                            <span>Subtotal:</span>
                            <span>{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm mb-1">
                            <span>Shipping Cost:</span>
                            <span>{order.shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm mb-1">
                            <span>Estimated Taxes:</span>
                            <span>{order.estimatedTaxes.toFixed(2)}</span>
                        </div>
                        <hr className="my-2 border-gray-300" />
                        <div className="flex justify-between font-bold text-gray-900 text-lg">
                            <span>Total:</span>
                            <span>{order.total.toFixed(2)} BDT</span>
                        </div>
                    </div>
                </div>

                <div className="pt-8 pb-4 border-t border-gray-200 text-center">
                    <p className="text-gray-600 font-semibold text-sm">THANK YOU FOR YOUR PURCHASE!</p>
                    <p className="text-gray-600 text-sm">If you have any questions about this invoice, please contact us at khushbuwaala@gmail.com.</p>
                    <p className="text-lg font-semibold mt-4">Best Wishes.</p>
                </div>
            </div>
        </div>
    );
});
