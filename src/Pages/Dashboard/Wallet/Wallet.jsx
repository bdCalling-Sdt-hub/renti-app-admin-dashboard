import { Pie } from "@ant-design/plots";
import { Button, Col, Progress, Row, Typography } from "antd";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import WalletCard from "./WalletCard";
const { Title } = Typography;

const Wallet = () => {
  const cardData = [
    {
      id: "1",
      validDate: "12/23",
      cardHolder: "Sanchez Haro Manuel",
      cardNumber: "**********4584",
    },
    {
      id: "2",
      validDate: "14/28",
      cardHolder: "Captain Jack Sparrow",
      cardNumber: "**********4670",
    },
    {
      id: "3",
      validDate: "12/24",
      cardHolder: "Pirates of Caribbean",
      cardNumber: "**********3658",
    },
    {
      id: "4",
      validDate: "15/25",
      cardHolder: "Kate Winslate",
      cardNumber: "**********8989",
    },
  ];

  const style = {
    progContainer: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "15px",
      height: "300px",
      border: "2px solid #000B90",
    },
    cardContainer: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "15px",
      marginTop: "40px",
    },
    addCardBtn: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      background: "#000B90",
      color: "white",
      height: "40px",
    },

    title: {
      color: "#8d8d8d",
      marginBottom: "8px",
      fontWeight: "normal",
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
  const colors = ["#FF7426", "#1EAAE7", "#2BC155", "#6418C3"];

  return (
    <div style={{ padding: "0 60px" }}>
      <h2>Renti's Wallet</h2>

      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 12 }}>
          <div style={style.progContainer}>
            <h4 style={{ marginBottom: "20px" }}>Main Balance</h4>
            <h3 style={{ marginBottom: "20px" }}>$567,856.00</h3>
            <Progress
              percent={50}
              size={["100%", 20]}
              showInfo={false}
              status="active"
              strokeColor={"#000B90"}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px",
              }}
            >
              <div>
                <h3 style={style.title}>Valid Date</h3>
                <h3 style={{ fontWeight: "normal" }}>12/23</h3>
              </div>
              <div>
                <h3 style={style.title}>Card Holder</h3>
                <h3 style={{ fontWeight: "normal" }}>Sanchez Haro Manuel</h3>
              </div>
              <div>
                <h3 style={style.title}>Card Number</h3>
                <h3 style={{ fontWeight: "normal" }}>**********1234</h3>
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
              border: "2px solid #000B90",
            }}
          >
            <Pie {...config} />
          </div>
        </Col>
      </Row>
      <div style={style.cardContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Title level={3} style={{ color: "#000B90" }}>
            Card List
          </Title>
          <Button style={style.addCardBtn}>
            <AiOutlinePlus style={{ fontSize: "15px" }} /> Add Card
          </Button>
        </div>
        {cardData.map((data, index) => (
          <WalletCard key={data.id} cardBg={colors[index]} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Wallet;
