import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartIcon2 from "../../../assects/cart2.png";
import logo from "../../../assects/logo.png";
import MenuItems from "./MenuItems";
const HeaderPart = () => {
  const [showDrader, setShowDrader] = useState(false);
  const cartItem = useSelector((state) => state.cart.cart);

  return (
    <nav className="menu-bar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" width="70px" />
        </Link>
      </div>

      <div className="menu-con">
        <MenuItems />
        <Link to="/review-order">
          <div className="cart-field2">
            <p>{cartItem.length}</p>
            <img src={cartIcon2} alt="" width="50px" />
          </div>
        </Link>
        <Button className="drawerBtn" onClick={() => setShowDrader(true)}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={() => setShowDrader(false)}
          visible={showDrader}
        >
          <MenuItems />
        </Drawer>
      </div>
    </nav>
  );
};

export default HeaderPart;
