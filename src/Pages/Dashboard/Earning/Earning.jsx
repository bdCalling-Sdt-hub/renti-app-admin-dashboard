import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IncomeData } from "../../../ReduxSlices/IncomeGetSlice";
import { RecentEarningsData } from "../../../ReduxSlices/RecentEarningsSlice";
import EarnHistoryTable from "./EarnHistoryTable";
import style from "./Earning.module.css";

const Earning = () => {
  const params = useParams();

  let incomeTime = params?.income;
  const { incomeData } = useSelector((state) => state.IncomeData);

  console.log("right", incomeData);

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      income: incomeTime,
      page: 1,
    };
    dispatch(RecentEarningsData(data));
    dispatch(IncomeData());
  }, [incomeTime]);

  const recentDataGetByPagination = (page) => {
    console.log("peyecipage", page);
    let data = {
      income: incomeTime,
      page: page,
    };
    dispatch(RecentEarningsData(data));
  };

  return (
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
          <div
            className={style.card}
            style={{
              backgroundColor:
                incomeTime == "today-income" ? "white" : "#000b90",
              color: incomeTime == "today-income" ? "black" : "#fff",
            }}
          >
            <div>
              <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
              <h2 className={style.cardTitle}>Today’s Income</h2>
              <h2>$ {incomeData.todayIncome}.00</h2>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div
            className={style.card}
            style={{
              backgroundColor:
                incomeTime == "weekly-income" ? "white" : "#000b90",
              color: incomeTime == "weekly-income" ? "black" : "#fff",
            }}
          >
            <div>
              <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
              <h2 className={style.cardTitle}>Weakly Income</h2>
              <h2>$ {incomeData.weeklyIncome}.00</h2>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div
            className={style.card}
            style={{
              backgroundColor:
                incomeTime == "monthly-income" ? "white" : "#000b90",
              color: incomeTime == "monthly-income" ? "black" : "#fff",
            }}
          >
            <div>
              <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
              <h2 className={style.cardTitle}>Monthly Income</h2>
              <h2>$ {incomeData.totalMonthlyIncome}.00</h2>
            </div>
          </div>
        </Col>
      </Row>
      <h2
        style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
      >
        Transactions History
      </h2>

      <EarnHistoryTable recentDataGetByPagination={recentDataGetByPagination} />
    </div>
  );
};

export default Earning;
