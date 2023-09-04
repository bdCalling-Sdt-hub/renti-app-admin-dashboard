import { Table, Typography } from "antd";
import React, { useState } from "react";
const { Title, Text } = Typography;

const data = [
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    ine: 20,
  },
];

const LoginActivityTable = () => {
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      responsive: ["lg"],
    },
    {
      title: "JOINING DATE",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "INE",
      dataIndex: "ine",
      key: "ine",
      responsive: ["md"],
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <button type="text" style={style.signOutBtn}>
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
      padding: "4px 10px",
      border: 0,
    },
  };

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hostData, setHostData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostData(null);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default LoginActivityTable;
