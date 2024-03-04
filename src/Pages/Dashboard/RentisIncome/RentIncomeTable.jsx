import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const RentiIncomeTable = ({ handlePagination, handleRentiIncomeSearch }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 10;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [rentiIncomeData, setRentiIncomeData] = useState(null);
  const { rentiIncomeList, pagination } = useSelector(
    (state) => state.RentiIncomes
  );

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setRentiIncomeData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setRentiIncomeData(null);
  };

  const data = rentiIncomeList.map((rtIncome) => {
    return {
      key: rtIncome._id,
      tripNo: rtIncome.rentTripNumbers,
      time: moment(rtIncome.time).format("llll"),
      totalAmount: rtIncome.totalAmount / 100,
      stripeFee: rtIncome.stripeFee,
      hostPayment: Math.round(rtIncome.hostPayment / 100),
      rentiIncome: rtIncome.rentiIncome,
      actions: rtIncome,
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
      dataIndex: "action",
      key: "action",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Print />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <Save />
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handlePagination(page);
    handleRentiIncomeSearch(page);
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
                Invoice# Trip No. - {rentiIncomeData?.tripNo}
              </Title>
              <Text>
                See all information about the trip no {rentiIncomeData?.tripNo}
              </Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
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
              <AiOutlineClose />
            </Button>
          </Space>
        }
      >
        {rentiIncomeData && <DrawerPage rentiIncomeData={rentiIncomeData} />}
      </Drawer>
    </>
  );
};
export default RentiIncomeTable;
