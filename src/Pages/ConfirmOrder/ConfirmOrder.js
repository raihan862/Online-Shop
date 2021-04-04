import { Form, Input, notification, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { makeOrder } from "../../Store/Actions/OrderAction";
import OrderDetails from "../Admin/OrderTable/OrderDetails";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const ConfirmOrder = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.authentication.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const data = location.state || {};
  const { tax, shipping, total } = data.data;
  const newItems = [...cartItems];
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [orderDetails, setOrderDetails] = useState([]);
  const orderData = {
    userId: user._id,
    details: [],
    tax: tax,
    status: "pending",
    shipping: shipping,
    totalOrderPrice: total,
  };

  useEffect(() => {
    newItems.map((item) => {
      const newItem = {
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      };
      orderData.details.push(newItem);
    });
    setOrderDetails(orderData.details);
    setVisible(true);
    //
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowConfirmModal(false);
    history.replace("/review-order");
  };
  const openNotification = () => {
    notification.open({
      message: "Order Confirmed",
      description: "Your Products Will be Delivered As Soon As possible",
      className: "custom-class",
      style: {
        width: 600,
        backgroundColor: "white",
        color: "black",
        fontWeight: 600,
      },
    });
  };
  const handleConfirm = () => {
    setShowConfirmModal(false);
    setLoading(true);
    const a = { ...orderData, details: orderDetails };
    dispatch(makeOrder(a));
    setTimeout(() => {
      openNotification();
      setLoading(false);
      history.replace("/");
    }, 1000);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="+88">
        <Option value="88">+88</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    // <div>{orders.loading ? <LoadingComponent /> : <h2>Complete Order</h2>}</div>
    <div>
      {loading && <LoadingComponent />}
      <Modal
        title="Confirm Order"
        centered
        visible={visible}
        onOk={() => handleOk(false)}
        onCancel={() => handleCancel(false)}
        width={1000}
      >
        <OrderDetails data={orderDetails} />
      </Modal>
      <Modal
        title="COnfirm Order"
        visible={showConfirmModal}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Phone Number"
            name="phone Number"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input addonBefore={prefixSelector} />
          </Form.Item>
          <Form.Item
            label="Pickup Addredd"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Payment Method"
            name="method"
            rules={[
              {
                required: true,
                message: "select one Option",
              },
            ]}
          >
            <Select
              defaultValue="Select One Option"
              placeholder="Select Method"
            >
              <Option value="cash">Cash On Delivery</Option>
              <Option value="bkash">Bkash</Option>
              <Option value="roket">Roket</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConfirmOrder;
