import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginActivitys } from "../../../ReduxSlices/LoginActivitySlice";
import LoginActivityTable from "./LoginActivityTable";

const LoginActivity = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoginActivitys());
  }, []);

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <LoginActivityTable />
        </Col>
      </Row>
    </div>
  );
};

export default LoginActivity;
