import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const UserKycTable = ({ userDataGetByPagination, userDataGetBySearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { UserData, pagination } = useSelector((state) => state.UserInfoData);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userKycData, setUserKycData] = useState();

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setUserKycData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setUserKycData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    userDataGetByPagination(page), userDataGetBySearch(page);
  };

  const data = UserData?.map((item) => {
    return {
      name: item.user.fullName,
      email: item.user.email,
      contact: item.user.phoneNumber,
      type: "pdf",
      status: (
        <div
          style={{
            color: item.user.isBanned === "false" ? "#00A991" : "#D7263D",
            backgroundColor:
              item.user.isBanned === "false" ? "#E6F6F4" : "#FBE9EC",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {item.user.isBanned === "false" ? "Active" : "Disabled"}
        </div>
      ),
      actions: item.user,
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
          total: pagination?.totalUsers,
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
                User KYC Documents
              </Title>
              <Text>See all KYC documents of Sanchez Haro Manuel</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose fontSize={25} />
            </Button>
          </div>
        }
        headerStyle={{ background: "#E6E7F4" }}
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
      >
        {userKycData && <DrawerPage userKycData={userKycData} />}
      </Drawer>
    </div>
  );
};

export default UserKycTable;
