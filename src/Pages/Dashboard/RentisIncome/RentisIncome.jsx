import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RentiIncomes } from "../../../ReduxSlices/RentiIncomeSlice";
import IncomeRatioChart from "./IncomeRatioChart";
import RentiIncomeTable from "./RentIncomeTable";
import "./RentisIncome.css";

function RentisIncome() {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const { rentiTotalIncome, rentiTotalPaid } = useSelector(
    (state) => state.RentiIncomes
  );

  useEffect(() => {
    const data = {
      search: searchData,
      page: 1,
      limit: 10,
    };
    if (searchData === "") {
      dispatch(RentiIncomes(data));
    }
  }, [searchData]);

  const handlePagination = (page) => {
    const data = {
      search: searchData,
      page: page,
      limit: 10,
    };
    if (!searchData) {
      dispatch(RentiIncomes(data));
    }
  };

  const handleRentiIncomeSearch = (page) => {
    const data = {
      search: searchData,
      page: page,
      limit: 10,
    };
    if (searchData) {
      dispatch(RentiIncomes(data));
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
          Renti's Income
        </h2>
        <Col lg={{ span: 24 }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              size="large"
              placeholder="Search by Trip No"
              onChange={(e) => setSearchData(e.target.value)}
              prefix={<BiSearch style={{ color: "#cccccc" }} />}
            />
            <Button
              onClick={handleRentiIncomeSearch}
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
          <div className="renti-income-card income">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Total Income
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: ".2rem",
                marginBottom: "15px",
                color: "#00a991",
              }}
            >
              ${rentiTotalIncome}
            </h3>
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
          <div className="renti-income-card paid">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Total Paid
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
                color: "#d7263d",
              }}
            >
              ${rentiTotalPaid}
            </h3>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "30px" }}>
        <Col lg={{ span: 24 }}>
          <IncomeRatioChart />
        </Col>
      </Row>

      <Row>
        <Col lg={{ span: 24 }}>
          <RentiIncomeTable
            handlePagination={handlePagination}
            handleRentiIncomeSearch={handleRentiIncomeSearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default RentisIncome;
