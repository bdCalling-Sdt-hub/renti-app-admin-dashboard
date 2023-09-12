import { Button, Drawer, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const HostInfoTable = ({ hostDataGetByPagination, handleHostSearchData }) => {
  const { hostsData, pagination } = useSelector((state) => state.hostsData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hostData, setHostData] = useState(null);

  console.log("sdfjklsdf",hostsData);

  const data = hostsData?.map((host) => {
    return {
      name: host?.host.fullName,
      email: host?.host.email,
      contact: host?.host.phoneNumber,
      joiningDate: moment(host.host.createAt).format("YYYY-MM-DD"),
      car: host.carCount,
      action: host.host,
    };
  });

  const restData = hostsData?.filter((host) => host?.isBanned == false);
  console.log(restData);

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
      title: "CARS",
      dataIndex: "car",
      key: "car",
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

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostData(record);

    console.log(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    hostDataGetByPagination(page);
    handleHostSearchData(page);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalHosts,
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
                Invoice# Trip No.{hostData?.tripNo}
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
        {hostData && <DrawerPage hostData={hostData} />}
      </Drawer>
    </div>
  );
};

export default HostInfoTable;
