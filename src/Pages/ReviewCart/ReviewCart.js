import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart/Cart";
import CartItem from "./CartItems/CartItem";
import "./review.css";
const ReviewCart = () => {
  const cartItem = useSelector((state) => state.cart.cart);
  console.log(cartItem);

  return (
    <div className="container-class">
      {cartItem.length ? (
        <div>
          <Row className="cart-container">
            <Col xs={24} sm={14} md={16} className="review-items">
              {cartItem.map((product) => (
                <CartItem product={product} counter={true} key={product.key} />
              ))}
            </Col>
            <Col xs={24} sm={24} md={8} className="cart-section">
              <Cart></Cart>
            </Col>
          </Row>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>No item in the Cart</h1>
      )}
    </div>
  );
};

export default ReviewCart;
