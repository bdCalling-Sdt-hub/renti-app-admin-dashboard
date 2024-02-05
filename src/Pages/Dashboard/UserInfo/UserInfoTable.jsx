import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Eye from "../../../icons/Eye";
import Print from "../../../icons/Print";
const { Title, Text } = Typography;

const UserInfoTable = ({
  userDataGetByPagination,
  userDataGetBySearch,
  setReload,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userInfoData, setUserInfoData] = useState(null);

  const { userInfoWithTripAmount, pagination } = useSelector(
    (state) => state.UserInformationData
  );

  console.log(pagination);

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
    userDataGetByPagination(page);
    userDataGetBySearch(page);
  };

  const withoutBlockUser = userInfoWithTripAmount?.filter(
    (data) => data.user.isBanned !== "true" && data.user.isBanned !== "trash"
  );

  const data = withoutBlockUser?.map((item) => {
    return {
      key: item?.user._id,
      name: item?.user.fullName,
      email: item?.user.email,
      contact: item?.user.phoneNumber,
      joiningDate: moment(item?.user.createdAt).format("lll"),
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
          <Button onClick={() => showDrawer(record)} type="text">
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
              <Title style={{ color: "#333333" }} level={5} strong>
                User Information
              </Title>
              <p style={{ fontWeight: "normal", color: "gray" }}>
                See all information about the user
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
        {userInfoData && (
          <DrawerPage
            userInfoData={userInfoData}
            setUserInfoReload={setReload}
            setIsDrawerVisible={setIsDrawerVisible}
          />
        )}
      </Drawer>
    </>
  );
};

export default UserInfoTable;
