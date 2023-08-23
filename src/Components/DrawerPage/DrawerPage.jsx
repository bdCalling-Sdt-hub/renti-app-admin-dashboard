import { Badge, Button, Typography } from "antd";
import React from "react";
import { AiFillStar } from "react-icons/ai";
const { Title } = Typography;



const DrawerPage = (props) => {
  console.log("tushar",props.invoiceData);
  return (
    <div>
        <div style={{ display: "flex", gap: "15px" }}>
          <div>
            <img width={200} height={200} style={{borderRadius:"10px"}} src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg" alt="" />
          </div>
          <div style={{ marginTop: "7px" }}>
            <p style={{ fontSize: "20px" }}>{props.invoiceData.username}</p>
            <p>INE: {props.invoiceData.invoiceNo}</p>
            <p>Trip Completes:50</p>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
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
        <div style={{ display: "flex", gap: 20,position:"absolute",bottom:0}}>
          <Button
            
            style={{ background: "#000B90", color: "white", height: 50,width:"220px"}}
          >
            Download
          </Button>
          <Button
           
            style={{ background: "#000B90", color: "white", height: 50,width:"220px" }}
          >
            Print
          </Button>
        </div>
      </div>
  );
};

export default DrawerPage;
