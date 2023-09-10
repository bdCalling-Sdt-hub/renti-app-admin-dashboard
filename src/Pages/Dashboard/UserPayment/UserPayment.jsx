import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserPayments } from "../../../ReduxSlices/UserPaymentSlice";
import PaymentListTable from "./PaymentListTable";
import UserPaymentRatioChart from "./UserPaymentRatioChart";

function UserPayment() {
  const dispatch = useDispatch();

  const handleUserPaymentsPagination = (page) => {
    const data = {
      page: page,
      limit: 2,
    };

    dispatch(UserPayments(data));
  };

  useEffect(() => {
    const data = {
      page: 1,
      limit: 2,
    };
    dispatch(UserPayments(data));
  }, []);

  return (
    <div style={{ padding: "0 60px" }}>
      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          User Payment Ratio
        </h2>

        <Col lg={{ span: 24 }}>
          <UserPaymentRatioChart />
        </Col>
        <h2
          style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
        >
          Payment list
        </h2>
      </Row>
      <Row>
        <Col lg={{ span: 24 }}>
          <PaymentListTable
            handleUserPaymentsPagination={handleUserPaymentsPagination}
          />
        </Col>
      </Row>
    </div>
  );
}

export default UserPayment;
