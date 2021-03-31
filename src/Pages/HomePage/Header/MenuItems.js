import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { userLogoutAction } from "../../../Store/Actions/AutheticationAction";
const MenuItems = () => {
  const { md, lg, xl } = useBreakpoint();
  const dispatch = useDispatch();
  const history = useHistory();
  const Authentication = useSelector((state) => state.authentication);
  const handleLogout = () => {
    history.replace("/");
    dispatch(userLogoutAction());

    localStorage.removeItem("token");
  };
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="home">
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="blog">
        <NavLink to="/review-order">Review Cart</NavLink>
      </Menu.Item>

      {Authentication.token ? (
        <>
          <Menu.Item
            className="right"
            btnStyle
            key="logout"
            onClick={handleLogout}
          >
            <NavLink to="" disabled>
              Logout
            </NavLink>
          </Menu.Item>
          {md ? (
            <Menu.Item className="right" key="profile" title="Profile">
              <NavLink to="/user-profile">
                <UserOutlined />
                Profile
              </NavLink>
            </Menu.Item>
          ) : (
            <SubMenu key="sub1" title="Profile">
              <Menu.Item key={2}>
                <Link to="/user-profile/">Profile</Link>
              </Menu.Item>
              <Menu.Item key={3}>
                <Link to="/user-profile/user-orders">Orders</Link>
              </Menu.Item>
            </SubMenu>
          )}
        </>
      ) : (
        <>
          <Menu.Item className="right btnStyle" key="signin">
            <NavLink to="/user/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item className="right btnStyle" key="signup">
            <NavLink to="/user/signup">Signup</NavLink>
          </Menu.Item>
        </>
      )}
      {Authentication.user.role === "admin" && (
        <Menu.Item className="right" key="admin">
          <NavLink to="/admin">Admin</NavLink>
        </Menu.Item>
      )}
      {Authentication.user.role === "super" && (
        <Menu.Item className="right" key="admin">
          <NavLink to="/admin">Super Admin</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MenuItems;
