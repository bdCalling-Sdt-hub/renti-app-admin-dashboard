import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";

const { Title, Text } = Typography;

const RentInformationTable = ({ recentDataGetByPagination }) => {
  const [rentData, setRentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 5;

  const dispatch = useDispatch();

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

  console.log("rentinformation page data", rents, pagination);

  const data = rents?.map((item) => {
    console.log("tushar", item);
    return {
      key: item._id,
      carModel: item?.carId?.carModelName,
      username: item?.userId?.fullName,
      tripno: item?.rentTripNumber,
      startDate: moment(item?.startDate).format("llll"),
      endDate: moment(item?.endDate).format("llll"),
      price: item?.totalAmount,
      status: (
        <div
          style={{
            color:
              item.requestStatus == "Accepted"
                ? "#000b90"
                : item.requestStatus == "Pending"
                ? "#D7263D"
                : "#00A991",
            backgroundColor:
              item.requestStatus == "Accepted"
                ? "#e2e4ff"
                : item.requestStatus == "Pending"
                ? "#FBE9EC"
                : "#E6F6F4",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {item.requestStatus}
        </div>
      ),
      printView: "Button",
    };
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    recentDataGetByPagination(page);
  };

  const columns = [
    {
      title: "Trip No",
      dataIndex: "tripno",
      key: "invoiceNo",
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
      dataIndex: "printView",
      key: "printView",
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
                Invoice# Trip No
              </Title>
              <Text>See all information about the trip no. 68656</Text>
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
