import { Badge, Button, Typography } from "antd";
import React from "react";
import { AiFillStar } from "react-icons/ai";
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
              gap: 20,
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
                width: "220px",
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
                width: "220px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}


      {
        props.invoiceData && <div>
        <div style={{ display: "flex", gap: "15px" }}>
          <div>
            <img width={120} src="https://i.imgur.com/JFHjdNr.jpg" alt="" />
          </div>
          <div style={{ marginTop: "-7px" }}>
            <p style={{ fontSize: "20px" }}>{props.invoiceData.username}</p>
            <p>INE: SNHRM570818MDFPM10</p>
            <p>Trip Completes:{props.invoiceData.status.length}</p>
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
            gap: 20,
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
              width: "220px",
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
              width: "220px",
            }}
          >
            Print
          </Button>
        </div>
      </div>
      }
    </>
  );
};

export default DrawerPage;
