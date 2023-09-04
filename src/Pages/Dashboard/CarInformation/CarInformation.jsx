import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarsData } from "../../../ReduxSlices/CarsSlice";
import CarInfoTable from "./CarinfoTable";
import "./Carinformation.css";

function CarInformation() {
  const dispatch = useDispatch();

  const carData = useSelector((state) => state.carsData.carsData);

  const { activeCar, totalCar, reservedCar, cars } = carData;

  const carDataByPagination = (page) => {
    dispatch(CarsData(page));
  };

  useEffect(() => {
    dispatch(CarsData(1));
  }, []);

  return (
    <div style={{ padding: "0 60px" }}>
      <Row>
        <h3
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          Car Information
        </h3>
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
          <div className="car-card total">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Total's car
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: ".2rem",
                marginBottom: "15px",
              }}
            >
              {totalCar}
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
          <div className="car-card active">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Car active
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              {activeCar}
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
          <div className="car-card reserved">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Reserved car
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              {reservedCar}
            </h3>
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          Car Details
        </h2>
      </Row>

      <Row>
        <Col lg={{ span: 24 }}>
          <CarInfoTable carDataByPagination={carDataByPagination} />
        </Col>
      </Row>
    </div>
  );
}

export default CarInformation;
