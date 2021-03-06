import React from "react";
import { useParams } from "react-router";
import authImg from "../../assects/auth.png";
import "./authentication.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
const Authentication = () => {
  const { form } = useParams();
  return (
    <div className="auth-container">
      
      <div className="auth-img">
        <img src={authImg} width="100%" alt="" />
      </div>
      <div className="auth-form">
      {form == "login" ? <div className="top">
       
          <img src="../../logo.png" alt="" width="150px" />
        </div>:<h2>Sign Up</h2>}
        <div>
          {/* <Login /> */}
          {form == "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
