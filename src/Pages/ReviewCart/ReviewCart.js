import { Col, Row } from "antd";
import React, { useContext } from "react";
import { CartContext } from "../../App";
import Cart from "./Cart/Cart";
import CartItem from "./CartItems/CartItem";
import "./review.css";
const ReviewCart = () => {
  const { cart, product } = useContext(CartContext);
  const [cartItem, setCartItem] = cart;
  return (
    <div className="container-class">
      {cartItem.length ? (
        <div>
          <Row className="cart-container">
            <Col xs={24} sm={14} md={16} className="review-items">
              {cartItem.map((product) => (
                <CartItem
                  product={product}
                  counter={true}
                  key={product.key}
                ></CartItem>
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
