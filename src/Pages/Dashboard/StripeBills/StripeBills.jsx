import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Progress, Row } from "antd";
import React from "react";
import "./StripeBills.css";

import StripeBillsTable from "./StripeBillsTable";
function StripeBills() {
  return (
    <div style={{ padding: "0 60px" }}>
      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "15px",
            fontWeight: "normal",
          }}
        >
          Search
        </h2>
        <Col lg={{ span: 24 }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              size="large"
              placeholder="Search by name/email/phone"
              prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
            />
            <Button
              style={{
                height: "50px",
                width: "300px",
                backgroundColor: "#000b90",
                color: "#fff",
                fontSize: "20px",
              }}
            >
              Search
            </Button>
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: "20px", marginTop: "50px" }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <div
            className="host-payment-card payment"
            style={{ border: "1px solid #00a991" }}
          >
            <div className="progressbar">
              <Progress type="circle" percent={75} strokeColor="#00a991" />
            </div>
            <div className="total-payment">
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Total Payment
              </h1>
              <h3
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: ".2rem",
                  marginBottom: "15px",
                  color: "#00a991",
                }}
              >
                $ 25,50,20.00
              </h3>
            </div>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <div
            className="host-payment-card pending"
            style={{ border: "1px solid #eb6363" }}
          >
            <div className="progressbar">
              <Progress type="circle" percent={22} strokeColor="#eb6363" />
            </div>
            <div className="total-payment">
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Total Pending
              </h1>
              <h3
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                  marginBottom: "15px",
                  color: "#eb6363",
                }}
              >
                $ 505,202.00
              </h3>
            </div>
          </div>
        </Col>
      </Row>
      <h2
        style={{
          fontSize: "25px",
          marginBottom: "15px",
          fontWeight: "normal",
        }}
      >
        Stripe Bills
      </h2>
      <Row>
        <Col lg={{ span: 24 }}>
          <StripeBillsTable />
        </Col>
      </Row>
    </div>
  );
}

export default StripeBills;
