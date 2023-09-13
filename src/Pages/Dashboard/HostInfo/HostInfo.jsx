import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HostsData } from "../../../ReduxSlices/HostsSlice";
import HostInfoTable from "./HostInfoTable";
//import axios from "../../../../Config";

const HostInfo = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [reload, setReload] = useState(1);

  const hostDataGetByPagination = (page) => {
    const data = {
      approve: "true",
      isBanned: "false",
      search: searchData,
      page: page,
      limit: 2,
    };
    if (searchData == "") {
      dispatch(HostsData(data));
    }
  };

  const handleHostSearchData = (page) => {
    const data = {
      approve: "true",
      isBanned: "false",
      search: searchData,
      page: page,
      limit: 2,
    };
    if (searchData != "") {
      dispatch(HostsData(data));
      console.log("search");
    }
  };

  useEffect(() => {
    const data = {
      approve: "true",
      isBanned: "false",
      search: searchData,
      page: 1,
      limit: 2,
    };
    if (searchData === "") {
      dispatch(HostsData(data));
    }
  }, [searchData, reload]);

  return (
    <div style={{ padding: "0px 60px" }}>
      <h2
        style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "normal" }}
      >
        All Host Info
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
          onClick={handleHostSearchData}
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
          marginTop: "40px",
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        All Host List With Their Information
      </h2>
      <HostInfoTable
        hostDataGetByPagination={hostDataGetByPagination}
        handleHostSearchData={handleHostSearchData}
        setReload={setReload}
      />
    </div>
  );
};

export default HostInfo;
