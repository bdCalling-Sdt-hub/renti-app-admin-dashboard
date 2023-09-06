import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";

const { Title, Text } = Typography;

const RentInformationTable = ({ recentDataGetByPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [rentInfoData, setRentInfoData] = useState(null);

  const { rents, pagination } = useSelector((state) => state.RentInformation);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setRentInfoData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setRentInfoData(null);
  };

  const data = rents?.map((rent) => {
    return {
      key: rent._id,
      carModel: rent?.carId?.carModelName,
      username: rent?.userId?.fullName,
      tripNo: rent?.rentTripNumber,
      startDate: moment(rent?.startDate).format("llll"),
      endDate: moment(rent?.endDate).format("llll"),
      price: rent?.totalAmount,
      status: (
        <div
          style={{
            color:
              rent.requestStatus == "Accepted"
                ? "#000b90"
                : rent.requestStatus == "Pending"
                ? "#D7263D"
                : "#00A991",
            backgroundColor:
              rent.requestStatus == "Accepted"
                ? "#e2e4ff"
                : rent.requestStatus == "Pending"
                ? "#FBE9EC"
                : "#E6F6F4",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {rent.requestStatus}
        </div>
      ),
      actionData: rent,
    };
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    recentDataGetByPagination(page);
  };

  const columns = [
    {
      title: "Trip No",
      dataIndex: "tripNo",
      key: "tripNo",
    },
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
      responsive: ["md"],
    },
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "Pick-Up",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Drop-Off",
      dataIndex: "endDate",
      key: "endDate",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "PRINT/VIEW",
      dataIndex: "actionData",
      key: "actionData",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="text">
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
              <Title level={5} strong>
                Trip No {rentInfoData?.tripNo}
              </Title>
              <p style={{ fontWeight: "normal" }}>
                See all information about the trip no. {rentInfoData?.tripNo}
              </p>
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
              <CloseOutlined />
            </Button>
          </Space>
        }
      >
        {rentInfoData && <DrawerPage rentInfoData={rentInfoData} />}
      </Drawer>
    </>
  );
};
export default RentInformationTable;
