import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../assects/logo.png";
import "./admin.css";
import AdminHeader from "./AdminHeader/AdminHeader";
import OrderTable from "./OrderTable/OrderTable";
import AddProduct from "./Products/AddProduct/AddProduct";
import AllProducts from "./Products/AllProdcuts/AllProducts";
import UsersTable from "./UsersTable/UsersTable";
const AdminMain = () => {
  const { role } = useParams();
  const user = useSelector((state) => state.authentication.user);

  return (
    <div className="admin-container">
      <Layout>
        <Sider style={{ height: "100vh" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item
              key={1}
              icon={<img src={logo} width="70" />}
              title="Home"
            ></Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Users">
              <Menu.Item key={2}>
                <Link to="/admin/user-list">User-list</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Orders">
              <Menu.Item key={3}>
                <Link to="/admin/orders/pending">Pending</Link>
              </Menu.Item>
              <Menu.Item key={4}>
                <Link to="/admin/orders/processing">Processing</Link>
              </Menu.Item>
              <Menu.Item key={10}>
                <Link to="/admin/orders/date">By Date</Link>
              </Menu.Item>
              {user.role == "super" && (
                <Menu.Item key={5}>
                  <Link to="/admin/orders/delivered">All</Link>
                </Menu.Item>
              )}
            </SubMenu>
            <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Products">
              <Menu.Item key={6}>
                <Link to="/admin/products">Products</Link>
              </Menu.Item>
              <Menu.Item key={7}>
                <Link to="/admin/add-product">Add</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content className="table-container">
            <AdminHeader />
            <Switch>
              <Route path="/admin/orders/:orderType">
                <OrderTable />
              </Route>
              <Route path="/admin/user-list">
                <UsersTable />
              </Route>
              <Route path="/admin/perday-orders">
                <h2>Daily Order</h2>
              </Route>
              <Route path="/admin/products">
                <AllProducts />
              </Route>
              <Route path="/admin/add-product">
                <AddProduct />
              </Route>
              <Route path="/">
                <UsersTable />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminMain;
