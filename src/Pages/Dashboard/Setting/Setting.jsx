import { Button, Input, Modal, Switch } from "antd";
import React,{useState} from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
    notification: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginTop: "10px",
      backgroundColor: "#ffffff",
      border: "1px solid #d9d9d9",
      boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
      borderRadius: "6px",
      padding: "4px 15px",
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
      title: "Change Password",
      link: "change-password",
    },
    {
      key: "3",
      title: "Login Activity",
      link: "login-activity",
    },
    {
      key: "4",
      title: "Block List",
      link: "block-list",
    },
    {
      key: "5",
      title: "Renti Percentage",
      link: "renti-percentage",
    },
    {
      key: "6",
      title: "Host Payment Time",
      link: "host-payment-time",
    },
    {
      key: "7",
      title: "Trash",
      link: "trash",
    },
    {
      key: "8",
      title: "Privacy Policy",
      link: "privacy-policy",
    },
    {
      key: "9",
      title: "Terms and Condition",
      link: "terms-condition",
    },
    {
      key: "10",
      title: "About Us",
      link: "about-us",
    },
  ];

  const handleNavigate = (value) => {
    if(value=="renti-percentage"){
      setOpenModal(true)
    }else{
      navigate(`/setting/${value}`);
    };
    }
    

  const handleNotification = (e) => {
    console.log(e);
  };

  const setPercentage=()=>{
   alert("tushar");
   setOpenModal(false)
  }

  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: "normal" }}>Settings</h2>
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
        <div style={style.notification}>
          <span>Notification</span>
          <Switch
            onChange={(e) => handleNotification(e)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked
          />
        </div>
        <Modal
        title="Set Ranti's Percentage"
        centered
        open={openModal}
        onOk={() => setPercentage()}
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        okButtonProps={{ style: { width: '100%',backgroundColor:"#000b90",height:"40px",marginLeft:"-20px"} }}  // Adjust the width here
        cancelButtonProps={{ style: { display:"none" } }}
        width={500}
      >
        
        <Input placeholder="set your percentage" style={{height:"50px",margin:"20px 0px"}}/>
      
      </Modal>
      </div>
    </div>
  );
};

export default Setting;
