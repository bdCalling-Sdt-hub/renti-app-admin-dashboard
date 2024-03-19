import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import baseAxios from "../../../Config";
import { imgUrl } from "../../../ImageConfig";

const CarBlockCard = ({ data, setBannedCarReload }) => {
  const { _id, image, carOwner, carModelName } = data;
  console.log(data);

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
    },
  };

  const token = localStorage.token;

  const handleUnblock = () => {
    baseAxios
      .post(
        `api/car/banned/${_id}`,
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
          setBannedCarReload((prev) => prev + 1);
        }
      });
  };

  const handleCancel = () => {
    baseAxios
      .post(
        `api/car/banned/${_id}`,
        { isCarActive: "trash" },
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
            text: "Car canceled successfully",
          });
          setBannedCarReload((prev) => prev + 1);
        }
      });
  };

  return (
    <Col span={6}>
      <div style={style.cardStyle}>
        <img
          src={`${imgUrl}${image[0]}`}
          alt=""
          style={{ width: "120px", height: "120px", borderRadius: "50%" }}
        />
        <h2 style={{ color: "#000B90", marginBottom: "5px" }}>
          {carModelName}
        </h2>

        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={handleCancel}
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

export default CarBlockCard;
