import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLogin } from "../../../Store/Actions/AutheticationAction";

const Login = () => {
  const Authentication = useSelector((state) => state.authentication);
  const history = useHistory();
  const dispatch = useDispatch();
  if (
    Authentication.token &&
    Authentication.token == localStorage.getItem("token")
  ) {
    history.push("/");
  }
  const onFinish = async (values) => {
    dispatch(userLogin({ name: values.username, password: values.password }));
    // .then(() => {
    //   history.push("/");
    // })
    // .catch(() => {
    //   history.push("/item-order");
    // });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {Authentication.errMessage && (
          <p style={{ color: "red" }}>{Authentication.errMessage}</p>
        )}
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

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
