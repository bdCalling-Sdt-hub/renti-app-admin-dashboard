import { Button, Col, DatePicker, Image, Input, Row } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
const dateFormat = "YYYY-MM-DD";

const PersonalInfo = () => {
  const [profileEdit, setProfileEdit] = useState(false);

  const handleChange = () => {
    setProfileEdit(true);
  };

  return (
    <>
      {!profileEdit ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #d9d9d9",
              paddingBottom: "30px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <Image
                width={200}
                style={{ borderRadius: "6px" }}
                src="https://yt3.googleusercontent.com/Qy5Gk9hccQxiZdX8IxdK-mF2ktN17gap3ZkGQZkGz8NB4Yep3urmucp5990H2tjXIISgUoYssJE=s900-c-k-c0x00ffffff-no-rj"
              />
              <div>
                <h2>Fahim</h2>
                <p>@fahim</p>
                <p>INE: GMVLMR80070501M100</p>
              </div>
            </div>
            <div>
              <Button
                onClick={handleChange}
                style={{
                  background: "#000B92",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LiaEditSolid fontSize={16} />
                Edit
              </Button>
            </div>
          </div>

          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Name</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"Fahim"}
                readOnly
              />
            </Col>
          </Row>
          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">Email</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"siffahim25@gmail.com"}
                readOnly
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Phone Number</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"01646524028"}
                readOnly
              />
            </Col>
          </Row>
          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">INE</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"GMVLMR80070501M100"}
                readOnly
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Date of Birth</label>
              <DatePicker
                style={{ height: "45px", width: "100%" }}
                defaultValue={dayjs("2023-08-27", dateFormat)}
                disabled
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Address</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"Mogbazer,Dhaka"}
                readOnly
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                borderBottom: "1px solid #d9d9d9",
                paddingBottom: "30px",
                marginBottom: "20px",
              }}
            >
              <Image
                width={200}
                style={{ borderRadius: "6px" }}
                src="https://yt3.googleusercontent.com/Qy5Gk9hccQxiZdX8IxdK-mF2ktN17gap3ZkGQZkGz8NB4Yep3urmucp5990H2tjXIISgUoYssJE=s900-c-k-c0x00ffffff-no-rj"
              />
              <div>
                <h2>Fahim</h2>
                <p>@fahim</p>
                <p>INE: GMVLMR80070501M100</p>
              </div>
            </div>
          </div>

          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Name</label>
              <Input style={{ height: "45px" }} defaultValue={"Fahim"} />
            </Col>
          </Row>
          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">Email</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"siffahim25@gmail.com"}
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Phone Number</label>
              <Input style={{ height: "45px" }} defaultValue={"01646524028"} />
            </Col>
          </Row>
          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">INE</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"GMVLMR80070501M100"}
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Date of Birth</label>
              <DatePicker
                style={{ height: "45px", width: "100%" }}
                defaultValue={dayjs("2023-08-27", dateFormat)}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Address</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={"Mogbazer,Dhaka"}
              />
            </Col>
          </Row>
          <Button
            style={{
              height: "45px",
              background: "#000B92",
              color: "#fff",
              marginTop: "20px",
            }}
            block
          >
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default PersonalInfo;
