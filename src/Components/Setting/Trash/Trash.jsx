import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AllUsers } from "../../../ReduxSlices/AllUserSlice";
import TrashDataTable from "./TrashDataTable";

const Trash = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(1);

  useEffect(() => {
    dispatch(AllUsers());
  }, [reload]);

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <TrashDataTable setReload={setReload} />
        </Col>
      </Row>
    </div>
  );
};

export default Trash;
