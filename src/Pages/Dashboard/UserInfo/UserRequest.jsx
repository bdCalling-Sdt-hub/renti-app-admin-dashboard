import { Button, Col, Input, Pagination, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import UserRequestCard from "../../../Components/Card/UserRequestCard";
import { UserInformationData } from "../../../ReduxSlices/UserInformationSlice";

const { Text } = Typography;

const UserRequest = () => {
  const { userInfoWithTripAmount, pagination } = useSelector(
    (state) => state.UserInformationData
  );
  const dispatch = useDispatch();
  const [autoReload, setAutoReload] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  console.log(pagination);

  const handleSearch = (page) => {
    const data = {
      approve: "false",
      isBanned: "false",
      page: page,
      search: searchData,
      limit: 6,
    };
    if (searchData !== "") {
      dispatch(UserInformationData(data));
    }
  };

  const handlePagination = (page) => {
    const data = {
      approve: "false",
      isBanned: "false",
      page: page,
      search: searchData,
      limit: 6,
    };

    if (searchData === "") {
      dispatch(UserInformationData(data));
    }
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
    handlePagination(page);
    handleSearch(page);
  };

  useEffect(() => {
    const data = {
      approve: "false",
      isBanned: "false",
      page: 1,
      search: "",
      limit: 6,
    };
    if (searchData === "") {
      dispatch(UserInformationData(data));
    }
  }, [autoReload, searchData, dispatch]);

  return (
    <div style={{ padding: "0px 60px" }}>
      <Text
        style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "normal" }}
      >
        Search
      </Text>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input
          onChange={(e) => setSearchData(e.target.value)}
          style={{ height: "50px" }}
          size="large"
          placeholder="Search by name/email/phone"
          prefix={<BiSearch style={{ color: "#cccccc" }} />}
        />
        <Button
          onClick={handleSearch}
          style={{
            background: "#000B90",
            color: "white",
            height: 50,
            width: "180px",
          }}
        >
          Search
        </Button>
      </div>

      <h2
        style={{
          fontSize: "25px",
          marginTop: "30px",
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        User request
      </h2>
      <div
        style={{ background: "white", padding: "30px", borderRadius: "10px" }}
      >
        {
          <Row gutter={[16, 16]}>
            {userInfoWithTripAmount?.map((item) => (
              <UserRequestCard
                key={item._id}
                cardData={item}
                setAutoReload={setAutoReload}
              />
            ))}
          </Row>
        }
        <Row style={{ marginTop: "15px" }}>
          <Col span={12}></Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Pagination
              pageSize={pageSize}
              current={currentPage}
              onChange={onChangePage}
              total={pagination?.totalUsers}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserRequest;
