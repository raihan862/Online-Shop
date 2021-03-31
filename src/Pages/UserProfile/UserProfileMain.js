import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import UserHome from "./UserHome/UserHome";
import UserOrders from "./UserOrders/UserOrders";
import "./userProfile.css";
const UserProfileMain = () => {
  const user = useSelector((state) => state.authentication.user);
  return (
    <div className="user-container">
      <Layout>
        <Sider style={{ minHeight: "100vh" }} className="user-sider">
          {/* <ul>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link to="/admin/user-list">User-list</Link>
            </li>
            <li>
              <Link to="/admin/perday-orders">Daily Orders</Link>
            </li>
          </ul> */}

          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key={1}>
              <Link to="/user-profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key={4}>
              <Link to="/user-profile/user-orders">Orders</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="table-container">
            <Switch>
              <Route path="/user-profile/user-orders">
                <UserOrders />
              </Route>
              <Route path="/">
                <UserHome />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserProfileMain;
