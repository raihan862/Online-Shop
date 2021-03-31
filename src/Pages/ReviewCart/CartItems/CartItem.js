import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DetailSection from "../../ProductDetails/DetailSection";

const ShopItem = (props) => {
  const cartItem = useSelector((state) => state.cart.cart);
  return (
    <Row className="detail-in-cart">
      <Col xs={24} sm={8}>
        <Link to={`/product-details/${props.product._id}`}>
          <img src={props.product.image} alt={"product Img"} width="100%" />
        </Link>
      </Col>
      <Col xs={24} sm={14}>
        <DetailSection product={props.product} fromCart={true} />
      </Col>
    </Row>
  );
};

export default ShopItem;
