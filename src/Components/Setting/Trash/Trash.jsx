import { Button, Col, Row } from "antd";
import { React, useCallback, useEffect, useState } from "react";
import { FaCar, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import baseAxios from "../../../../Config";
import { TrashUser } from "../../../ReduxSlices/trashSlice";
import TrashCarTable from "./TrashCarTable";
import TrashDataTable from "./TrashDataTable";

const token = localStorage.token;

const Trash = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(1);
  const [carReload, setCarReload] = useState(1);
  const [view, setView] = useState("users");
  const [trashCar, setTrashCar] = useState([]);
  const [trashCarPagination, setTrashCarPagination] = useState();

  useEffect(() => {
    const data = {
      limit: 10,
      page: 1,
    };
    dispatch(TrashUser(data));
  }, [dispatch, reload]);

  const trashPagination = (page) => {
    const data = {
      limit: 10,
      page: page,
    };
    dispatch(TrashUser(data));
  };

  const handleCarData = useCallback(async () => {
    const res = await baseAxios.get("api/car/trash", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    setTrashCar(res.data.trashCar);
    setTrashCarPagination(res.data.pagination);
  }, []);

  useEffect(() => {
    async function run() {
      try {
        handleCarData();
      } catch (error) {
        console.log(error);
      }
    }
    run();
  }, [carReload, handleCarData]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          justifyContent: "end",
          borderBottom: "1px solid #ececec",
          paddingBottom: "10px",
          marginBottom: "30px",
        }}
      >
        <Button
          onClick={() => setView("users")}
          icon={<FaUsers />}
          style={{
            background: view === "users" && "#000B90",
            color: view === "users" && "#fff",
          }}
        >
          Users
        </Button>
        <Button
          onClick={() => setView("cars")}
          icon={<FaCar />}
          style={{
            background: view === "cars" && "#000B90",
            color: view === "cars" && "#fff",
          }}
        >
          Cars
        </Button>
      </div>
      <Row>
        <Col lg={{ span: 24 }}>
          {view === "users" && (
            <TrashDataTable
              setReload={setReload}
              trashPagination={trashPagination}
            />
          )}
          {view === "cars" && (
            <TrashCarTable
              setCarReload={setCarReload}
              trashCarPagination={trashCarPagination}
              trashCar={trashCar}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Trash;
