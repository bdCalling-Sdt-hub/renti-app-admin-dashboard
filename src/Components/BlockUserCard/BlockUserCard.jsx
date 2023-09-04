import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import axios from "../../../Config";
import img from "../../Images/Photo.png";

const BlockUserCard = ({ data, setReload }) => {
  const { fullName, email, phoneNumber, approved } = data;

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

  const token = localStorage.token;

  const handleUnblock = async () => {
    const response = await axios.get(
      "api/user/blocked/all",
      { isApprove: "cancel" },
      {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Wow!",
        text: "User unblock successfully",
      });
      setReload((prev) => prev + 1);
    }
  };

  return (
    <Col span={8}>
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
          <Button
            style={{ background: "#000B90", ...style.cardBtn }}
            onClick={handleUnblock}
          >
            Unblock
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default BlockUserCard;
