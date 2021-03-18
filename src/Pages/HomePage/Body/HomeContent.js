import { StarFilled } from "@ant-design/icons";
import { Card, Col, Divider, Row } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../App";
const HomeContent = (props) => {
  const { cart, product } = useContext(CartContext);
  const [products, setProducts] = product;
  const filterProduct = products?.filter((product) =>
    product.title.toLowerCase().includes(props.searchInput.toLowerCase())
  );
  return (
    <div style={{ padding: "10px" }}>
      <Row style={{ justifyContent: "space-around" }}>
        {filterProduct?.map((dt) => (
          <Col
            sm={16}
            md={11}
            lg={7}
            style={{
              boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.1)",
              marginTop: "15px",
              borderRadius: "15px",
            }}
          >
            <Link to={`/product-details/${dt._id}`}>
              <Card hoverable cover={<img alt="example" src={dt.image} />}>
                <Divider />
                <h3> {dt.title}</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Price: {dt.price}</h3>
                  <h3>
                    <span style={{ paddingRight: "5px" }}>Rating:</span>
                    {Array.from(Array(3), (e) => (
                      <span style={{ paddingLeft: "2px" }}>
                        <StarFilled
                          style={{ color: "orange", fontSize: "20px" }}
                        />
                      </span>
                    ))}
                  </h3>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeContent;
