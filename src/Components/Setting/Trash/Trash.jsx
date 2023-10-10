import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TrashUser } from "../../../ReduxSlices/trashSlice";
import TrashDataTable from "./TrashDataTable";

const Trash = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(1);

  useEffect(() => {
    const data = {
      limit: 10,
      page: 1,
    };
    dispatch(TrashUser(data));
  }, [reload]);

  const trashPagination = (page) => {
    const data = {
      limit: 10,
      page: page,
    };
    dispatch(TrashUser(data));
  };

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <TrashDataTable
            setReload={setReload}
            trashPagination={trashPagination}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Trash;
