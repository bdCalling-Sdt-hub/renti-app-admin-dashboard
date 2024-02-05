import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { HostInformationWithKycData } from "./../../../ReduxSlices/HostInformationWithKycSlice";
import HostKycTable from "./HostKycTable";
function HostKyc() {
  const [searchData, setSearchData] = useState("");

  const [imagePath, setImagePath] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      // approve: "true",
      isBanned: "false",
      search: searchData,
      page: 1,
      limit: 10,
    };
    if (searchData == "") {
      dispatch(HostInformationWithKycData(data));
    }
  }, [searchData]);

  const hostDataGetByPagination = (page) => {
    let data = {
      // approve: "true",
      isBanned: "false",
      search: searchData,
      page: page,
      limit: 10,
    };
    if (!searchData) {
      dispatch(HostInformationWithKycData(data));
    }
  };

  const hostDataGetBySearch = (page) => {
    let data = {
      // approve: "true",
      isBanned: "false",
      search: searchData,
      page: page,
      limit: 10,
    };
    if (searchData) {
      dispatch(HostInformationWithKycData(data));
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: "30px" }}>
        <img src={imagePath} />
        {/* <a href={mypdf} download>
        Download PDF
    </a> */}

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
              style={{
                height: "50px",
                width: "300px",
                backgroundColor: "#000b90",
                color: "#fff",
                fontSize: "20px",
              }}
              onClick={hostDataGetBySearch}
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
          Host KYC List
        </h2>
        <Col lg={{ span: 24 }}>
          <HostKycTable
            hostDataGetByPagination={hostDataGetByPagination}
            hostDataGetBySearch={hostDataGetBySearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HostKyc;
