import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RentInformationData } from "../../../ReduxSlices/RentInformationSlice";
import "./RentInformation.css";
import RentInformationTable from "./RentInformationTable";

import { useState } from "react";

function RentInformation() {
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  const {
    rentCompletedTotalAmount,
    rentReservedTotalAmount,
    totalRejectedAmount,
  } = useSelector((state) => state.RentInformation);

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
    };

    if (searchData == "") {
      dispatch(RentInformationData(data));
    }
  }, [searchData]);

  const rentDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (!searchData) {
      dispatch(RentInformationData(data));
    }
  };

  const rentDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData) {
      dispatch(RentInformationData(data));
    }
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <Row style={{ marginBottom: 30 }}>
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
              placeholder="Search by Trip no."
              prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
            />
            <Button
              onClick={rentDataGetBySearch}
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

      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <div className="rent-card complete">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Rent's complete
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: ".2rem",
                marginBottom: "15px",
              }}
            >
              $ {rentCompletedTotalAmount}.00
            </h3>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <div className="rent-card reserved">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Rent's reserved
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              $ {rentReservedTotalAmount}.00
            </h3>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <div className="rent-card canceled">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Rent's canceled
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              $ {totalRejectedAmount}.00
            </h3>
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "15px",
            fontWeight: "normal",
          }}
        >
          Rent Status
        </h2>
      </Row>

      <Row>
        <Col lg={{ span: 24 }}>
          <RentInformationTable
            rentDataGetByPagination={rentDataGetByPagination}
            rentDataGetBySearch={rentDataGetBySearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default RentInformation;
