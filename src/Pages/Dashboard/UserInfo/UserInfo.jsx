import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { UserInformationData } from "../../../ReduxSlices/UserInformationSlice";
import UserInfoTable from "./UserInfoTable";

function UserInfo() {
  const [searchData, setSearchData] = useState("");
  const [reload, setReload] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
      limit: 10,
    };
    if (searchData === "") {
      dispatch(UserInformationData(data));
    }
  }, [searchData, reload]);

  const userDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
      limit: 10,
    };
    if (searchData == "") {
      dispatch(UserInformationData(data));
    }
  };

  const userDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
      limit: 10,
    };
    if (searchData != "") {
      dispatch(UserInformationData(data));
    }
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <h2
        style={{
          fontSize: "25px",
          marginBottom: "10px",
          fontWeight: "normal",
        }}
      >
        Search
      </h2>

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

      <h2
        style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
      >
        Users information
      </h2>

      <UserInfoTable
        userDataGetByPagination={userDataGetByPagination}
        userDataGetBySearch={userDataGetBySearch}
        setReload={setReload}
      />
    </div>
  );
}

export default UserInfo;
