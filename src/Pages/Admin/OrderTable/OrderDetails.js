import { Form, Table } from "antd";
import React from "react";
const OrderDetails = ({ data }) => {
  console.log(data);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "15%",
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table bordered dataSource={data} columns={columns} />
      </Form>
    </>
  );
};

export default OrderDetails;
