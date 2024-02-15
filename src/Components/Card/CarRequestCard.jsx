import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import baseAxios from "../../../Config";
import { imgUrl } from "../../../ImageConfig";

const CarRequestCard = ({ data, setAutoReload }) => {
  const { _id, image, carOwner, carModelName } = data;

  console.log(data);

  const style = {
    cardStyle: {
      background: "#E6E7F4",
      padding: "15px",
      textAlign: "center",
      borderRadius: "10px",
    },
    cardBtn: {
      color: "white",
      height: "40px",
      width: "100px",
    },
  };

  const token = localStorage.token;

  const handleApprove = () => {
    baseAxios
      .post(
        `api/car/approve-car/${_id}`,
        { isCarActive: "Active" },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Successful",
            text: `${carModelName} approved`,
          });
          setAutoReload((prev) => prev + 1);
        }
      });
  };

  const handleCancel = () => {
    baseAxios
      .post(
        `api/car/approve-car/${_id}`,
        { isCarActive: "Cancel" },
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
            text: "Car cancel successfully",
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
          src={`${imgUrl}${image[0]}`}
          alt=""
        />
        <h2 style={{ color: "#000B90", marginTop: "10px" }}>{carModelName}</h2>
        <p>
          <span style={{ fontWeight: "bold" }}>Owner name:</span>{" "}
          {carOwner?.fullName}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Owner name:</span>{" "}
          {carOwner?.email}
        </p>
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

export default CarRequestCard;
