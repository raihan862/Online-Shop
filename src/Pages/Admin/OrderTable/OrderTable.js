import { Button, DatePicker, Form, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchOrders,
  fetchOrdersByDate,
  updateOrderStatus
} from "../../../Store/Actions/OrderAction";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import OrderDetails from "./OrderDetails";

const OrderTable = () => {
  const [form] = Form.useForm();
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [status, setStatus] = useState("");
  let data = orders.orders;
  let { orderType } = useParams();
  orderType = orderType ? orderType : "pending"
  useEffect(() => {
    if (orderType == "date") {
    } else {
      dispatch(fetchOrders(1, orderType));
    }
  }, [orderType]);
  const handleStatusChange = (value, record) => {
    setLoad(true);
    dispatch(updateOrderStatus({ id: record._id, status: value }));
    dispatch(fetchOrders(1, orderType));
    setTimeout(() => setLoad(false), 1000);
  };
  const handleShowDetails = (data) => {
    setDetailData(data);
    setVisible(true);
  };

  const onDateChange = (date, dateString) => {
    const n = new Date(dateString);
    setLoad(true);
    dispatch(fetchOrdersByDate(n));
    setTimeout(() => setLoad(false), 1000);
  };

  const columns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
      width: "15%",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      width: "15%",
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
      width: "15%",
      key: "shipping",
    },
    {
      title: "Total VAT",
      dataIndex: "tax",
      width: "15%",
      key: "tax",
    },
    {
      title: "Total Price",
      dataIndex: "totalOrderPrice",
      width: "15%",
      key: "totalOrderPrice",
    },
    {
      title: "Status",
      key: "status",
      width: "15%",
      render: (record) => {
        setStatus(record.status);
        return (
          <Select
            onChange={(value) => handleStatusChange(value, record)}
            defaultValue={record.status}
            style={{ width: "100%" }}
            value={status}
          >
            {orderType !== "processing" && orderType !== "delivered" && (
              <Option value="pending">
                <span style={{ color: "red" }}>Pending</span>
              </Option>
            )}
            {orderType !== "delivered" && (
              <Option value="processing">
                <span style={{ color: "rgb(131, 129, 14)" }}>Processing</span>
              </Option>
            )}
            <Option value="delivered">
              <span style={{ color: "blue" }}>Delivered</span>
            </Option>
          </Select>
        );
      },
    },
    {
      title: "Details",
      key: "details",
      render: (record) => {
        return (
          <Button onClick={() => handleShowDetails(record.details)}>
            Show Details
          </Button>
        );
      },
    },
  ];
  return (
    <>
      {load && <LoadingComponent />}
      {orderType === "date" && (
        <div style={{ padding: "10px" }}>
          <h2>Select a Date </h2>
          <DatePicker onChange={onDateChange} />
        </div>
      )}

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 6,
          }}
        />
      </Form>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <OrderDetails data={detailData} />
      </Modal>
    </>
  );
};

export default OrderTable;
