import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const HostKycTable = ({ hostDataGetByPagination, hostDataGetBySearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const { HostData, pagination } = useSelector((state) => state.HostInfoData);
  const [hostKycData, setHostKycData] = useState();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostKycData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostKycData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    hostDataGetByPagination(page);
    hostDataGetBySearch(page);
  };

  const data = HostData?.map((item) => {
    return {
      name: item.host.fullName,
      email: item.host.email,
      contact: item.host.phoneNumber,
      type: "pdf",
      status: (
        <div
          style={{
            color: item.host.approved == true ? "#00A991" : "#D7263D",
            backgroundColor: item.host.approved == true ? "#E6F6F4" : "#FBE9EC",
            padding: "5px",
            fontSize: "11px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {item.host.approved == true ? "Approve" : "Cencel"}
        </div>
      ),
      actions: item.host,
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
          total: pagination?.totalHosts,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title style={{ color: "#333333" }} level={5} strong>
                Host KYC Documents
              </Title>
              <Text style={{ color: "gray" }}>
                See all KYC documents of {hostKycData?.name}
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
        {hostKycData && <DrawerPage hostKycData={hostKycData} />}
      </Drawer>
    </div>
  );
};

export default HostKycTable;
