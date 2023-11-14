import { Button, Col, Input, Row } from "antd";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { UserInformationWithKycData } from "../../../ReduxSlices/UserInformationWithKycSlice";
import UserKycTable from "./UserKycTable";

function UserKyc() {
  const [searchData, setSearchData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
    };

    if (searchData == "") {
      dispatch(UserInformationWithKycData(data));
    }
  }, [searchData]);

  const userDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (!searchData) {
      dispatch(UserInformationWithKycData(data));
    }
  };

  const userDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData) {
      dispatch(UserInformationWithKycData(data));
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
              onClick={userDataGetBySearch}
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
          User KYC List
        </h2>
        <Col lg={{ span: 24 }}>
          <UserKycTable
            userDataGetByPagination={userDataGetByPagination}
            userDataGetBySearch={userDataGetBySearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default UserKyc;
