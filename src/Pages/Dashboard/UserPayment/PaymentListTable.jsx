import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const PaymentListTable = ({ handleUserPaymentsPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userPaymentData, setUserPaymentData] = useState(null);

  const { userPayments, pagination } = useSelector(
    (state) => state.UserPayments
  );

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setUserPaymentData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setUserPaymentData(null);
  };

  const data = userPayments.map((userPayment) => {
    return {
      key: userPayment._id,
      tripNo: userPayment.rentTripNumbers,
      time: moment(userPayment.time).format("YYYY-MM-DD"),
      username: userPayment.carOwner?.fullName,
      method: userPayment.method,
      amount: userPayment.amount,
      status: userPayment.status ? (
        <div
          style={{
            background: "#E6F6F4",
            color: "#00A991",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Completed
        </div>
      ) : (
        <div
          style={{
            background: "#FBE9EC",
            color: "#D7263D",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Pending
        </div>
      ),
      actions: userPayment,
    };
  });

  const columns = [
    {
      title: "Trip No",
      dataIndex: "tripNo",
      key: "tripNo",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
    },
    {
      title: "User Name",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "PRINT/VIEW",
      dataIndex: "actions",
      key: "actions",
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
    handleUserPaymentsPagination(page);
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
              <Title style={{ color: "#333333" }} level={5} strong>
                Invoice# Trip No. -{userPaymentData?.rentTripNumbers}
              </Title>
              <p style={{ fontWeight: "normal", color: "gray" }}>
                See all information about the trip no.{" "}
                {userPaymentData?.rentTripNumbers}
              </p>
            </Typography>
          </div>
        }
        headerStyle={{ background: "#E6E7F4" }}
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
              <CloseOutlined />
            </Button>
          </Space>
        }
      >
        {userPaymentData && <DrawerPage userPaymentData={userPaymentData} />}
      </Drawer>
    </>
  );
};
export default PaymentListTable;
