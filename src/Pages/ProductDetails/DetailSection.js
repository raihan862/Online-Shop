import {
  MinusCircleFilled,
  PlusCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useContext, useState } from "react";
import { CartContext } from "../../App";

const DetailSection = (props) => {
  const product = props.product;

  const { cart } = useContext(CartContext);
  const [cartItem, setCartItem] = cart;
  const [cartMessage, setCartMessage] = useState({ mgs: "", color: "" });
  const handleIncreaseQuantity = (e) => {
    const i = cartItem.findIndex((item) => item._id === product._id);
    cartItem[i].quantity = product.quantity + 1;
    setCartItem([...cartItem]);
  };

  const handleDecreaseQuantity = (e) => {
    const i = cartItem.findIndex((item) => item._id === product._id);
    if (product.quantity > 1) {
      cartItem[i].quantity = product.quantity - 1;
      setCartItem([...cartItem]);
    }
  };
  const handleAddToCart = (e) => {
    const isInCart = cartItem.findIndex((item) => item._id == product._id);
    if (isInCart == -1) {
      setCartItem([...cartItem, product]);
      setCartMessage({ mgs: "Added To Cart", color: "green" });
      setTimeout(() => {
        setCartMessage({ mgs: "", color: "" });
      }, 1000);
    } else {
      setCartMessage({ mgs: "This Producyt is Already In Cart", color: "red" });
      setTimeout(() => {
        setCartMessage({ mgs: "", color: "" });
      }, 1000);
    }
  };
  const handleRemoveFromCart = (e) => {
    const filterData = cartItem.filter((item) => item._id !== product._id);
    setCartItem(filterData);
  };

  return (
    <>
      <h2>{product.title}</h2>
      <Row className="details">
        <Col xs={20} sm={10} md={10}>
          <div>
            <h4>
              Catagory :<span> {product.category}</span>
            </h4>

            <h3>Price : {product.price}</h3>
          </div>
          {props.fromCart && (
            <div className="quantity-section">
              <Button onClick={handleDecreaseQuantity}>
                <MinusCircleFilled />
              </Button>
              <p>{product.quantity}</p>
              <Button onClick={handleIncreaseQuantity}>
                <PlusCircleFilled />
              </Button>
            </div>
          )}
          <h5 style={{ color: `${cartMessage.color}` }}>{cartMessage.mgs}</h5>
          {props.fromCart ? (
            <Button
              type="primary"
              className="cartBtn"
              onClick={handleRemoveFromCart}
            >
              Remove Item
            </Button>
          ) : (
            <Button
              type="primary"
              className="cartBtn"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          )}
        </Col>
        <Col xs={20} sm={12} md={12}>
          <h4>
            Rating :<span style={{ paddingRight: "5px" }}> </span>
            {Array.from(Array(3), (e) => (
              <span style={{ paddingLeft: "2px" }}>
                <StarFilled style={{ color: "orange", fontSize: "20px" }} />
              </span>
            ))}
          </h4>
        </Col>
      </Row>
    </>
  );
};

export default DetailSection;