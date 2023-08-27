import { Button, Col, Input, Row } from 'antd'
import React from 'react'
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import "./RentisIncome.css"
import IncomeRatioChart from './IncomeRatioChart';
import RentiIncomeTable from './RentIncomeTable';
function RentisIncome() {
    return (
        <div>
            <Row>
                <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
                    Renti's Income
                </h2>
                <Col lg={{ span: 24 }}>
                    <div className='' style={{ display: "flex", gap: "15px" }}>
                        <Input size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{ color: "#cccccc" }} />} />
                        <Button style={{ height: "50px", width: "300px", backgroundColor: "#000b90", color: "#fff", fontSize: "20px" }}>Search</Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} style={{marginBottom:"20px",marginTop:"50px"}}>
                <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className='renti-income-card income'>

                        <h1 style={{ fontSize: "1.5rem", fontWeight: "300", marginTop: "15px", marginBottom: "15px" }}>Total Income</h1>
                        <h3 style={{ fontSize: "1.5rem", letterSpacing: ".2rem", marginBottom: "15px",color:"#00a991" }}>$ 250,505,202.00</h3>
                    </div>
                </Col>
                <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className='renti-income-card paid'>

                        <h1 style={{ fontSize: "1.5rem", fontWeight: "300", marginTop: "15px", marginBottom: "15px" }}>Total Paid</h1>
                        <h3 style={{ fontSize: "1.5rem", letterSpacing: "1px", marginBottom: "15px",color:"red" }}>$ 505,202.00</h3>
                    </div>
                </Col>
            </Row>

            <Row style={{marginBottom:"30px"}}>
                <Col lg={{span:24}}>
                    <IncomeRatioChart/>
                </Col>
            </Row>

            <Row>
                <Col lg={{span:24}}>
                    <RentiIncomeTable/>
                </Col>
            </Row>

        </div>
    )
}

export default RentisIncome