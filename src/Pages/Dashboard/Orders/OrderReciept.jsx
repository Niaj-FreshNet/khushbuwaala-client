import React from 'react';
import { useReactToPrint } from "react-to-print";
import { Modal, Table, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ComponentToPrint } from '../../../Components/Print/ComponentToPrint';

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

  const componentRef = React.useRef(null);


  const handleAfterPrint = React.useCallback(() => {
      console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
      console.log("`onBeforePrint` called");
      return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
      contentRef: componentRef,
      documentTitle: "KhushbuWaalaPerfumesBill",
      onAfterPrint: handleAfterPrint,
      onBeforePrint: handleBeforePrint,
  });

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
          <div>
                        <div className=''>
                            <ComponentToPrint ref={componentRef} order={order}/>
                        </div>
                            <Button
                            className="print-button absolute left-12 top-4"
                                onClick={printFn}
                                type="primary"
                                htmlType="submit"
                                icon={<PrinterOutlined />}
                                // style={{ height: '40px', fontWeight: 'bold' }}
                            >
                                Print
                            </Button>
          </div>
    </Modal >
  );
};

export default OrderReciept;
