import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartContext } from "../../App";
import DetailSection from "./DetailSection";
import "./product.css";

const ProductsDetails = () => {
  const { productId } = useParams();
  const { cart, product: p } = useContext(CartContext);
  const [products, setProducts] = p;
  const [product, setProduct] = useState({});
  useEffect(() => {
    const p = products?.filter((p) => p._id == productId);
    if (p) {
      setProduct({ ...p[0], quantity: 1 });
    }
  }, []);

  return (
    <div className="product-container">
      <div className="top-section">
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col xm={20} sm={8} md={8} lg={8} className="product-img">
            <img src={product.image} alt="" width="90%"/>
          </Col>
          <Col xm={20} sm={16} md={16} lg={16}>
            <DetailSection product={product} />
            <div style={{ padding: "0px 10px" }}>
              <h4 style={{ marginTop: "15px" }}>Description</h4>
              <ul style={{ color: "gray" }}>
                {product.description?.split(". ").map((d) => (
                  <li>{d}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductsDetails;
