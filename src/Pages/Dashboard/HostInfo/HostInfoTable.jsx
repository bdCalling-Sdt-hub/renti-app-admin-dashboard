import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "../../../../Config";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const token = localStorage.token;

const HostInfoTable = ({
  hostDataGetByPagination,
  handleHostSearchData,
  setReload,
}) => {
  const { hostsData, pagination } = useSelector((state) => state.hostsData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hostData, setHostData] = useState(null);

  const handleDeleteHost = (id) => {
    Swal.fire({
      title: "Moved to trash",
      text: "Host go to the trash",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `api/user/banned/${id}`,
            { isApprove: "trash" },
            {
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Move!", "Successfully moved Host", "success");
            }
            setReload((prev) => prev + 1);
          });
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  const data = hostsData?.map((host) => {
    return {
      name: host?.host.fullName,
      email: host?.host.email,
      contact: host?.host.phoneNumber,
      joiningDate: moment(host.host.createAt).format("YYYY-MM-DD"),
      car: host.carCount,
      action: host,
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
          <Button
            onClick={() => handleDeleteHost(record.action.host._id)}
            type="text"
          >
            <Delete />
          </Button>
        </div>
      ),
    },
  ];

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostData(record);
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
          <div>
            <Typography>
              <Title style={{ color: "#333333" }} level={5} strong>
                Invoice# Trip No.{hostData?.tripNo}
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
        {hostData && <DrawerPage hostData={hostData} setReload={setReload} />}
      </Drawer>
    </div>
  );
};

export default HostInfoTable;
