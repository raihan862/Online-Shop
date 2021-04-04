import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography
} from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  updateUser
} from "../../../Store/Actions/UserAction";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
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
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "select" ? (
      <Select>
        <Option value="user">User</Option>
        <Option value="admin">Admin</Option>
        <Option value="super">Super</Option>
      </Select>
    ) : (
      <Input />
    );
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

const UsersTable = () => {
  const [form] = Form.useForm();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [role, setRole] = useState("");
  const [showmodal, setShowModal] = useState(true);
  const [editingId, setEditingId] = useState("");

  let data = users.users;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const isEditing = (record) => record._id === editingId;

  const handleSelectChange = () => {};
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
  const handlePaging = (pageNumber) => {
    dispatch(fetchUsers(pageNumber));
  }
  const handleDelete = (record) => {
    setShowModal(true);
    setLoad(true);
    setTimeout(() => {
      dispatch(deleteUser(record._id));
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
        name: row.name,
        email: row.email,
        role: row.role,
      };
      setEditingId("");
      setLoad(true);
      setTimeout(() => {
        dispatch(updateUser(editedData));
        setLoad(false);
      }, 1000);
    } catch (errInfo) {}
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      key: "email",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "15%",
      key: "role",
      editable: true,
    },
    {
      title: "operation",
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
        inputType:
          col.dataIndex === "age"
            ? "number"
            : col.dataIndex === "role"
            ? "select"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      {(users.loading || load) && <LoadingComponent />}
      {users.err && (
        <Modal
          title="Basic Modal"
          visible={showmodal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        >
          <p style={{ color: "red" }}>{users.err}</p>
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
            onChange: handlePaging,
            pageSize: 9,
            total:users.count
          }}
          
        />
      </Form>
    </>
  );
};

export default UsersTable;
