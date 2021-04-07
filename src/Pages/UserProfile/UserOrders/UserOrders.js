import { Button, Card, Col, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchuserOrders } from "../../../Store/Actions/OrderAction";
import OrderDetails from "../../Admin/OrderTable/OrderDetails";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const UserOrders = () => {
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.authentication.user);
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [color, setColor] = useState("");
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const handleShowDetails = (data) => {
    setDetailData(data);
    setVisible(true);
  };
  useEffect(() => {
    dispatch(fetchuserOrders(user._id));
    setLoading(true);
    setTimeout(() =>setLoading(false),1000)
  }, []);
  return (
    <div className="user-orders">
       {loading  && <LoadingComponent />}
      <h2 style={{fontWeight:700,padding:"20px 15px"}}>Your Orders</h2>
      <div className="orders-container">
        {orders.orders.length<1 && !loading  && <div className="empty-order">
          <h2>You Do Not Order yet</h2>
          <h4>Please go To product Page to Order Some Thing</h4>
          </div>}
        <Row style={{ justifyContent: "space-around" }}>
          {orders.orders.map((order) => (
            <Col
              md={12}
              lg={10}
              xl={8}
              key={order._id}
              style={{ marginTop: "10px", padding: "10px" }}
            >
              <Card
                title="Status"
                extra={
                  <Button>
                    {order.status == "pending" ? (
                      <span style={{ color: "red" }}>{order.status}</span>
                    ) : order.status == "processing" ? (
                      <span style={{ color: "rgb(131, 129, 14)" }}>
                        {order.status}
                      </span>
                    ) : (
                      <span style={{ color: "blue" }}>{order.status}</span>
                    )}
                  </Button>
                }
                style={{ width: 300 }}
              >
                <Row>
                  <Col>
                    <h4>Date</h4>
                  </Col>
                  <Col>
                    <p className="value">{order.date}</p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h4>Price</h4>
                  </Col>
                  <Col>
                    <p className="value" s>
                      {order.totalOrderPrice}
                    </p>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "space-between" }}>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => handleShowDetails(order.details)}
                    >
                      Details
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <OrderDetails data={detailData} />
      </Modal>
    </div>
  );
};

export default UserOrders;
