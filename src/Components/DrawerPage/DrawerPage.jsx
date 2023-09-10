/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Badge, Button, Col, Form, Input, Row, Select, Typography } from "antd";
import moment from "moment";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "../../../Config";
import img from "../../Images/1.png";
import cardImg from "../../Images/Cards.png";
const { Title } = Typography;

const { Option } = Select;

const token = localStorage.token;

const DrawerPage = (props) => {
  const style = {
    cardType: {
      height: "150px",
      width: "250px",
      background: props.cardBg,
      borderRadius: "10px",
      position: "relative",
    },
    icon: {
      position: "absolute",
      bottom: "10px",
      left: "10px",
      background: "#fff",
      padding: "0 8px",
      paddingTop: "8px",
      borderRadius: "3px",
    },
    title: {
      color: "#8d8d8d",
      fontWeight: "normal",
    },
    editInput: {
      height: "45px",
    },
  };

  console.log("drawer", props?.carKycData);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 100,
          height: "45px",
        }}
      >
        <Option value="86">🏳️‍🌈</Option>
        <Option value="87">🏳️‍⚧️</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleBlockUser = () => {
    axios
      .post(
        `api/user/banned/${props.userInfoData?.key}`,
        { isApprove: "cancel" },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Wow!",
            text: "User Block successfully",
          });
        }
        props?.setUserInfoReload((prev) => prev + 1);
      });
  };

  const handleGenerateDownload = () => {
    // Prepare the data you want to download as a string or other suitable format
    const data = JSON.stringify(props.dashboardEarningData);

    // Create a Blob with the data
    const blob = new Blob([data], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "Earning Details"; // You can specify the filename here

    // Trigger the click event on the anchor element to start the download
    a.click();

    // Release the URL and remove the anchor element
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <>
      {props.userInfoData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid #dddddd",
              paddingBottom: "20px",
              marginBottom: "10px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div style={{ marginTop: "-6px" }}>
              <p style={{ fontSize: "20px" }}>{props.userInfoData?.name}</p>
              <p>INE: {props.userInfoData?.userInfo?.ine}</p>
              <p>Trip Completes: 5</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div>
            <Form.Item
              label="Email"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "0px" }}
            >
              <Input
                style={{ height: "45px" }}
                defaultValue={props.userInfoData?.email}
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "0px" }}
            >
              <Input
                style={{ height: "45px" }}
                defaultValue={props.userInfoData?.contact}
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Driving License No."
              labelCol={{ span: 24 }}
              style={{ marginBottom: "0px" }}
            >
              <Input
                style={{ height: "45px" }}
                defaultValue={"License"}
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Joining Date"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "0px" }}
            >
              <Input
                style={{ height: "45px" }}
                defaultValue={props.userInfoData?.joiningDate}
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Address"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "0px" }}
            >
              <Input
                style={{ height: "45px" }}
                defaultValue={props.userInfoData?.userInfo?.address}
                readOnly
              />
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              onClick={handleBlockUser}
              style={{
                border: "1px solid red",
                color: "red",
                height: 50,
                width: "265px",
              }}
            >
              Block
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {props.editedCardData && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              borderBottom: "1px solid #ebe6e6",
              paddingBottom: "20px",
            }}
          >
            <div style={style.cardType}>
              <div style={style.icon}>
                <img src={img} alt="" />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "8px" }}>
                <h4 style={style.title}>Valid Date</h4>
                <h4
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {props.editedCardData.validDate}
                </h4>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <h4 style={style.title}>Card Holder</h4>
                <h4
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {props.editedCardData.cardHolder}
                </h4>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <h4 style={style.title}>Card Number</h4>
                <h4
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {props.editedCardData.cardNumber}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <Form onFinish={onFinish}>
              <div>
                <label htmlFor="">Your Name</label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={props.editedCardData.cardHolder}
                  />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={"siffahim25@gmail.com"}
                  />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="">Phone Number</label>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ height: "45px" }}
                    defaultValue={"01646524028"}
                  />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="">Card Number</label>
                <Form.Item
                  name="cardNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card number!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={props.editedCardData.cardNumber}
                  />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="">CVC</label>
                <Form.Item
                  name="cvc"
                  rules={[
                    {
                      required: true,
                      message: "Please input your cvc!",
                    },
                  ]}
                >
                  <Input style={style.editInput} defaultValue={548} />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="">Expire Date</label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Expire Date!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={props.editedCardData.validDate}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  style={{
                    background: "#000890",
                    color: "white",
                    width: "100%",
                    height: "45px",
                    marginTop: "100px",
                  }}
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
      {props.earningData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.earningData.username}</p>
              <p>INE: siffahim</p>
              <p>Trip Completes:{props.earningData.status.length}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>
              Trip Details{" "}
              <Badge
                className="site-badge-count-109"
                count={"complete"}
                style={{ backgroundColor: "#E6F6F4", color: "#00A991" }}
              />
            </Title>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Car Model</p>
                <p>Car Color</p>
                <p>Car License</p>
                <p>Host Name</p>
                <p>Host INE</p>
                <p>Pickup Location</p>
                <p>Drop-Off Location</p>
                <p>Total Rental Time</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p> {props.earningData?.printView?.carId?.carModelName}</p>
                <p> {props.earningData?.printView?.carId?.carColor}</p>
                <p> {props.earningData?.printView?.carId?.carLicenseNumber}</p>
                <p> {props.earningData?.printView?.carId?.carModelName}</p>
                <p> {props.earningData?.printView?.carId?.carModelName}</p>
                <p> {props.earningData?.printView?.carId?.carModelName}</p>
                <p> {props.earningData?.printView?.carId?.carModelName}</p>
                <p>{props.earningData?.printView?.carId?.carModelName}</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Payment Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Payment By</p>
                <p>Payment Method</p>
                <p>Payment Date</p>
                <p>Total Amount</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.earningData?.username}</p>
                <p>{props.earningData?.method}</p>
                <p>{moment(props.earningData?.time).format("YYYY-DD-MM")}</p>
                <p>{props.earningData?.amount}</p>
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}
      {props.hostData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {" "}
                <p style={{ fontSize: "20px" }}>
                  {props?.hostData?.action?.fullName}
                </p>
              </div>
              <p>INC:</p>
              <p>Rent Completed</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Email</label>
              <Input
                readOnly
                style={{ height: "40px" }}
                defaultValue={props?.hostData?.action?.email}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Phone</label>
              <Input
                readOnly
                style={{ height: "40px" }}
                defaultValue={props?.hostData?.action?.phoneNumber}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Address</label>
              <Input
                readOnly
                style={{ height: "40px" }}
                defaultValue={props?.hostData?.action?.address}
              />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3>Payment Method</h3>
            <img width="80" style={{ margin: "10px 0" }} src={cardImg} alt="" />
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Credit Card Number</label>
                <Input
                  readOnly
                  style={{ height: "40px" }}
                  defaultValue={props?.hostData?.action?.creaditCardNumber}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Number</label>
                <Input readOnly style={{ height: "40px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Holder Name</label>
                <Input readOnly style={{ height: "40px" }} />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Block
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {props.carDetails && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
            }}
          >
            <div>
              <img
                width={180}
                style={{ borderRadius: "6px" }}
                src={props.carDetails?.printView?.carLicenseImage}
                alt=""
              />
            </div>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {" "}
                <p style={{ fontSize: "20px" }}>
                  {props.carDetails?.printView?.carModelName}
                </p>
                {props.carDetails?.printView?.tripStatus === "Start" ? (
                  <Badge
                    className="site-badge-count-109"
                    count={"Reserved"}
                    style={{
                      background: "#FBE9EC",
                      color: "#D7263D",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <Badge
                    className="site-badge-count-109"
                    count={"Active"}
                    style={{
                      background: "#E6F6F4",
                      color: "#00A991",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                )}
              </div>
              <p>License: {props.carDetails?.printView?.carLicenseNumber}</p>
              <p>Car Model: {props.carDetails?.printView?.carModelName}</p>
              <p>Gear Type: {props.carDetails?.printView?.gearType}</p>
              <p>Color: {props.carDetails?.printView?.carColor}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Car Characteristic</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Number of Doors</p>
                <p>Seats</p>
                <p>Total Run</p>
                <p>Register Date</p>
                <p>Fuel Capacity</p>
                <p>Per Hour Rental Fee</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.carDetails?.printView?.carDoors}</p>
                <p>{props.carDetails?.printView?.carSeats}</p>
                <p>{props.carDetails?.printView?.totalRun}</p>
                <p>
                  {moment(props.carDetails?.printView?.createAt).format(
                    "YYYY-MM-DD"
                  )}
                </p>
                <p>56L</p>
                <p>{props.carDetails?.printView?.hourlyRate}</p>
              </Col>
            </Row>
          </div>

          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Host Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Address</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.carDetails?.printView?.carOwner?.fullName}</p>
                <p>{props.carDetails?.printView?.carOwner?.email}</p>
                <p>{props.carDetails?.printView?.carOwner?.phoneNumber}</p>
                <p>{props.carDetails?.printView?.carOwner?.address}</p>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {props.rentInfoData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {" "}
                <p style={{ fontSize: "20px" }}>
                  {props.rentInfoData?.carModel}
                </p>
                {props.rentInfoData?.actionData?.carId?.tripStatus ===
                "Start" ? (
                  <Badge
                    className="site-badge-count-109"
                    count={"Reserved"}
                    style={{
                      background: "#FBE9EC",
                      color: "#D7263D",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <Badge
                    className="site-badge-count-109"
                    count={"Active"}
                    style={{
                      background: "#E6F6F4",
                      color: "#00A991",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                )}
              </div>
              <p>
                License:{" "}
                {props.rentInfoData?.actionData?.carId?.carLicenseNumber}
              </p>
              <p>
                Car Model: {props.rentInfoData?.actionData?.carId?.carModelName}
              </p>
              <p>
                Gear Type: {props.rentInfoData?.actionData?.carId?.gearType}
              </p>
              <p>Color: {props.rentInfoData?.actionData?.carId?.carColor}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Car Characteristic</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Number of Doors</p>
                <p>Seats</p>
                <p>Total Run</p>
                <p>Register Date</p>
                <p>Fuel Capacity</p>
                <p>Per Hour Rental Fee</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p> {props.rentInfoData?.actionData?.carId?.carDoors}</p>
                <p>{props.rentInfoData?.actionData?.carId?.carSeats}</p>
                <p>{props.rentInfoData?.actionData?.carId?.totalRun}</p>
                <p>
                  {moment(
                    props.rentInfoData?.actionData?.carId?.carDoors
                  ).format("YYYY-MM-DD")}
                </p>
                <p>{"56L"}</p>
                <p>{props.rentInfoData?.actionData?.carId?.hourlyRate}</p>
              </Col>
            </Row>
          </div>

          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>User Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Address</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.rentInfoData?.actionData?.userId?.fullName}</p>
                <p>{props.rentInfoData?.actionData?.userId?.email}</p>
                <p>{props.rentInfoData?.actionData?.userId?.phoneNumber}</p>
                <p>{props.rentInfoData?.actionData?.userId?.address}</p>
              </Col>
            </Row>
          </div>

          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Host Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Address</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.rentInfoData?.actionData?.hostId?.fullName}</p>
                <p>{props.rentInfoData?.actionData?.hostId?.email}</p>
                <p>{props.rentInfoData?.actionData?.hostId?.phoneNumber}</p>
                <p>{props.rentInfoData?.actionData?.hostId?.address}</p>
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}
      {props.userPaymentData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>
                {props.userPaymentData?.username}
              </p>
              <p>INE: SNHRM570818MDFPM10</p>
              <p>Trip Completes: 45</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>
              Trip Details{" "}
              <Badge
                className="site-badge-count-109"
                count={"complete"}
                style={{ backgroundColor: "#E6F6F4", color: "#00A991" }}
              />
            </Title>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Car Model</p>
                <p>Car Color</p>
                <p>Car License</p>
                <p>Host Name</p>
                <p>Host INE</p>
                <p>Pickup Location</p>
                <p>Drop-Off Location</p>
                <p>Total Rental Time</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.userPaymentData?.actions?.car?.carModelName}</p>
                <p>{props.userPaymentData?.actions?.car?.carColor}</p>
                <p>{props.userPaymentData?.actions?.car?.carLicenseNumber}</p>
                <p>Fahim</p>
                <p>BDAC287856B</p>
                <p>Moghbazer</p>
                <p>Rampura</p>
                <p>17 hours</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Payment Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Payment By</p>
                <p>Payment Method</p>
                <p>Payment Date</p>
                <p>Total Amount</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.userPaymentData?.username}</p>
                <p>{props.userPaymentData?.method}</p>
                <p>{props.userPaymentData?.time}</p>
                <p>{props.userPaymentData?.amount}</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}
      {props.dashboardEarningData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>
                {props.dashboardEarningData?.username}
              </p>
              <p>INE: SNHRM570818MDFPM10</p>
              <p>Trip Completes: 45</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>
              Trip Details{" "}
              <Badge
                className="site-badge-count-109"
                count={"complete"}
                style={{ backgroundColor: "#E6F6F4", color: "#00A991" }}
              />
            </Title>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Car Model</p>
                <p>Car Color</p>
                <p>Car License</p>
                <p>Host Name</p>
                <p>Host INE</p>
                <p>Pickup Location</p>
                <p>Drop-Off Location</p>
                <p>Total Rental Time</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>
                  {" "}
                  {props.dashboardEarningData?.printView?.carId?.carModelName}
                </p>
                <p> {props.dashboardEarningData?.printView?.carId?.carColor}</p>
                <p>
                  {" "}
                  {
                    props.dashboardEarningData?.printView?.carId
                      ?.carLicenseNumber
                  }
                </p>
                <p>
                  {" "}
                  {props.dashboardEarningData?.printView?.carId?.carModelName}
                </p>
                <p>
                  {" "}
                  {props.dashboardEarningData?.printView?.carId?.carModelName}
                </p>
                <p>
                  {" "}
                  {props.dashboardEarningData?.printView?.carId?.carModelName}
                </p>
                <p>
                  {" "}
                  {props.dashboardEarningData?.printView?.carId?.carModelName}
                </p>
                <p>
                  17{" "}
                  {props.dashboardEarningData?.printView?.carId?.carModelName}
                </p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>Payment Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Payment By</p>
                <p>Payment Method</p>
                <p>Payment Date</p>
                <p>Total Amount</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.dashboardEarningData?.username}</p>
                <p>{props.dashboardEarningData?.method}</p>
                <p>
                  {moment(props.dashboardEarningData?.time).format(
                    "YYYY-DD-MM"
                  )}
                </p>
                <p>{props.dashboardEarningData?.amount}</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
              onClick={handleGenerateDownload}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
                width: "265px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}
      {props.hostKycData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.hostKycData?.name}</p>
              <p>INE: SNHRM570818MDFPM10</p>
              <p>Trip Completes: 45</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>Host Information</Title>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Gender</p>
                <p>Date of Birth</p>
                <p>Address</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>{props.hostKycData?.name}</p>
                <p>{props.hostKycData?.email}</p>
                <p>{props.hostKycData?.contact}</p>
                <p>{props.hostKycData?.actions?.gender}</p>
                <p>{props.hostKycData?.actions?.dateOfBirth}</p>
                <p>{props.hostKycData?.actions?.address}</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Title level={4}>More Information</Title>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Joining Date</p>
                <p>Register Method</p>
                <p>Last Log In</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>
                  {moment(props.hostKycData?.actions?.createdAt).format(
                    "YYYY-MM-DD"
                  )}
                </p>
                <p>Email</p>
                <p>Last Login Date</p>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {props.carKycData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <img
                width={120}
                style={{ borderRadius: "5px" }}
                src="https://avatars.githubusercontent.com/u/86902893?s=400&u=5c636d3d7bfab170f2f42e5a759e0c426eadb008&v=4"
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.carKycData?.name}</p>
              <p>License: {props.carKycData?.actions?.carLicenseNumber}</p>
              <p>Car Model: {props.carKycData?.actions?.carModelName}</p>
              <p>Gear Type: {props.carKycData?.actions?.gearType}</p>
              <p>Color: {props.carKycData?.actions?.carColor}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>Car Characteristics</Title>
          </div>
          <div
            style={{
              margin: "15px 0",
              borderBottom: "1px solid gray",
              paddingBottom: "15px",
            }}
          >
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Number of Doors</p>
                <p>Seats</p>
                <p>Total Run</p>
                <p>Register Date</p>
                <p>Fuel Capacity</p>
                <p>Per Hour Rental Fee</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p> {props.carKycData?.actions?.carDoors}</p>
                <p> {props.carKycData?.actions?.carSeats}</p>
                <p> {props.carKycData?.actions?.totalRun}</p>
                <p> {props.carKycData?.actions?.createdAt}</p>
                <p> 56L</p>
                <p> {props.carKycData?.actions?.hourlyRate}</p>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawerPage;
