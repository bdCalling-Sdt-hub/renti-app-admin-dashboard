import { Button } from "antd";
import React from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Outlet, useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const style = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginBottom: "10px",
    },
  };
  const menuItems = [
    {
      key: "1",
      title: "Personal Information",
      link: "personal-information",
    },
    {
      key: "2",
      title: "Notification",
      link: "notification",
    },
    {
      key: "3",
      title: "Change Password",
      link: "change-password",
    },
    {
      key: "4",
      title: "Login Activity",
      link: "login-activity",
    },
    {
      key: "5",
      title: "Block List",
      link: "block-list",
    },
    {
      key: "6",
      title: "Renti Percentage",
      link: "renti-percentage",
    },
    {
      key: "7",
      title: "Host Payment Time",
      link: "host-payment-time",
    },
    {
      key: "8",
      title: "Trash",
      link: "trash",
    },
    {
      key: "9",
      title: "Privacy Policy",
      link: "privacy-policy",
    },
    {
      key: "10",
      title: "Terms and Condition",
      link: "terms-condition",
    },
    {
      key: "11",
      title: "About Us",
      link: "about-us",
    },
  ];

  const handleNavigate = (value) => {
    navigate(`/setting/${value}`);
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "10px", fontWeight: "normal" }}>Settings</h2>
      <div style={style.formContainer}>
        {menuItems.map((item) => (
          <Button
            onClick={() => handleNavigate(item.link)}
            key={item.key}
            block
            style={style.btn}
          >
            <span>{item.title}</span>
            <LiaAngleRightSolid fontSize={20} />
          </Button>
        ))}
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
