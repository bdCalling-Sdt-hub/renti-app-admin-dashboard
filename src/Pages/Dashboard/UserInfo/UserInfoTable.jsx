import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";

const { Title, Text } = Typography;

const UserInfoTable = ({ userDataGetByPagination, userDataGetBySearch }) => {
  const [rentData, setRentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 2;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userInfoData, setUserInfoData] = useState(null);

  const { userInfoWithTripAmount, pagination } = useSelector(
    (state) => state.UserInformationData
  );

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setUserInfoData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setUserInfoData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(currentPage);
    userDataGetByPagination(page);
    userDataGetBySearch(page);
  };

  const data = userInfoWithTripAmount?.map((item) => {
    console.log("user info in info page", item);
    return {
      key: item?.user._id,
      name: item?.user.fullName,
      email: item?.user.email,
      contact: item?.user.phoneNumber,
      joiningdate: item?.user.createdAt,
      trips: "$" + item?.totalTripAmount,

      printView: "Button",
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
      title: "JOINING DATE",
      dataIndex: "joiningdate",
      key: "joiningdate",
    },
    {
      title: "TRIPS",
      dataIndex: "trips",
      key: "trips",
      responsive: ["md"],
    },

    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
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
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalUsers,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                User Information
              </Title>
              <Text>See all information about the user</Text>
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
        {userInfoData && <DrawerPage userInfoData={userInfoData} />}
      </Drawer>
    </>
  );
};

export default UserInfoTable;
