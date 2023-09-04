import { Button, Drawer, Table, Typography,Badge } from "antd";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { useDispatch,useSelector } from "react-redux";
const { Title, Text } = Typography;



const HostKycTable = ({hostDataGetByPagination,hostDataGetBySearch}) => {

  const [currentPage, setCurrentPage] = useState(1); 
  const pageSize = 2;
  const {HostData,pagination} = useSelector(
    (state) => state.HostInfoData
  );

  const data=HostData?.map((item)=>{
    console.log("jsjsjsjsjsj",item?.host.KYC)
    return({
          name: item.host.fullName,
          email: item.host.email,
          contact: item.host.phoneNumber,
          type: "pdf",
          status:<div style={{color:"white",backgroundColor:item.host.approved==true?"#000b90":"red",textAlign:"center",padding:"10px",borderRadius:"5px",fontWeight:"bold"}}>{item.host.approved==true?"Approve":"Cencel"}</div>,
    })
     
  })



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
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ marginRight: "10px" }}
          >
            <BsEye style={{ fontSize: "25px", color: "#999999" }} />
          </Button>
          <Button type="text">
            <RiDeleteBin5Line style={{ fontSize: "25px", color: "#999999" }} />
          </Button>
        </div>
      ),
    },
  ];

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hostData, setHostData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostData(null);
  };


  const handlePageChange=(page)=>{
    setCurrentPage(page);
    console.log(currentPage)
    hostDataGetByPagination(page)
    hostDataGetBySearch(page)
   
}

  return (
    <div>
      <Table columns={columns} dataSource={data} 
      
      pagination={{
        pageSize,
        showSizeChanger:false,
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

export default HostKycTable;
