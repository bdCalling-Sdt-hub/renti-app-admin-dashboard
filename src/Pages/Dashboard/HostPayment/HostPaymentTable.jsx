import { CloseOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const HostPaymentTable = ({
  hostPaymentDataGetByPagination,
  hostPaymentDataGetBySearch,
}) => {
  const [hostPaymentData, setHostPaymentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 10;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { hostPaymentList, pagination } = useSelector(
    (state) => state.HostPaymentData
  );

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostPaymentData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostPaymentData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    hostPaymentDataGetByPagination(page);
    hostPaymentDataGetBySearch(page);
  };

  const data = hostPaymentList?.map((item) => {
    console.log(item);
    return {
      key: item._id,
      tripno: item.rentTripNumber,
      time: item.time,
      username: item.carOwner?.fullName,
      totalamount: item.originalAmount,
      paidamount: item.paidAmount,
      status: item.status ? (
        <Badge
          className="site-badge-count-109"
          count={"Completed"}
          style={{
            background: "#E6F6F4",
            color: "#00A991",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
            padding: "0px 20px",
          }}
        />
      ) : (
        <Badge
          className="site-badge-count-109"
          count={"Pending"}
          style={{
            background: "#FBE9EC",
            color: "#D7263D",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
            padding: "0px 20px",
          }}
        />
      ),
      actions: item,
    };
  });

  const columns = [
    {
      title: "Trip No",
      dataIndex: "tripno",
      key: "tripno",
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
      title: "Total amount",
      dataIndex: "totalamount",
      key: "totalamount",
    },
    {
      title: "Paid Amount",
      dataIndex: "paidamount",
      key: "paidamount",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
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
                Invoice# Trip No. -
              </Title>
              <p style={{ fontWeight: "normal", color: "gray" }}>
                See all information about the trip no.{" "}
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "red",
                height: "40px",
                width: "40px",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined />
            </Button>
          </Space>
        }
      >
        {hostPaymentData && <DrawerPage hostPaymentData={hostPaymentData} />}
      </Drawer>
    </>
  );
};

export default HostPaymentTable;
