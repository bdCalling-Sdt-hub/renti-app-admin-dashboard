import { Col, Pagination, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarRequestCard from "../../../Components/Card/CarRequestCard";
import { CarsData } from "../../../ReduxSlices/CarsSlice";

const { Text } = Typography;

const CarRequest = () => {
  const carData = useSelector((state) => state.carsData.carsData);
  const { cars, pagination } = carData;
  const dispatch = useDispatch();
  const [autoReload, setAutoReload] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  console.log(pagination);

  // const handleSearch = (page) => {
  //   const data = {
  //     approve: "false",
  //     page: page,
  //     search: searchData,
  //     limit: 6,
  //   };
  //   if (searchData !== "") {
  //     dispatch(HostsData(data));
  //   }
  // };

  const handlePagination = (page) => {
    const value = {
      page: page,
      limit: 6,
      isCarActive: "Pending",
    };
    dispatch(CarsData(value));
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
    handlePagination(page);
    // handleSearch(page);
  };

  useEffect(() => {
    const value = {
      page: 1,
      limit: 6,
      isCarActive: "Pending",
    };
    dispatch(CarsData(value));
  }, [autoReload, searchData, dispatch]);

  return (
    <div style={{ padding: "0px 60px" }}>
      {/* <Text
        style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "normal" }}
      >
        Search
      </Text>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input
          onChange={(e) => setSearchData(e.target.value)}
          style={{ height: "50px" }}
          size="large"
          placeholder="Search by name"
          prefix={<BiSearch style={{ color: "#cccccc" }} />}
        />
        <Button
          onClick={handleSearch}
          style={{
            background: "#000B90",
            color: "white",
            height: 50,
            width: "180px",
          }}
        >
          Search
        </Button>
      </div> */}

      <h2
        style={{
          fontSize: "25px",
          marginTop: "30px",
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        Car request
      </h2>
      <div
        style={{ background: "white", padding: "30px", borderRadius: "10px" }}
      >
        {
          <Row gutter={[16, 16]}>
            {cars?.map((item) => (
              <CarRequestCard
                key={item._id}
                data={item}
                setAutoReload={setAutoReload}
              />
            ))}
          </Row>
        }
        <Row style={{ marginTop: "15px" }}>
          <Col span={12}></Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Pagination
              pageSize={pageSize}
              current={currentPage}
              onChange={onChangePage}
              total={pagination?.totalDocuments}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CarRequest;
