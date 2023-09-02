import { Button, Col } from "antd";
import React from "react";
import img from "../../Images/Photo.png";

const HostRequestCard = ({ cardData }) => {
  const { fullName, email, phoneNumber } = cardData.host;
  const style = {
    cardStyle: {
      background: "#E6E7F4",
      padding: "15px",
      textAlign: "center",
      borderRadius: "10px",
    },
    cardBtn: {
      color: "white",
    },
  };

  return (
    <Col span={9}>
      <div style={style.cardStyle}>
        <img src={img} alt="" />
        <h2 style={{ color: "#000B90", marginBottom: "5px" }}>{fullName}</h2>
        <p>{email}</p>
        <p style={{ margin: "8px 0" }}>{phoneNumber}</p>
        <div>
          <Button
            className={style.cardBtn}
            style={{
              background: "#D7263D",
              ...style.cardBtn,
              marginRight: "10px",
            }}
          >
            Cancel
          </Button>
          <Button style={{ background: "#000B90", ...style.cardBtn }}>
            Approve
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default HostRequestCard;
