import { Col, Row } from 'antd'
import React from 'react'
import "./Carinformation.css"
import CarInfoTable from './CarinfoTable'


function CarInformation() {
  return (
    <div>
       <Row>
        <h2 style={{fontSize: "30px",marginBottom:"30px"}}>
          Car Information
        </h2>
       </Row>

       <Row gutter={16} style={{marginBottom:"20px"}}>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}}>
         <div  className='car-card total'>
            
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Total's car</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:".2rem",marginBottom:"15px"}}>512</h3>
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}}>
         <div className='car-card active'>
            
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Car active</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>112</h3>
        </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}}>
         <div  className='car-card reserved'>
            
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Reserved car</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>250</h3>
         </div>
      </Col>
      
    </Row>

    <Row>
       <h2 style={{fontSize: "30px",marginBottom:"30px"}}>
          Car Details
        </h2>
    </Row>

    <Row>
       <Col lg={{span:24}}>
           <CarInfoTable/>
       </Col>
    </Row>
    </div>
  )
}

export default CarInformation