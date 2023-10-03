import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import "./DashboardHome.css";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { GrHistory } from "react-icons/gr";
import { MdCarRental } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import InvoiceTable from "./InvoiceTable";
import MostRentCarChart from "./MostRentCarChart";
import DailyRentChart from "./dailyRentChart";

import { IncomeData } from "../../../ReduxSlices/IncomeGetSlice";
import { RecentEarningsData } from "../../../ReduxSlices/RecentEarningsSlice";
import { RentStatusData } from "../../../ReduxSlices/RentStatusSlice";
function DashboardHome() {
  const dispatch = useDispatch();

  const { incomeData } = useSelector((state) => state.IncomeData);

  const { rentStatus } = useSelector((state) => state.RentStatus);

  const recentDataGetByPagination = (page) => {
    let data = {
      income: "all",
      page: page,
    };
    dispatch(RecentEarningsData(data));
  };

  useEffect(() => {
    let data = {
      income: "all",
      page: 1,
    };
    dispatch(RecentEarningsData(data));
    dispatch(IncomeData());
    dispatch(RentStatusData());
  }, []);

  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <div>
      <h2
        style={{ fontSize: "25px", marginBottom: "15px", fontWeight: "normal" }}
      >
        Dashboard Overview
      </h2>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <div className="income-card">
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2
              style={{
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Today's income
            </h2>
            <h2
              style={{
                letterSpacing: ".2rem",
                marginBottom: "15px",
              }}
            >
              ${incomeData?.todayIncome}
            </h2>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <div className="income-card">
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2
              style={{
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Weekly income
            </h2>
            <h2
              style={{
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              ${incomeData?.weeklyIncome}
            </h2>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <div className="income-card">
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2
              style={{
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Monthly income
            </h2>
            <h2
              style={{
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              ${incomeData?.totalMonthlyIncome}
            </h2>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <div className="income-card">
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2
              style={{
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              All time income
            </h2>
            <h2
              style={{
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              ${incomeData?.totalIncome}
            </h2>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <div className="rent-status" style={{ backgroundColor: "#fff" }}>
            <MdCarRental style={{ fontSize: "1.5rem", color: "#000b90" }} />
            <div className="single-status">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#000b90",
                }}
              >
                Today's Rent
              </h2>
              <h3
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                  color: "gray",
                }}
              >
                {rentStatus?.todayRents?.length}
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
          lg={{ span: 6 }}
        >
          <div className="rent-status" style={{ backgroundColor: "#fff" }}>
            <GrHistory style={{ fontSize: "1.5rem", color: "#000b90" }} />
            <div className="single-status">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#000b90",
                }}
              >
                Pendings
              </h2>
              <h3
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                  color: "gray",
                }}
              >
                {rentStatus?.pendingRents?.length}
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
          lg={{ span: 6 }}
        >
          <div className="rent-status" style={{ backgroundColor: "#fff" }}>
            <SlRefresh style={{ fontSize: "1.5rem", color: "#000b90" }} />
            <div className="single-status">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#000b90",
                }}
              >
                Ongoing
              </h2>
              <h3
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                  color: "gray",
                }}
              >
                {rentStatus?.totalOnGoing?.length}
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
          lg={{ span: 6 }}
        >
          <div className="rent-status" style={{ backgroundColor: "#fff" }}>
            <BsFillCheckCircleFill
              style={{ fontSize: "1.5rem", color: "#000b90" }}
            />
            <div className="single-status">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#000b90",
                }}
              >
                Complete
              </h2>
              <h3
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                  color: "gray",
                }}
              >
                562
              </h3>
            </div>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 12 }}>
          <DailyRentChart />
        </Col>
        <Col lg={{ span: 12 }}>
          <div
            className=""
            style={{
              border: "3px solid #000b90",
              padding: "30px",
              borderRadius: "15px",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ color: "#000b90" }}>Most using car</h2>
            <MostRentCarChart />
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
        >
          Recent Earnings
        </h2>
      </Row>
      <InvoiceTable recentDataGetByPagination={recentDataGetByPagination} />
    </div>
  );
}

export default DashboardHome;
