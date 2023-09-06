import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Eye from "../../../icons/Eye";
import Print from "../../../icons/Print";

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
    return {
      key: item?.user._id,
      name: item?.user.fullName,
      email: item?.user.email,
      contact: item?.user.phoneNumber,
      joiningDate: item?.user.createdAt,
      trips: "$" + item?.totalTripAmount,
      userInfo: item.user,
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
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "TRIPS",
      dataIndex: "trips",
      key: "trips",
      responsive: ["md"],
    },

    {
      title: "ACTIONS",
      dataIndex: "userInfo",
      key: "userInfo",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Eye />
          </Button>
          <Button type="text">
            <Print />
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
              <p style={{ fontWeight: "normal" }}>
                See all information about the user
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
        {userInfoData && <DrawerPage userInfoData={userInfoData} />}
      </Drawer>
    </>
  );
};

export default UserInfoTable;
