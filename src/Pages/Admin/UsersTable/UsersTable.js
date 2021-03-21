import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../../Store/Actions/UserAction";
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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    editable: true,
  },
  {
    title: "Action",

    key: "action",
    render: () => <Button>Edit</Button>,
  },
];

const UsersTable = () => {
  const [form] = Form.useForm();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  let data = users.users;
  const [editingId, setEditingId] = useState("");

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
  const handleDelete = (record) => {
    dispatch(deleteUser(record._id));
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
      dispatch(updateUser(editedData));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
          onChange: cancel,
          pageSize: 6,
        }}
      />
    </Form>
  );
};

export default UsersTable;
