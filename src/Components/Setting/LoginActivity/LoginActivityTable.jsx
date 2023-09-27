import { Table, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const { Title, Text } = Typography;

const LoginActivityTable = () => {
  const { loginActivity } = useSelector((state) => state.LoginActivity);

  console.log(loginActivity);

  const data = loginActivity.map((activity) => {
    return {
      browser: activity.browser,
      device: activity.operatingSystem,
      time: moment(activity.createdAt).format("llll"),
      actions: "Button",
    };
  });

  const columns = [
    {
      title: "BROWSER",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "DEVICE",
      dataIndex: "device",
      key: "device",
      responsive: ["md"],
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <button
            type="text"
            style={style.signOutBtn}
            onClick={handleSignOutDevice}
          >
            Sign Out
          </button>
        </div>
      ),
    },
  ];

  const style = {
    signOutBtn: {
      background: "#FBE9EC",
      color: "#D7263D",
      borderRadius: "3px",
      padding: "7px 20px",
      border: 0,
      cursor: "pointer",
    },
  };

  const handleSignOutDevice = () => {
    Swal.fire("", "Sign out successfully", "success");
  };

  return (
    <div>
      <Table
        style={{ userSelect: "none", hover: "none" }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default LoginActivityTable;
