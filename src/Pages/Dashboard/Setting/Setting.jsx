import { Button } from "antd";
import React from "react";
import { LiaAngleRightSolid } from "react-icons/lia";

const Setting = () => {
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
      link: "",
    },
    {
      key: "2",
      title: "Notification",
      link: "",
    },
    {
      key: "3",
      title: "Change Password",
      link: "",
    },
    {
      key: "4",
      title: "Login Activity",
      link: "",
    },
    {
      key: "5",
      title: "Block List",
      link: "",
    },
    {
      key: "6",
      title: "Renti Percentage",
      link: "",
    },
    {
      key: "7",
      title: "Host Payment Time",
      link: "",
    },
    {
      key: "8",
      title: "Trash",
      link: "",
    },
    {
      key: "9",
      title: "Privacy Policy",
      link: "",
    },
    {
      key: "10",
      title: "Terms and Condition",
      link: "",
    },
    {
      key: "11",
      title: "About Us",
      link: "",
    },
  ];
  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "10px", fontWeight: "normal" }}>Settings</h2>
      <div style={style.formContainer}>
        {menuItems.map((item) => (
          <Button key={item.key} block style={style.btn}>
            <span>{item.title}</span>
            <LiaAngleRightSolid fontSize={20} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Setting;
