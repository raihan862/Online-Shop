import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../../../Store/Actions/ProductActions";
import LoadingComponent from "../../../LoadingComponent/LoadingComponent";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const AllProducts = () => {
  const [form] = Form.useForm();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [role, setRole] = useState("");
  const [showmodal, setShowModal] = useState(true);
  const [editingId, setEditingId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  let data = products.products;
  const hadlePageChange = (page = 1) => {
    setPageNumber(page);
    dispatch(fetchProducts(page));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const isEditing = (record) => record._id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });

    setEditingId(record._id);
  };

  const cancel = () => {
    setEditingId("");
  };
  const handleDelete = (record) => {
    setShowModal(true);
    setLoad(true);
    setTimeout(() => {
      dispatch(deleteProduct(record._id));
      setLoad(false);
    }, 1000);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);
      const editingCell = newData[index];
      const editedData = {
        ...editingCell,
        title: row.title,
        price: row.price,
        category: row.category,
        image: row.image,
      };
      setEditingId("");
      setLoad(true);
      setTimeout(() => {
        dispatch(updateProduct(editedData));
        setLoad(false);
      }, 1000);
    } catch (errInfo) {}
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      key: "",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "15%",
      key: "",
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "35%",
      key: "image",
      editable: true,
      render: (_, record) => {
        return <img src={record.image} width="50" />;
      },
    },
    {
      title: "Edit",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingId !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "delete",
      render: (_, record) => {
        return <Button onClick={() => handleDelete(record)}>Delete</Button>;
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      {(products.loading || load) && <LoadingComponent />}
      {products.err && !load && (
        <Modal
          title="Basic Modal"
          visible={showmodal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        >
          <p style={{ color: "red" }}>{products.err}</p>
        </Modal>
      )}

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: hadlePageChange,
            current: pageNumber,
            pageSize: 9,
            total: products.count,
          }}
        />
      </Form>
    </>
  );
};

export default AllProducts;
