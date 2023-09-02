import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { useDispatch,useSelector } from "react-redux";
const { Title, Text } = Typography;



const EarnHistoryTable = ({recentDataGetByPagination}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const {todayEarning,weeklyEarning,monthlyEarning,pagination} = useSelector((state) => state.RecentEarnings);

  let today_data;
  let weekly_data;
  let monthly_data;
  if(todayEarning){
    today_data=todayEarning?.map((item)=>{
      console.log("tushar",item)
        return{
              key: item._id,
              tripNo: item?.rentId?.rentTripNumber,
              time: item.createdAt,
              username: item.userId.fullName,
              method: item.paymentData.payment_method_details.card.brand,
              amount: item.paymentData.amount,
              status: item.paymentData.status=="succeeded"?"Complete":"Pending",
              printView: "Button",
        }
    });
  }
 

 

 if(weeklyEarning){
  weekly_data=weeklyEarning?.map((item)=>{
   console.log("tushar",item)
     return{
           key: item._id,
           tripNo: item?.rentId?.rentTripNumber,
           time: item.createdAt,
           username: item.userId.fullName,
           method: item.paymentData.payment_method_details.card.brand,
           amount: item.paymentData.amount,
           status: item.paymentData.status=="succeeded"?"Complete":"Pending",
           printView: "Button",
     }
 });
}

if(monthlyEarning){
  monthly_data=monthlyEarning?.map((item)=>{
   console.log("tushar",item)
     return{
           key: item._id,
           tripNo: item?.rentId?.rentTripNumber,
           time: item.createdAt,
           username: item.userId.fullName,
           method: item.paymentData.payment_method_details.card.brand,
           amount: item.paymentData.amount,
           status: item.paymentData.status=="succeeded"?"Complete":"Pending",
           printView: "Button",
     }
 });
}

 

  console.log("today earning")



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
        <div style={{ textAlign: "center" }}>
          <Button type="text" style={{ marginRight: "10px" }}>
            <AiOutlinePrinter style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <LiaSaveSolid style={{ fontSize: "30px", color: "#999999" }} />
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

  const handlePageChange=(page)=>{
    console.log(page)
    setCurrentPage(page);
    recentDataGetByPagination(page)
  
  }

  return (
    <div>
      {
        today_data && <Table columns={columns} dataSource={today_data}
        pagination={{
          pageSize,
          showSizeChanger:false,
          total:pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }} />
      }

     {
        weekly_data && <Table columns={columns} dataSource={weekly_data}
        pagination={{
          pageSize,
          showSizeChanger:false,
          total:pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }} />
      }

     {
        monthly_data && <Table columns={columns} dataSource={monthly_data}
        pagination={{
          pageSize,
          showSizeChanger:false,
          total:pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }} />
      }


      
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
                Invoice# Trip No.{earningData?.tripNo}
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
        width={500}
      >
        {earningData && <DrawerPage earningData={earningData} />}
      </Drawer>
    </div>
  );
};

export default EarnHistoryTable;
