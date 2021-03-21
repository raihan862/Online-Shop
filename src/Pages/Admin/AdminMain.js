import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./admin.css";
import UsersTable from "./UsersTable/UsersTable";
const AdminMain = () => {
  const products = useSelector((state) => state.products);
  const { role } = useParams();
  return (
    <div className="admin-container">
      <Layout>
        <Sider style={{ height: "100vh" }}>
          <ul>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </Sider>
        <Layout>
          <Content className="table-container">
            <UsersTable />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminMain;
