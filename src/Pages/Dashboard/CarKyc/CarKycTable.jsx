import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const CarKycTable = ({ carDataGetByPagination, carDataGetBySearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
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
    console.log(currentPage);
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
                ? "#000b90"
                : item.tripStatus == "Start"
                ? "#D7263D"
                : "#00A991",
            backgroundColor:
              item.tripStatus == "Pending"
                ? "#e2e4ff"
                : item.tripStatus == "Start"
                ? "#FBE9EC"
                : "#E6F6F4",
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

  // const data = [
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "#000b90", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Approve</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "red", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Cancel</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "#000b90", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Approve</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "red", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Cancel</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "#000b90", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Approve</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "red", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Cancel</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "#000b90", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Approve</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "red", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Cancel</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "#000b90", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Approve</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "red", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Cancel</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "#000b90", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Approve</div>
  //   },
  //   {
  //     name: "Kate Winslate",
  //     email: "kate@gmail.com",
  //     contact: " 014845454545",
  //     type: "pdf",
  //     status: <div style={{ color: "white", backgroundColor: "red", textAlign: "center", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Cancel</div>
  //   }

  // ];

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
              <Title level={5} strong>
                Invoice# Trip No.{carKycData?.tripNo}
              </Title>
              <Text>See all information about the trip no. 68656</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose fontSize={25} />
            </Button>
          </div>
        }
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
      >
        {carKycData && <DrawerPage carKycData={carKycData} />}
      </Drawer>
    </div>
  );
};

export default CarKycTable;
