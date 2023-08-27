import { Col, Row } from 'antd'
import React,{useEffect} from 'react'
import UserPaymentRatioChart from './UserPaymentRatioChart';
import PaymentListTable from './PaymentListTable';



setInterval(() => {
   
    console.log("tushar");
    
}, 5000);

function UserPayment() {
  return (
    <div>
        <Row>
            <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
               User Payment Ratio
           </h2> 

           <Col lg={{span:24}}>
             <UserPaymentRatioChart/>
            </Col> 
            <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
               Payment list
           </h2>  
        </Row>
        <Row>
            <Col lg={{span:24}}>
                <PaymentListTable/>
            </Col>
        </Row>
    </div>
  )
}

export default UserPayment