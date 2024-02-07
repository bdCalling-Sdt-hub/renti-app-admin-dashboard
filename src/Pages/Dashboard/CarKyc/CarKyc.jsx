import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { CarInformationWithKycData } from "../../../ReduxSlices/CarInformationWithKycSlice";
import CarKycTable from "./CarKycTable";

function CarKyc() {
  const [searchData, setSearchData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [reload, setReload] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
    };
    if (searchData == "") {
      dispatch(CarInformationWithKycData(data));
    }
  }, [searchData, reload, dispatch]);

  const carDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (!searchData) {
      dispatch(CarInformationWithKycData(data));
    }
  };

  const carDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData) {
      dispatch(CarInformationWithKycData(data));
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: "30px" }}>
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
              onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              size="large"
              placeholder="Search by name/email/phone"
              prefix={<BiSearch style={{ color: "#cccccc" }} />}
            />
            <Button
              onClick={carDataGetBySearch}
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

      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "15px",
            fontWeight: "normal",
            marginTop: "30px",
          }}
        >
          Car KYC List
        </h2>
        <Col lg={{ span: 24 }}>
          <CarKycTable
            setReload={setReload}
            carDataGetByPagination={carDataGetByPagination}
            carDataGetBySearch={carDataGetBySearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CarKyc;
