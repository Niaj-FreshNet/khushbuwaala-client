import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload, InputNumber, Button, message, Radio, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { createStyles } from 'antd-style';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

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

const OrderDetails = ({ visible, onClose, product, refetch }) => {
  const { styles } = useStyle();
  const [form] = Form.useForm();
  const axiosPublic = useAxiosPublic();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

  // Extract orderId from query parameters
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("orderId");
  console.log(orderId)

  
  useEffect(() => {
      const fetchOrder = async () => {
          setLoading(true);
          try {
              // Fetch order details with axiosPublic
              const response = await axiosPublic.get(`/api/orders/${orderId}`);
              console.log(response)
              
              setOrder(response.data); // Set the order data
          } catch (error) {
              message.error("An error occurred while fetching your order.");
              setError(true);
          } finally {
              setLoading(false);
          }
      };

      if (orderId) fetchOrder();
  }, [orderId, axiosPublic]);

  if (loading) return <div>Loading...</div>;
  if (error || !order) return <div>Failed to load order details. Please contact support.</div>;
  
  const { contactInfo, shippingAddress, billingAddress, cartItems, paymentMethod, subtotal, shippingCost, estimatedTaxes, total } = order;


  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={1000} // Adjust the modal width here
    >
      
    </Modal>
  );
};

export default OrderDetails;
