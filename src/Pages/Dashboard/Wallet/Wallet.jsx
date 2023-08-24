import { Pie } from "@ant-design/plots";
import { Col, Progress, Row } from "antd";
import React from "react";

const Wallet = () => {
  const style = {
    progContainer: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "15px",
      height: "300px",
    },
  };
  const data = [
    {
      type: "Total Income",
      value: 500000,
    },
    {
      type: "Total Cost",
      value: 451500,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 18,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    legend: {
      position: "bottom",
      layout: "horizontal",
    },
    style: {
      height: "240px",
    },
  };
  return (
    <div style={{ padding: "0 60px" }}>
      <h2>Renti's Wallet</h2>

      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 12 }}>
          <div style={style.progContainer}>
            <h4 style={{ marginBottom: "20px" }}>Main Balance</h4>
            <h3 style={{ marginBottom: "20px" }}>$567,856.00</h3>
            <Progress percent={50} size={["100%", 20]} showInfo={false} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <div>
                <h4 style={{ color: "#8d8d8d" }}>Valid Date</h4>
                <h5>12/23</h5>
              </div>
              <div>
                <h4 style={{ color: "#8d8d8d" }}>Card Holder</h4>
                <h5>Sanchez Haro Manuel</h5>
              </div>
              <div>
                <h4 style={{ color: "#8d8d8d" }}>Card Number</h4>
                <h5>**********1234</h5>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={{ span: 12 }}>
          <div
            className=""
            style={{
              padding: "30px",
              borderRadius: "15px",
              backgroundColor: "#fff",
            }}
          >
            <Pie {...config} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wallet;
