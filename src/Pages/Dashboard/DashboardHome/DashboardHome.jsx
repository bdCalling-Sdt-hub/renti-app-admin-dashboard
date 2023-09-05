import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import "./DashboardHome.css";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { GrHistory } from "react-icons/gr";
import { MdCarRental } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";
import InvoiceTable from "./InvoiceTable";
import MostRentCarChart from "./MostRentCarChart";
import DailyRentChart from "./dailyRentChart";
import { useDispatch,useSelector } from "react-redux";

import { IncomeData } from '../../../ReduxSlices/IncomeGetSlice';
import { RentStatusData } from "../../../ReduxSlices/RentStatusSlice";
import { RecentEarningsData } from "../../../ReduxSlices/RecentEarningsSlice";
function DashboardHome() {
  
 

  const dispatch=useDispatch();

  const {incomeData } = useSelector(
    (state) => state.IncomeData
  );

  const {rentStatus } = useSelector(
    (state) => state.RentStatus
  );

  
  const recentDataGetByPagination=(page)=>{
    console.log("peyecipage",page)
    let data={
      income:"all",
      page:page
    }
    dispatch(RecentEarningsData(data));
  }
  //alert(JSON.stringify(earning))

 

  //console.log("off",incomeData)

  useEffect(()=>{

     let data={
       income:"all",
       page:1
     }
      dispatch(RecentEarningsData(data));
      dispatch(IncomeData());
      dispatch(RentStatusData());
      


  },[])


  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  let cars = [
    {"carModelName": "BMW"},
    {"carModelName": "toyota"},
    {"carModelName": "nissan"},
    {"carModelName": "marcedees"},
    {"carModelName": "BMW"},
    {"carModelName": "nissan"},
    {"carModelName": "nissan"},
    {"carModelName": "toyota"},
    {"carModelName": "BMW"},
    {"carModelName": "marcedees"},
    {"carModelName": "BMW"},
    {"carModelName": "nissan"}
  ];
  
  // Create an object to store car model frequencies
  let carModelFrequencies = {};
  
  // Count the occurrences of each car model
  for (let car of cars) {
    let modelName = car.carModelName;
    if (carModelFrequencies[modelName]) {
      carModelFrequencies[modelName]++;
    } else {
      carModelFrequencies[modelName] = 1;
    }
  }
  
  // Sort the car model frequencies in descending order
  let sortedCarModelFrequencies = Object.entries(carModelFrequencies).sort((a, b) => b[1] - a[1]);
  
  // Get the top three most used car models
  let topThreeCarModels = sortedCarModelFrequencies.slice(0, 3);
  
  // Calculate and display the percentage for the top three car models
  console.log("Top Three Most Used Car Models as Percentages:");
  for (let [carModel, frequency] of topThreeCarModels) {
    let percentage = (frequency / cars.length) * 100;
    console.log(`${carModel}: ${percentage.toFixed(2)}%`);
  }
  


  
  return (
    <div>
    <h1 style={{fontSize:"30px",marginBottom:"20px"}}>Dashboard overview</h1>
    <Row gutter={16} style={{marginBottom:"20px"}}>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Today's income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:".2rem",marginBottom:"15px"}}>$ {incomeData?.todayIncome}.00</h3>
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Weekly income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ {incomeData?.weeklyIncome}.00</h3>
        </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Monthly income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ {incomeData?.totalMonthlyIncome}.00</h3>
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>All time income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ {incomeData?.totalIncome}.00</h3>
        </div>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='rent-status' style={{backgroundColor:"#fff"}}>
            <MdCarRental style={{fontSize:"1.5rem",color:"#000b90"}}/>
            <div className='single-status'>
                <h2 style={{fontSize:"1.5rem",fontWeight:"600",marginTop:"10px",marginBottom:"10px",color:"#000b90"}}>Today's Rent</h2>
                <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",color:"gray"}}>{rentStatus?.todayRents?.length}</h3>
            </div>
            
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
      <div  className='rent-status' style={{backgroundColor:"#fff"}}>
            <GrHistory style={{fontSize:"1.5rem",color:"#000b90"}}/>
            <div className='single-status'>
                <h2 style={{fontSize:"1.5rem",fontWeight:"600",marginTop:"10px",marginBottom:"10px",color:"#000b90"}}>Pendings</h2>
                <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",color:"gray"}}>{rentStatus?.pendingRents?.length}</h3>
            </div>
            
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
      <div  className='rent-status' style={{backgroundColor:"#fff"}}>
            <SlRefresh style={{fontSize:"1.5rem",color:"#000b90"}}/>
            <div className='single-status'>
                <h2 style={{fontSize:"1.5rem",fontWeight:"600",marginTop:"10px",marginBottom:"10px",color:"#000b90"}}>Ongoing</h2>
                <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",color:"gray"}}>{rentStatus?.totalOnGoing?.length}</h3>
            </div>
            
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
        <div className='rent-status' style={{backgroundColor:"#fff"}}>
            <BsFillCheckCircleFill style={{fontSize:"1.5rem",color:"#000b90"}}/>
            <div className='single-status'>
                <h2 style={{fontSize:"1.5rem",fontWeight:"600",marginTop:"10px",marginBottom:"10px",color:"#000b90"}}>Complete</h2>
                <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",color:"gray"}}>562</h3>
            </div>
            
         </div>
      </Col>
    </Row>

    

      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 12 }}>
          <DailyRentChart />
        </Col>
        <Col lg={{ span: 12 }}>
          <div
            className=""
            style={{
              border: "3px solid #000b90",
              padding: "30px",
              borderRadius: "15px",
              backgroundColor: "#fff",
            }}
          >
            <h1 style={{ color: "#000b90" }}>Most using car</h1>
            <MostRentCarChart />
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
        >
          Recent Earnings
        </h2>
      </Row>
      <InvoiceTable recentDataGetByPagination={recentDataGetByPagination}/>
    </div>
  );
}

export default DashboardHome;
