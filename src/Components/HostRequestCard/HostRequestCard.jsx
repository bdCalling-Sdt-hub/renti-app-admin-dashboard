import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import axios from "../../../Config";
import img from "../../Images/Photo.png";

const HostRequestCard = ({ cardData, setAutoReload }) => {
  const { _id, fullName, email, phoneNumber, approved, isBanned } =
    cardData.host;

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

  const handleApprove = () => {
    axios
      .post(
        `api/user/approve/${_id}`,
        { approved: true },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          setAutoReload((prev) => prev + 1);
        }
      });
  };

  const handleCancel = () => {
    axios
      .post(
        `api/user/banned/${_id}`,
        { isApprove: "trash" },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: "User cancel successfully",
          });
          setAutoReload((prev) => prev + 1);
        }
      });
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
            onClick={handleCancel}
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
            onClick={handleApprove}
          >
            Approve
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default HostRequestCard;
