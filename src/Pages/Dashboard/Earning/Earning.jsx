import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import EarnHistoryTable from "./EarnHistoryTable";
import style from "./Earning.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { IncomeData } from '../../../ReduxSlices/IncomeGetSlice';

const Earning = () =>{

  const params=useParams();
  console.log(params.income)

  const {incomeData } = useSelector(
    (state) => state.IncomeData
  );

  console.log("right",incomeData)

  const dispatch=useDispatch();

  useEffect(()=>{

    dispatch(IncomeData()); 

  },[]);

  

  return(
    <div style={{ padding: "0px 50px" }}>
    <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Earnings</h2>
    <Row
      gutter={{
        xs: 8,
        sm: 18,
        md: 24,
        lg: 45,
      }}
      style={{ marginTop: "20px" }}
    >
      <Col className="gutter-row" span={8}>
        <div className={style.card}>
          <div>
            <Link style={{color:"#fff"}}>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Today’s Income</h2>
            <h2>$ {incomeData.todayIncome}.00</h2>
            </Link>
            
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div className={style.card}>
          <div>
          <Link style={{color:"#fff"}}>
          <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Weakly Income</h2>
            <h2>$ {incomeData.weeklyIncome}.00</h2>
          </Link>
           
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div className={style.card}>
          <div>
            <Link style={{color:"#fff"}}>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Monthly Income</h2>
            <h2>$ {incomeData.totalMonthlyIncome}.00</h2>
            </Link>
      
          </div>
        </div>
      </Col>
    </Row>
    <h2 style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}>
      Transactions History
    </h2>

    <EarnHistoryTable />
  </div>
  );
};

export default Earning;
