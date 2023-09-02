import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { useDispatch,useSelector } from "react-redux";
import { RentInformationData } from "../../../ReduxSlices/RentInformationSlice";


const { Title, Text } = Typography;
import {
 
  CloseOutlined,
  
} from '@ant-design/icons';




const RentInformationTable = ({recentDataGetByPagination}) =>{
    const [rentData, setRentData] = useState([]); // Data fetched from the server
    const [totalItems, setTotalItems] = useState(0); // Total number of items
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const pageSize = 5;


    const dispatch=useDispatch();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    const {rents,pagination} = useSelector((state) => state.RentInformation);
  
    const showDrawer = (record) => {
      setIsDrawerVisible(true);
      setInvoiceData(record);
    };
  
    const closeDrawer = () => {
      setIsDrawerVisible(false);
      setInvoiceData(null);
    
    };

    console.log("rentinformation page data",rents,pagination)

    const data=rents?.map((item)=>{
      console.log("tushar",item)
        return{
              key: item._id,
              carModel:item.carId.carModelName,
              username: item.userId.fullName,
              tripno: item._id,
              startDate: item.startDate,
              endDate: item.endDate,
              price: item.totalAmount,
              status:<div style={{color:"white",backgroundColor:item.requestStatus=="Accepted"?"#000b90":item.requestStatus=="Pending"?"red":"green",textAlign:"center",padding:"10px",borderRadius:"5px",fontWeight:"bold"}}>{item.requestStatus}</div>,
              printView: "Button",
        }
    })
     
    const handlePageChange=(page)=>{
      setCurrentPage(page);
      console.log("mycurrent",currentPage)
      recentDataGetByPagination(page)
  }






    const columns = [
      {
        title: "Trip No",
        dataIndex: "tripno",
        key: "invoiceNo",
      },
      {
        title: "Car Model",
        dataIndex: "carModel",
        key: "carModel",
        responsive: ["md"],
      },
      {
        title: "User",
        dataIndex: "username",
        key: "username",
        responsive: ["lg"],
      },
      {
        title: "Pick-Up",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "Drop-Off",
        dataIndex: "endDate",
        key: "endDate",
        responsive: ["md"],
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "PRINT/VIEW",
        dataIndex: "printView",
        key: "printView",
        responsive: ["lg"],
        render: (_,record) => (
          <div style={{}}>
              <Button type="text" style={{ marginRight: "10px",paddingBottom:"35px" }}>
                <AiOutlinePrinter style={{ fontSize: "30px", color: "#999999" }} />
              </Button>
              <Button onClick={() => showDrawer(record)} type="text" style={{paddingBottom:"35px"}}>
                <LiaSaveSolid style={{ fontSize: "30px", color: "#999999" }} />
              </Button>
            </div>
        ),
      },
    ];



    // useEffect(() => {
    //     // Fetch data from the server when the current page changes
    //     fetchData();
    //   }, [currentPage]);
    
    //   const fetchData = async () => {
    //     // Replace this with your actual API request to fetch data based on pagination
    //     try {
    //       const response = await fetch(`/api/data?page=${currentPage}&pageSize=${pageSize}`);
    //       const result = await response.json();
    
    //       setData(result.data);
    //       setTotalItems(result.totalItems);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    
    return(
      <>
        <Table columns={columns} dataSource={data} pagination={{
            pageSize,
            showSizeChanger:false,
            total: pagination?.totalDocuments,
            current: currentPage,
            onChange: handlePageChange,
          }}/>
          <Drawer
          
          title={
            <div>
              <Typography>
                <Title level={5} strong>
                  Invoice# Trip No.{invoiceData?.invoiceNo}
                </Title>
                <Text>See all information about the trip no. 68656</Text>
              </Typography>
            </div>
          }
          placement="right"
          onClose={closeDrawer}
          open={isDrawerVisible}
          width={500}
          closable={false}
          extra={
            <Space>
              <Button style={{borderRadius:"100%",backgroundColor:"white",color:"red",height:"50px",width:"50px",textAlign:"center"}} onClick={closeDrawer}><CloseOutlined /></Button>
             
            </Space>
          }

        >
          {invoiceData && <DrawerPage invoiceData={invoiceData} />}
        </Drawer>

        </>
    )

};
export default RentInformationTable;
