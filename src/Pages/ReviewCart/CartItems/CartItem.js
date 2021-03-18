import { Col, Row } from "antd";
import React, { useContext } from "react";
import { CartContext } from "../../../App";
import DetailSection from "../../ProductDetails/DetailSection";

const ShopItem = (props) => {
  const { cart } = useContext(CartContext);
  const [cartItem, setCartItem] = cart;
  return (
    <Row className="detail-in-cart">
      <Col xs={24} sm={8}>
        <img src={props.product.image} alt={"product Img"} width="100%" />
      </Col>
      <Col xs={24} sm={14}>
        <DetailSection product={props.product} fromCart={true} />
      </Col>
    </Row>
  );
};

export default ShopItem;
