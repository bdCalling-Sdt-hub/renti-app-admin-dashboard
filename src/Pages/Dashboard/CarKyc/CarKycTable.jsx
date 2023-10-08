import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const CarKycTable = ({ carDataGetByPagination, carDataGetBySearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { CarData, pagination } = useSelector((state) => state.CarInfoData);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [carKycData, setCarKycData] = useState();

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setCarKycData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setCarKycData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    carDataGetByPagination(page);
    carDataGetBySearch(page);
  };

  const data = CarData?.map((item) => {
    return {
      name: item?.carModelName,
      email: item?.carOwner?.email,
      contact: item?.carOwner?.phoneNumber,
      type: "pdf",
      status: (
        <div
          style={{
            color:
              item.tripStatus == "Pending"
                ? "#D7263D"
                : item.tripStatus == "Start"
                ? "#00A991"
                : "#000b90",
            backgroundColor:
              item.tripStatus == "Pending"
                ? "#FBE9EC"
                : item.tripStatus == "Start"
                ? "#E6F6F4"
                : "#e2e4ff",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {item.tripStatus}
        </div>
      ),
      actions: item,
    };
  });

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      responsive: ["lg"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Eye />
          </Button>
          <Button type="text">
            <Delete />
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
          total: pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <Title style={{ color: "#333333" }} level={5} strong>
                Invoice# Trip No.{carKycData?.tripNo}
              </Title>
              <Text style={{ color: "gray" }}>
                See all information about the trip no. 68656
              </Text>
            </Typography>
          </div>
        }
        headerStyle={{ background: "#E6E7F4" }}
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
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
        {carKycData && <DrawerPage carKycData={carKycData} />}
      </Drawer>
    </div>
  );
};

export default CarKycTable;
