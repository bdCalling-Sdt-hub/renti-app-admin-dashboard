import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const RentInformationTable = ({
  rentDataGetByPagination,
  rentDataGetBySearch,
}) => {
  const [rentData, setRentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 10;

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
    rentDataGetByPagination(page), rentDataGetBySearch(page);
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
                Trip No {rentInfoData?.tripNo}
              </Title>
              <p style={{ fontWeight: "normal", color: "gray" }}>
                See all information about the trip no. {rentInfoData?.tripNo}
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
              <AiOutlineClose />
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
