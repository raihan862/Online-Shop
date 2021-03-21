import { Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogoutAction } from "../../../Store/Actions/AutheticationAction";

const MenuItems = () => {
  const { md } = useBreakpoint();
  const dispatch = useDispatch();
  const Authentication = useSelector((state) => state.authentication);
  const handleLogout = () => {
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
      <Menu.Item key="contact">
        <NavLink to="/contact">Contact</NavLink>
      </Menu.Item>
      {Authentication.user.role === "admin" && (
        <Menu.Item className="right" key="admin">
          <NavLink to="/admin/admin">Admin</NavLink>
        </Menu.Item>
      )}
      {Authentication.user.role === "super" && (
        <Menu.Item className="right" key="admin">
          <NavLink to="/admin/super">Super Admin</NavLink>
        </Menu.Item>
      )}
      {Authentication.token ? (
        <>
          <Menu.Item className="right" key="profile">
            <NavLink to="" disabled>
              {Authentication.user.name}
            </NavLink>
          </Menu.Item>
          <Menu.Item className="right" key="logout" onClick={handleLogout}>
            <NavLink to="" disabled>
              Logout
            </NavLink>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item className="right" key="signin">
            <NavLink to="/user/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item className="right" key="signup">
            <NavLink to="/user/signup">Signup</NavLink>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default MenuItems;
