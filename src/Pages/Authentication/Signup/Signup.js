import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { createUser } from "../../../Store/Actions/UserAction";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
const { Option } = Select;
const Signup = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    dispatch(createUser(values));
    setTimeout(() => {
      setLoading(false);
      history.replace("/user/login");
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="">
      {loading && <LoadingComponent />}
      {users.err && <p style={{ color: "red" }}>{users.err} </p>}
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
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
          <Select defaultValue="Select One Role" placeholder="select Role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option value="super">Super</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Form.Item>
      </Form>
      <p>
        Have An Account? <Link to="/user/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
