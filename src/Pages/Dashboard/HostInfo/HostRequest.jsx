import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HostRequestCard from "../../../Components/HostRequestCard/HostRequestCard";
import { HostsData } from "../../../ReduxSlices/HostsSlice";

const HostRequest = () => {
  const { hostsData, pagination } = useSelector((state) => state.hostsData);
  const dispatch = useDispatch();
  const [autoReload, setAutoReload] = useState(1);
  const [searchData, setSearchData] = useState("");

  const style = {
    cardStyle: {
      background: "#E6E7F4",
      padding: "15px",
      textAlign: "center",
      borderRadius: "10px",
    },
    cardBtn: {
      color: "white",
    },
  };

  const handleSearch = () => {
    const data = {
      page: null,
      search: searchData,
      limit: null,
    };
    dispatch(HostsData(data));
  };

  useEffect(() => {
    const data = {
      page: null,
      search: "",
      limit: null,
    };
    if (searchData === "") {
      dispatch(HostsData(data));
    }
  }, [autoReload, searchData]);

  const items = hostsData.filter(
    (hostRequest) => hostRequest.host.approved == false
  );

  return (
    <div style={{ padding: "0px 60px" }}>
      <h2
        style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "normal" }}
      >
        Host Request
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input
          onChange={(e) => setSearchData(e.target.value)}
          style={{ height: "44px" }}
          size="large"
          placeholder="Search by name/email/phone"
          prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
        />
        <Button
          onClick={handleSearch}
          style={{
            background: "#000B90",
            color: "white",
            height: 45,
            width: "180px",
          }}
        >
          Search
        </Button>
      </div>

      <h2
        style={{
          fontSize: "25px",
          marginTop: "50px",
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        Show all host request
      </h2>
      <div
        style={{ background: "white", padding: "30px", borderRadius: "10px" }}
      >
        <Row gutter={[16, 16]}>
          {items.map((item) => (
            <HostRequestCard
              key={item._id}
              cardData={item}
              setAutoReload={setAutoReload}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HostRequest;
