import { Table } from "antd";
import React from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";

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
    render: (_,record) => (
      <div style={{ textAlign: "center" }}>
        <a style={{ marginRight: "12px" }}>
          <AiOutlinePrinter onClick={()=>{alert(record.tripNo)}} style={{ fontSize: "30px", color: "#999999" }} />
        </a>
        <a>
          <LiaSaveSolid style={{ fontSize: "30px", color: "#999999" }} />
        </a>
      </div>
    ),
  },
];

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
    tripNo: "1373700512",
    time: "18 Jul, 2023  4:30pm",
    username: "Fahim",
    method: "Credit Card",
    amount: "$850.00",
    status: "padding",
    printView: "Button",
  },
  {
    key: "1",
    tripNo: "1373700513",
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

const EarnHistoryTable = () => <Table columns={columns} dataSource={data} />;
export default EarnHistoryTable;
