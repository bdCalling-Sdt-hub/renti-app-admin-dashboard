import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const InvoiceTable = ({ recentDataGetByPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const dispatch = useDispatch();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [dashboardEarningData, setDashboardEarningData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setDashboardEarningData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setDashboardEarningData(null);
  };
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
    recentDataGetByPagination(page);
  };

  const { recentEarning, pagination } = useSelector(
    (state) => state.RecentEarnings
  );
  const data = recentEarning?.map((item) => {
    return {
      key: item._id,
      invoiceNo: item._id,
      time: item.createdAt,
      username: item.userId?.fullName,
      method: item.paymentData.payment_method_details.card.brand,
      amount: item.paymentData.amount,
      status: item.paymentData.status == "succeeded" ? "Complete" : "Pending",
      printView: item,
    };
  });

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
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
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="text">
            <Print />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <Save />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data from the server when the current page changes
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    // Replace this with your actual API request to fetch data based on pagination
    try {
      const response = await fetch(
        `/api/data?page=${currentPage}&pageSize=${pageSize}`
      );
      const result = await response.json();

      setData(result.data);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Invoice# Trip No
              </Title>
              <Text>See all information about the trip no. 68656</Text>
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
        {dashboardEarningData && (
          <DrawerPage dashboardEarningData={dashboardEarningData} />
        )}
      </Drawer>
    </>
  );
};
export default InvoiceTable;
