import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AllUsers } from "../../../ReduxSlices/AllUserSlice";
import TrashDataTable from "./TrashDataTable";

const Trash = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllUsers());
  }, []);

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <TrashDataTable />
        </Col>
      </Row>
    </div>
  );
};

export default Trash;
