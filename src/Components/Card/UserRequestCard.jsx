import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import axios from "../../../Config";
import { imgUrl } from "../../../ImageConfig";

const UserRequestCard = ({ cardData, setAutoReload }) => {
  const { _id, fullName, email, phoneNumber, approved, isBanned, image } =
    cardData.user;

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
        `/api/user/approve-user/${_id}`,
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
            title: "Successfull",
            text: `${fullName} approved`,
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
            text: "User canceled successfully",
          });
          setAutoReload((prev) => prev + 1);
        }
      });
  };

  return (
    <Col span={6}>
      <div style={style.cardStyle}>
        <img
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          src={`${imgUrl}${image}`}
          alt=""
        />
        <h2 style={{ color: "#000B90", marginTop: "20px" }}>{fullName}</h2>
        <p>{email}</p>
        <p>{phoneNumber}</p>
        <div style={{ marginTop: "20px" }}>
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

export default UserRequestCard;
