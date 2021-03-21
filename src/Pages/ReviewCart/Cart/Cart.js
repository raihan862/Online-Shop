import { Button, Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Cart = (props) => {
  const cartItem = useSelector((state) => state.cart.cart);

  let itemPrice = cartItem.reduce((total, curr) => {
    total += curr.price * curr.quantity;
    return Math.round(total);
  }, 0);
  let shipping = Math.round((itemPrice * 2) / 100);

  const tax = ((itemPrice + shipping) * 5) / 100;
  const total = itemPrice + shipping + tax;
  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h3>Order Review</h3>
      <h4>Item Ordered {cartItem.length}</h4>
      <div className="cart-items">
        <Row className="row-items">
          <Col>Item Price</Col>
          <Col>$ {itemPrice}</Col>
        </Row>
        <Row className="row-items">
          <Col>Shipping Cost</Col>
          <Col>$ {shipping}</Col>
        </Row>
        <Row className="row-items">
          <Col>Total Tax</Col>
          <Col>$ {tax} </Col>
        </Row>
        <Row className="row-items">
          <Col>
            <h4> Total Price</h4>
          </Col>
          <Col>
            <h4>$ {total} </h4>
          </Col>
        </Row>

        <Link to="/place-order">
          <Button type="default" style={{ width: "80%", borderRadius: "15px" }}>
            Place Order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
