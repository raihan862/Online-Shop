import { Button, Drawer } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../App";
import cartIcon2 from "../../../cart2.png";
import logo from "../../../logo.png";
import MenuItems from "./MenuItems";
const HeaderPart = () => {
  const [showDrader, setShowDrader] = useState(false);
  const { cart, product } = useContext(CartContext);
  const [cartItem, setCartItem] = cart;
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
