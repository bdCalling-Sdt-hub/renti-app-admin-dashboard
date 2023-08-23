/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Badge, Button, Input, Typography } from "antd";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import cardImg from "../../Images/Cards.png";
const { Title } = Typography;

const DrawerPage = (props) => {
  return (
    <>
      {props.earningData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <img width={120} src="https://i.imgur.com/JFHjdNr.jpg" alt="" />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.earningData.username}</p>
              <p>INE: SNHRM570818MDFPM10</p>
              <p>Trip Completes:{props.earningData.status.length}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>
              Trip Details{" "}
              <Badge
                className="site-badge-count-109"
                count={"complete"}
                style={{ backgroundColor: "#E6F6F4", color: "#00A991" }}
              />
            </Title>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}
      {props.hostData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid #B0B3DD",
            }}
          >
            <div>
              <img width={120} src="https://i.imgur.com/JFHjdNr.jpg" alt="" />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.hostData?.name}</p>
              <p>INE: SNHRM570818MDFPM10</p>
              <p>Trip Completes: 5</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Email</label>
              <Input readOnly style={{ height: "45px" }} />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Phone</label>
              <Input readOnly style={{ height: "45px" }} />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Address</label>
              <Input readOnly style={{ height: "45px" }} />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3>Payment Method</h3>
            <img width="80" style={{ margin: "10px 0" }} src={cardImg} alt="" />
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Credit Card Number</label>
                <Input readOnly style={{ height: "45px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Number</label>
                <Input readOnly style={{ height: "45px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Holder Name</label>
                <Input readOnly style={{ height: "45px" }} />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Block
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawerPage;
