import { Button, Col, Input, Pagination, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import HostRequestCard from "../../../Components/Card/HostRequestCard";
import { HostsData } from "../../../ReduxSlices/HostsSlice";

const { Text } = Typography;

const HostRequest = () => {
  const { hostsData, pagination } = useSelector((state) => state.hostsData);
  const dispatch = useDispatch();
  const [autoReload, setAutoReload] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handleSearch = (page) => {
    const data = {
      approve: "false",
      page: page,
      search: searchData,
      limit: 6,
    };
    if (searchData !== "") {
      dispatch(HostsData(data));
    }
  };

  const handlePagination = (page) => {
    const data = {
      approve: "false",
      page: page,
      search: searchData,
      limit: 6,
    };

    if (searchData === "") {
      dispatch(HostsData(data));
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
      page: 1,
      search: "",
      limit: 6,
    };
    if (searchData === "") {
      dispatch(HostsData(data));
    }
  }, [autoReload, dispatch, searchData]);

  // const items = hostsData.filter(
  //   (hostRequest) => hostRequest.host.isBanned !== "trash"
  // );

  return (
    <div style={{ padding: "10px 0px" }}>
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
        Host request
      </h2>
      <div
        style={{ background: "white", padding: "30px", borderRadius: "10px" }}
      >
        {
          <Row gutter={[16, 16]}>
            {hostsData?.map((item) => (
              <HostRequestCard
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
              total={pagination?.totalHosts}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HostRequest;
