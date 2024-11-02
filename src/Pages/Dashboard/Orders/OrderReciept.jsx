import React from 'react';
import { Modal, Table } from 'antd';
import moment from 'moment';

const OrderReciept = ({ visible, onClose, order }) => {
  if (!order) return null;

  const {
    orderId,
    contactInfo,
    shippingAddress,
    billingAddress,
    cartItems,
    subtotal,
    shippingCost,
    estimatedTaxes,
    total,
    paymentMethod,
    orderPlacedAt,
    orderStatus,
    paymentStatus
  } = order;

  // Table columns for item details
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
      render: (text) => `${text.toFixed(2)} BDT`,
      align: 'right',
    },
    {
      title: 'Total',
      key: 'total',
      render: (text, record) => `${(record.price * record.quantity).toFixed(2)} BDT`,
      align: 'right',
    },
  ];

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={750}
      bodyStyle={{ padding: '0px' }}
    >
      <div className="px-8 py-4 bg-white shadow-lg rounded-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl divider font-semibold text-gray-700 tracking-wide">Invoice</h2>
          <p className="text-gray-500">Thank you for choosing KhushbuWaala Perfumes</p>
        </div>

        {/* Invoice and Customer Information */}
        <div className="flex justify-between mb-8 text-gray-700">
          <div className="flex flex-col space-y-2 text-left">
            <div className='flex flex-col'>
              <span className="text-sm font-semibold">Invoice No </span>
              <span className="font-light">{orderId}</span>
            </div>
            <div className='flex flex-col'>
              <span className="text-sm font-semibold">Invoice Date </span>
              <span className="font-light">{moment(orderPlacedAt).format("DD MMMM YYYY")}</span>
            </div>
          </div>
          <div className=" flex flex-col -space-y-2 text-right">
            <div className='flex flex-col mb-2'>
              <span className="text-sm font-semibold">Order Status</span>
              <span
                className={`font-bold text-sm ${orderStatus === 'Pending'
                  ? 'text-yellow-500'       // Yellow for Pending
                  : orderStatus === 'Processing'
                    ? 'text-blue-500'         // Blue for Processing
                    : orderStatus === 'Shipped'
                      ? 'text-purple-500'       // Purple for Shipped
                      : orderStatus === 'Delivered'
                        ? 'text-green-500'        // Green for Delivered
                        : 'text-gray-500'         // Default color if status is undefined or different
                  }`}
              >
                {orderStatus}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold">Payment Method</span>
              <span className="font-light">
                {paymentMethod === 'cashOnDelivery' &&
                  <p>Cash On Delivery</p>
                }
              </span>
            </div>
            <div className='flex flex-col'>
              <span className="text-sm font-semibold">
                Amount
                <span
                  className={`ml-2 \ ${paymentStatus === 'Due' ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                  {paymentStatus}
                </span>
              </span>
              <span className="font-bold text-lg">{total.toFixed(2)} BDT</span>
            </div>
          </div>
        </div >

        <div className='flex flex-between w-full'>
          <div className="flex flex-grow gap-2 text-gray-700 mb-10">
            {/* Shipping Address */}
            <div className='flex flex-col space-y-1'>
              <p className="text-sm font-semibold mb-0">Shipping Address</p>
              <p className="font-light">{shippingAddress.firstName} {shippingAddress.lastName}</p>
              <p className="font-light">{shippingAddress.address}</p>
              <p className="font-light">{shippingAddress.phone}</p>
              <p className="font-light">{shippingAddress.city}, {shippingAddress.postalCode}</p>
            </div>

            {/* Vertical Divider */}
            <div className="w-px bg-gray-300 mx-8"></div>

            {/* Billing Address */}
            <div className='flex-1 flex-col space-y-1'>
              <p className="text-sm font-semibold mb-0">Billing Address</p>
              <p className="font-light">{billingAddress.firstName} {billingAddress.lastName}</p>
              <p className="font-light">{billingAddress.address}</p>
              <p className="font-light">{billingAddress.city}, {billingAddress.postalCode}</p>
              <p className="font-light">{billingAddress.phone}</p>
              <p className="font-light">{contactInfo.email}</p>
            </div>
          </div>

          <div className="flex-grow flex-col space-y-1 text-right">
            <p className="text-sm font-semibold mb-0">Bill From</p>
            <p className="font-light">KhushbuWaala Perfumes Ltd.</p>
            <p className="font-light">E-2, H#13, R#10, Block: D <br /> Banasree, Rampura, Dhaka-1219</p>
            <p className="font-light">+880 1566-395807 (bKash, Nagad, Rocket)</p>
            <p className="font-light">khushbuwaala@gmail.com</p>
          </div>
        </div>


        {/* Order Items Table */}
        <Table
          columns={columns}
          dataSource={cartItems.map((item, index) => ({ ...item, key: index }))}
          pagination={false}
          bordered
          className="mb-8"
        />

        {/* Summary Section */}
        <div className="flex justify-end mb-8">
          <div className="w-1/2">
            <div className="flex justify-between text-gray-700 text-sm mb-1">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm mb-1">
              <span>Shipping Cost:</span>
              <span>{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm mb-1">
              <span>Estimated Taxes:</span>
              <span>{estimatedTaxes.toFixed(2)}</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total:</span>
              <span>{total.toFixed(2)} BDT</span>
            </div>
          </div>
        </div>

        {/* Footer with Thank You Note */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 font-semibold text-sm">THANK YOU FOR YOUR PURCHAGE!</p>
          <p className="text-gray-600 text-sm">If you have any questions about this invoice, please contact us at khushbuwaala@gmail.com.

          </p>
          <p className="text-lg font-semibold mt-4">Best Wishes.</p>
        </div>
      </div >
    </Modal >
  );
};

export default OrderReciept;
