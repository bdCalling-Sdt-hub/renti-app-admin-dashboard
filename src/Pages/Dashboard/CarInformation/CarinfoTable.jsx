import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;

const CarInfoTable = ({ carDataByPagination }) => {
  const [rentData, setRentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 3;

  const { cars, pagination } = useSelector((state) => state.carsData.carsData);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [carDetailsData, setCarDetailsData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setCarDetailsData(record);
  };

  console.log("Data", carDetailsData);

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setCarDetailsData(null);
  };

  console.log("page", pagination);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    carDataByPagination(page);
  };

  const data = cars?.map((car) => {
    return {
      key: car._id,
      carModel: car.carModelName,
      licenseNo: car.carLicenseNumber,
      registerDate: moment(car.createAt).format("YYYY-MM-DD"),
      owner: car.carOwner.fullName,
      status: car.tripStatus,
      printView: car,
    };
  });

  const columns = [
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "License No",
      dataIndex: "licenseNo",
      key: "licenseNo",
      responsive: ["md"],
    },
    {
      title: "Register Date",
      dataIndex: "registerDate",
      key: "registerDate",
      responsive: ["lg"],
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalPage,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Car Details
              </Title>
              <Text>See all information about selected car</Text>
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
        {carDetailsData && <DrawerPage carDetails={carDetailsData} />}
      </Drawer>
    </div>
  );
};
export default CarInfoTable;
