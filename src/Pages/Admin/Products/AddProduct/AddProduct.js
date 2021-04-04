import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrderDataAction } from "../../../../Store/Actions/OrderAction";
import { createProduct } from '../../../../Store/Actions/ProductActions';
import LoadingComponent from "../../../LoadingComponent/LoadingComponent";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [fileUp,setFileUp] = useState({})
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    let data = new FormData();
    data.append("title",values.title);
    data.append("price",values.price);
    data.append("description",values.description)
    data.append('category',values.category)
    data.append('file',fileUp)
   
    dispatch(createProduct(data));
  };
  const handleChange=(e) =>{
    setFileUp(e.target.files[0]);
  }
  const handleAddAnotherProduct = () => {
    products.success = false;

    dispatch(fetchOrderDataAction());
  };
  return (
    <div>
      {products.success ? (
        <div className="success">
          <h2>Successfully Added</h2>
          <Link to="/admin/add-product">
            <Button onClick={handleAddAnotherProduct}>
              Add another Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="product-form">
          {loading && <LoadingComponent />}
          {products.err && <p style={{ color: "red" }}>{products.err} </p>}

          <Form
            name="basic"
            initialValues={{
              remember: true,
               
            }}
            onFinish={onFinish}
            
          >
            <div className="left-form">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input Price",
                  },
                  {
                    type: "number",
                    message: "Inter Valid Number",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Image URl"
                name="image"
              >
                
                <input type="file" onChange={handleChange} required />
                  
              </Form.Item>

              <Form.Item label="" style={{ paddingLeft: "130px" }}>
                <Button type="primary" htmlType="submit" id="add-product">
                  Add Product
                </Button>
              </Form.Item>
            </div>
            <div className="right-form">
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "select one Catagory",
                  },
                ]}
              >
                <Select
                  defaultValue="Select One Category"
                  placeholder="select category"
                >
                  <Option value="men clothing">Men Clothing</Option>
                  <Option value="women clothing">Women Clothing</Option>
                  <Option value="jewelery">Jewelery</Option>
                  <Option value="electronics">Electronics</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input Description",
                  },
                ]}
              >
                <TextArea rows={7} cols={7} />
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
