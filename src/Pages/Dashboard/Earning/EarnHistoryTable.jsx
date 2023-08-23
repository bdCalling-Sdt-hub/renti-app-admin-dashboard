import { Button, Drawer, Table } from "antd";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";

const data = [
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700510",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
];

const EarnHistoryTable = () => {
  const columns = [
    {
      title: "TRIP NO.",
      dataIndex: "tripNo",
      key: "tripNO",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
    },
    {
      title: "USER NAME",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "METHOD",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (
        _,
        record // Use the second parameter 'record'
      ) => (
        <div style={{ textAlign: "center" }}>
          <Button type="text" style={{ marginRight: "10px" }}>
            <AiOutlinePrinter style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <LiaSaveSolid style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
        </div>
      ),
    },
  ];

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setDrawerData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setDrawerData(null);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="Drawer Title"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width={400}
      >
        {drawerData && <DrawerPage drawerData={drawerData} />}
      </Drawer>
    </div>
  );
};

export default EarnHistoryTable;
