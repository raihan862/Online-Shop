import { Button, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartIcon from "../../assects/cart.png";
import HomeContent from "./Body/HomeContent";

const HomePageItem = () => {
  const [searchInput, setSearchInput] = useState("");

  const cartItem = useSelector((state) => state.cart.cart);
  const handleProductSearch = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="home-page-container">
      <div className="serach-bar">
        <div className="search-field">
          <Input
            placeholder="serach item"
            id="search-input"
            value={searchInput}
            onChange={handleProductSearch}
          />
          <Button
            type=""
            id="search-button"
            disabled
            style={{ cursor: "pointer!importent" }}
          >
            Search
          </Button>
        </div>
        <Link to="/review-order">
          <div className="cart-field">
            <p>{cartItem.length}</p>
            <img src={cartIcon} alt="" width="50px" />
          </div>
        </Link>
      </div>
      <HomeContent searchInput={searchInput} />
    </div>
  );
};

export default HomePageItem;
