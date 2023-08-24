import { Col, Row } from 'antd'
import React from 'react'
import "./RentInformation.css"
import RentInformationTable from './RentInformationTable'

function RentInformation() {
  return (
    <div>
       <Row>
        <h2 style={{fontSize: "30px",marginBottom:"30px"}}>
          Rent Information
        </h2>
       </Row>

       <Row gutter={16} style={{marginBottom:"20px"}}>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}}>
         <div  className='rent-card complete'>
            
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Rent's complete</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:".2rem",marginBottom:"15px"}}>$ 250.00</h3>
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}}>
         <div className='rent-card reserved'>
            
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Rent's reserved</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ 250.00</h3>
        </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}}>
         <div  className='rent-card canceled'>
            
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Rent's canceled</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ 250.00</h3>
         </div>
      </Col>
      
    </Row>

    <Row>
       <h2 style={{fontSize: "30px",marginBottom:"30px"}}>
          Rent Status
        </h2>
    </Row>

    <Row>
       <Col lg={{span:24}}>
           <RentInformationTable/>
       </Col>
    </Row>
    </div>
  )
}

export default RentInformation