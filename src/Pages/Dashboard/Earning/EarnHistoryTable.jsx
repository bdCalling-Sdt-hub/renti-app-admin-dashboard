import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const EarnHistoryTable = ({ recentDataGetByPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { todayEarning, weeklyEarning, monthlyEarning, pagination } =
    useSelector((state) => state.RecentEarnings);
  const pageSize = 3;

  //ok all things is done
  let today_data;
  let weekly_data;
  let monthly_data;
  if (todayEarning) {
    today_data = todayEarning?.map((item) => {
      return {
        key: item._id,
        tripNo: item.rentId?.rentTripNumber,
        time: item.createdAt,
        username: item.userId?.fullName,
        method: item.paymentData.payment_method_details.card.brand,
        amount: item.paymentData.amount,
        status:
          item.paymentData.status == "succeeded" ? (
            <div
              style={{
                background: "#E6F6F4",
                color: "#00A991",
                padding: "4px",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Complete
            </div>
          ) : (
            <div
              style={{
                background: "#FBE9EC",
                color: "#D7263D",
                padding: "4px",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Pending
            </div>
          ),
        printView: item,
      };
    });
  }

  if (weeklyEarning) {
    weekly_data = weeklyEarning?.map((item) => {
      return {
        key: item._id,
        tripNo: item.rentId?.rentTripNumber,
        time: item.createdAt,
        username: item.userId?.fullName,
        method: item.paymentData.payment_method_details.card.brand,
        amount: item.paymentData.amount,
        status:
          item.paymentData.status == "succeeded" ? (
            <div
              style={{
                background: "#E6F6F4",
                color: "#00A991",
                padding: "4px",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Complete
            </div>
          ) : (
            <div
              style={{
                background: "#FBE9EC",
                color: "#D7263D",
                padding: "4px",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Pending
            </div>
          ),
        printView: item,
      };
    });
  }

  if (monthlyEarning) {
    monthly_data = monthlyEarning?.map((item) => {
      return {
        key: item._id,
        tripNo: item.rentId?.rentTripNumber,
        time: item.createdAt,
        username: item.userId?.fullName,
        method: item.paymentData.payment_method_details.card.brand,
        amount: item.paymentData.amount,
        status:
          item.paymentData.status == "succeeded" ? (
            <div
              style={{
                background: "#E6F6F4",
                color: "#00A991",
                padding: "4px",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Complete
            </div>
          ) : (
            <div
              style={{
                background: "#FBE9EC",
                color: "#D7263D",
                padding: "4px",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Pending
            </div>
          ),
        printView: item,
      };
    });
  }

  const columns = [
    {
      title: "TRIP NO.",
      dataIndex: "tripNo",
      key: "tripNO",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
    },
    {
      title: "USER NAME",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "METHOD",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (
        _,
        record // Use the second parameter 'record'
      ) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Print />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <Save />
          </Button>
        </div>
      ),
    },
  ];

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [earningData, setEarningData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setEarningData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEarningData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    recentDataGetByPagination(page);
  };

  return (
    <div>
      {today_data && (
        <Table
          columns={columns}
          dataSource={today_data}
          pagination={{
            pageSize,
            showSizeChanger: false,
            total: pagination?.totalPage,
            current: currentPage,
            onChange: handlePageChange,
          }}
        />
      )}

      {weekly_data && (
        <Table
          columns={columns}
          dataSource={weekly_data}
          pagination={{
            pageSize,
            showSizeChanger: false,
            total: pagination?.totalPage,
            current: currentPage,
            onChange: handlePageChange,
          }}
        />
      )}

      {monthly_data && (
        <Table
          columns={columns}
          dataSource={monthly_data}
          pagination={{
            pageSize,
            showSizeChanger: false,
            total: pagination?.totalDocuments,
            current: currentPage,
            onChange: handlePageChange,
          }}
        />
      )}

      <Drawer
        title={
          <div>
            <Typography>
              <Title style={{ color: "#333333" }} level={5} strong>
                Invoice# Trip No.{earningData?.tripNo}
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
        {earningData && <DrawerPage earningData={earningData} />}
      </Drawer>
    </div>
  );
};

export default EarnHistoryTable;
