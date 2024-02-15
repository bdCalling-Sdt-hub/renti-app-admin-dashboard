import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FaCar, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import baseAxios from "../../../../Config";
import { BLockUser } from "../../../ReduxSlices/BlockSlice";
import BlockUserCard from "../../BlockUserCard/BlockUserCard";
import CarBlockCard from "../../Card/CarBlockCard";

const token = localStorage.token;

const BlockList = () => {
  const dispatch = useDispatch();
  const { blockUser } = useSelector((state) => state.BlockUser);
  const [reload, setReload] = useState(1);
  const [view, setView] = useState("users");
  const [bannerCar, setBannerCar] = useState([]);
  const [bannedCarReload, setBannedCarReload] = useState(0);

  useEffect(() => {
    dispatch(BLockUser());
  }, [dispatch, reload, view]);

  useEffect(() => {
    async function run() {
      try {
        const res = await baseAxios.get("api/car/banned/all", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setBannerCar(res.data.bannedCars);
      } catch (error) {
        console.log(error);
      }
    }
    run();
  }, [bannedCarReload]);

  return (
    <div style={{ background: "white", borderRadius: "10px" }}>
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
      <Row gutter={[16, 16]}>
        {view === "users" &&
          blockUser.map((blUser) => (
            <BlockUserCard
              key={blUser._id}
              data={blUser}
              setReload={setReload}
            />
          ))}
        {view === "cars" &&
          bannerCar.map((car) => (
            <CarBlockCard
              key={car._id}
              data={car}
              setBannedCarReload={setBannedCarReload}
            />
          ))}
      </Row>
    </div>
  );
};

export default BlockList;
