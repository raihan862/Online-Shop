import {
  MailOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../../assects/user.png";
import { updateLoginUser } from "../../../Store/Actions/AutheticationAction";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
const UserHome = () => {
  const user = useSelector((state) => state.authentication.user);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleCancle = () => {};
  const handleUpdate = (values) => {
    const newData = {
      ...user,
      name: values.name,
      email: values.email,
      role: values.role,
    };
    setLoading(true);
    dispatch(updateLoginUser(newData));
    setTimeout(() => {
      setEditMode(false);
      setLoading(false);
    }, 1000);
  };
  return (
    <div style={{ textAlign: "center", minHeight: "100vh" }}>
      {loading && <LoadingComponent />}
      <h1 style={{ fontSize: "30px", fontWeight: "700" }}>My Profile</h1>
      <Row className="user-home">
        <Col md={8} className="user-left">
          <img src={userImg} alt="user" />
        </Col>
        {!editMode ? (
          <Col md={16}>
            <div className="user-right">
              <h3>
                <UserOutlined /> <span className="value"> {user.name}</span>
              </h3>
              <h3>
                <MailOutlined />
                <span className="value"> {user.email}</span>
              </h3>
              <h3>
                <QuestionCircleOutlined />{" "}
                <span className="value"> {user.role}</span>
              </h3>

              <Button
                type="primary"
                onClick={() => setEditMode(true)}
                style={{ marginTop: "10px" }}
              >
                Edit Profile
              </Button>
            </div>
          </Col>
        ) : (
          <Col md={16} className="user-right">
            <Form
              name="basic"
              initialValues={{
                remember: true,
                name: user.name,
                email: user.email,
                role: user.role,
              }}
              onFinish={handleUpdate}
            >
              <Form.Item
                label="Userame"
                name="name"
                rules={[
                  {
                    required: true,

                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                type="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Inter Valid Email Address",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "select one Role",
                  },
                ]}
              >
                <Select
                  defaultValue="Select One Role"
                  placeholder="select Role"
                >
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="super">Super</Option>
                </Select>
              </Form.Item>
              <div className="footer-part">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={() => setEditMode(false)}>
                    Cancle
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default UserHome;
