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
  const pageSize = 2;
  const { UserData, pagination } = useSelector((state) => state.UserInfoData);

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
            color: item.user.approved == true ? "#00A991" : "#D7263D",
            backgroundColor: item.user.approved == true ? "#E6F6F4" : "#FBE9EC",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {item.user.approved == true ? "Approve" : "Cencel"}
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

export default UserKycTable;
