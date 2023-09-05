import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;

const RentiIncomeTable = ({ handlePagination }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 1;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const { rentiIncomeList, pagination } = useSelector(
    (state) => state.RentiIncomes
  );

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setInvoiceData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setInvoiceData(null);
  };

  const data = rentiIncomeList.map((rtIncome) => {
    return {
      key: rtIncome._id,
      tripNo: rtIncome.rentTripNumbers,
      time: moment(rtIncome.time).format("llll"),
      totalAmount: rtIncome.totalAmount,
      stripeFee: rtIncome.stripeFee,
      hostPayment: rtIncome.hostPayment,
      rentiIncome: rtIncome.rentiIncome,
      printView: "Button",
    };
  });

  const columns = [
    {
      title: "TRIP NO",
      dataIndex: "tripNo",
      key: "tripNo",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "totalAmount",
      key: "totalAmount",
      responsive: ["lg"],
    },
    {
      title: "STRIPE FEE",
      dataIndex: "stripeFee",
      key: "stripeFee",
    },
    {
      title: "HOST PAYMENT",
      dataIndex: "hostPayment",
      key: "hostPayment",
      responsive: ["md"],
    },
    {
      title: "RENTI INCOME",
      dataIndex: "rentiIncome",
      key: "rentiIncome",
    },

    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{}}>
          <Button
            type="text"
            style={{ marginRight: "10px", paddingBottom: "35px" }}
          >
            <AiOutlinePrinter style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ paddingBottom: "35px" }}
          >
            <LiaSaveSolid style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handlePagination(page);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Invoice# Trip No.{invoiceData?.invoiceNo}
              </Title>
              <Text>See all information about the trip no. 68656</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
        closable={false}
        extra={
          <Space>
            <Button
              style={{
                borderRadius: "100%",
                backgroundColor: "white",
                color: "red",
                height: "50px",
                width: "50px",
                textAlign: "center",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined />
            </Button>
          </Space>
        }
      >
        {invoiceData && <DrawerPage invoiceData={invoiceData} />}
      </Drawer>
    </>
  );
};
export default RentiIncomeTable;
