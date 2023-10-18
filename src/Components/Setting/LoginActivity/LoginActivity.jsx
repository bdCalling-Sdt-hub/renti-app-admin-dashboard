import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginActivitys } from "../../../ReduxSlices/LoginActivitySlice";
import LoginActivityTable from "./LoginActivityTable";

const LoginActivity = () => {
  const [reload, setReload] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoginActivitys());
  }, [reload]);

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <LoginActivityTable setReload={setReload} />
        </Col>
      </Row>
    </div>
  );
};

export default LoginActivity;
