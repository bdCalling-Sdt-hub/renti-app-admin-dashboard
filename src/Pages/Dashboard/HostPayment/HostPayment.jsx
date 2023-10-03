import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Progress, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../../Config";
import { HostPaymentData } from "../../../ReduxSlices/HostPaymentSlice";
import "./HostPayment.css";
import HostPaymentTable from "./HostPaymentTable";
function HostPayment() {
  const [searchData, setSearchData] = useState("");

  const [hostPayments, setHostPayments] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get("/api/income/host-payment", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setHostPayments(res.data);
      })
      .catch((err) => console.log(err));

    let data = {
      page: 1,
      limit: 3,
      search: searchData,
    };

    if (searchData == "") {
      dispatch(HostPaymentData(data));
    }
  }, [searchData]);

  const hostPaymentDataGetByPagination = (page) => {
    let data = {
      limit: 3,
      page: page,
      search: searchData,
    };
    if (!searchData) {
      dispatch(HostPaymentData(data));
    }
  };

  const hostPaymentDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
      limit: 3,
    };
    if (searchData) {
      dispatch(HostPaymentData(data));
    }
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          Search
        </h2>
        <Col lg={{ span: 24 }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              onChange={(e) => setSearchData(e.target.value)}
              size="large"
              placeholder="Search by name/email/phone/Trip no"
              prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
            />
            <Button
              onClick={hostPaymentDataGetBySearch}
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
              <Progress
                type="circle"
                percent={Math.round(hostPayments?.income?.hostTotalPercentage)}
                strokeColor="#00a991"
              />
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
                ${Math.round(hostPayments?.income?.hostTotalPayment)}
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
              <Progress
                type="circle"
                percent={Math.round(
                  hostPayments?.income?.hostPendingPercentage
                )}
              />
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
                ${hostPayments?.income?.hostTotalPending}
              </h3>
            </div>
          </div>
        </Col>
      </Row>
      <h2
        style={{
          fontSize: "25px",
          marginBottom: "10px",
          fontWeight: "normal",
        }}
      >
        Payment List
      </h2>
      <Row>
        <Col lg={{ span: 24 }}>
          <HostPaymentTable
            hostPaymentDataGetByPagination={hostPaymentDataGetByPagination}
            hostPaymentDataGetBySearch={hostPaymentDataGetBySearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HostPayment;
