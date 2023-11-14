import { Table, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "../../../../Config";
const { Title, Text } = Typography;

const LoginActivityTable = ({ setReload }) => {
  const { loginActivity } = useSelector((state) => state.LoginActivity);

  const token = localStorage.token;

  const handleSignOutDevice = (id) => {
    Swal.fire({
      title: "Are you sure!",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`api/activities/${id}`, {
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.statusCode === "201") {
              Swal.fire("Successfully", "Device removed", "success");
              setReload((p) => p + 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const data = loginActivity.map((activity) => {
    return {
      browser: activity.browser,
      device: activity.operatingSystem.split(";")[0],
      time: moment(activity.createdAt).format("llll"),
      actions: activity,
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
            onClick={() => handleSignOutDevice(record.actions._id)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const style = {
    signOutBtn: {
      background: "linear-gradient(#000b90ba, #0b90ba)",
      color: "#fff",
      borderRadius: "3px",
      padding: "7px 20px",
      border: 0,
      cursor: "pointer",
    },
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
