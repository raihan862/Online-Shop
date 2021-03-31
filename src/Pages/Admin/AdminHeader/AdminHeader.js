import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../../Store/Actions/AutheticationAction";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogoutAction());
    localStorage.removeItem("token");
  };
  return (
    <div className="admin-header-container">
      <div className="left">
        <Button disabled={true}>Hi! Admin</Button>
      </div>
      <div className="right">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default AdminHeader;
