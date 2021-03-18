import { Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import { NavLink } from "react-router-dom";

const MenuItems = () => {
  const { md } = useBreakpoint();
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
      <Menu.Item className="right" key="signin">
        <NavLink to="/user/login">Login</NavLink>
      </Menu.Item>
      <Menu.Item className="right" key="signup">
        <NavLink to="/user/signup">Signup</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItems;
