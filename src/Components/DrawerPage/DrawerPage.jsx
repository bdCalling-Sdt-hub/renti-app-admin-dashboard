/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Badge, Button, Col, Form, Input, Row, Select, Typography } from "antd";
import moment from "moment";
import React, { useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import axios from "../../../Config";
import { imgUrl } from "../../../ImageConfig";
import img from "../../Images/1.png";
import pdfImg from "../../Images/file.png";

const { Title } = Typography;

const { Option } = Select;

const token = localStorage.token;

const DrawerPage = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "",
  });

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

  console.log("drawer", props);

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

  //user information
  const handleBlockUser = () => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to block user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Block",
    }).then((result) => {
      if (result.isConfirmed) {
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
                text: "User Block successfully",
              });
            }
            props.setIsDrawerVisible(false);
            props?.setUserInfoReload((prev) => prev + 1);
          });
      }
    });
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: "Moved to trash",
      text: "User go to the trash",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `api/user/banned/${props.userInfoData?.key}`,
            { isApprove: "trash" },
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
                text: "User Delete successfully",
              });
              props.setIsDrawerVisible(false);
              props?.setUserInfoReload((prev) => prev + 1);
            }
          });
      }
    });
  };

  //host information
  const handleBlockHost = () => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to block host",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Block",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `api/user/banned/${props.hostData?.action.host._id}`,
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
                title: "Successfully",
                text: "Host Blocked",
              });
              props.setIsDrawerVisible(false);
              props?.setReload((prev) => prev + 1);
            }
          });
      }
    });
  };

  const handleDeleteHost = () => {
    Swal.fire({
      title: "Moved to trash",
      text: "Host go to the trash",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `api/user/banned/${props.hostData?.action.host._id}`,
            { isApprove: "trash" },
            {
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Move!", "Successfully moved Host", "success");
              props.setIsDrawerVisible(false);
              props?.setReload((prev) => prev + 1);
            }
          });
      }
    });
  };

  //car information
  const handleBlockCar = () => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to block user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Block",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `api/car/banned/${props.carDetails?.key}`,
            { isCarActive: "cancel" },
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
                text: "Car Block successfully",
              });
            }
            props.setIsDrawerVisible(false);
            props?.setReload((prev) => prev + 1);
          });
      }
    });
  };

  const handleDeleteCar = () => {
    Swal.fire({
      title: "Moved to trash",
      text: "User go to the trash",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `api/car/banned/${props.carDetails?.key}`,
            { isCarActive: "trash" },
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
                text: "Car Delete successfully",
              });
              props.setIsDrawerVisible(false);
              props?.setReload((prev) => prev + 1);
            }
          });
      }
    });
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
                src={`${imgUrl}${props.userInfoData?.userInfo?.image}`}
                alt=""
              />
            </div>
            <div style={{ marginTop: "-6px" }}>
              <p style={{ fontSize: "20px" }}>{props.userInfoData?.name}</p>
              <p>INE: {props.userInfoData?.userInfo?.ine}</p>
              <p>
                Trip Completes:{" "}
                {props.userInfoData?.actions?.userInfo?.tripCompleted || 0}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>
                  {props.userInfoData?.actions?.userInfo?.averageRatings || 0}
                </span>
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
            {/* <Form.Item
              label="Driving License No."
              labelCol={{ span: 24 }}
              style={{ marginBottom: "0px" }}
            >
              <Input
                style={{ height: "45px" }}
                defaultValue={"License"}
                readOnly
              />
            </Form.Item> */}
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
              onClick={handleDeleteUser}
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
          <div ref={componentRef}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                borderBottom: "1px solid gray",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <div>
                <img
                  width={120}
                  style={{ borderRadius: "5px" }}
                  src={`${imgUrl}${props.earningData.printView?.userId?.image}`}
                  alt=""
                />
              </div>
              <div style={{ marginTop: "-7px" }}>
                <p style={{ fontSize: "20px" }}>{props.earningData.username}</p>
                <p>INE: {props.earningData?.printView?.userId?.ine}</p>
                <p>
                  Trip Completes:
                  {props.earningData?.printView?.userId?.tripCompleted}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <AiFillStar color="#fba91d" />
                  <span>
                    {props.earningData?.printView?.userId?.averageRatings}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Title level={4}>
                Trip Details{" "}
                {props.earningData?.printView?.paymentData?.status ===
                "succeeded" ? (
                  <Badge
                    className="site-badge-count-109"
                    count={"Completed"}
                    style={{
                      background: "#E6F6F4",
                      color: "#00A991",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <Badge
                    className="site-badge-count-109"
                    count={"Pending"}
                    style={{
                      background: "#FBE9EC",
                      color: "#D7263D",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                )}
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

                  <p>Total Rental Time</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p> {props.earningData?.printView?.carId?.carModelName}</p>
                  <p> {props.earningData?.printView?.carId?.carColor}</p>
                  <p>
                    {" "}
                    {props.earningData?.printView?.carId?.carLicenseNumber}
                  </p>
                  <p>
                    {" "}
                    {props.earningData?.printView?.hostId?.fullName || "Name"}
                  </p>
                  <p>
                    {" "}
                    {props.earningData?.printView?.hostId?.ine ||
                      "INE Number"}{" "}
                  </p>

                  <p>
                    {props.earningData?.printView?.hostId?.address?.line1 +
                      ", " +
                      props.earningData?.printView?.hostId?.address?.city ||
                      "Address"}
                  </p>
                  <p>
                    {props.earningData?.printView?.rentId?.totalHours ||
                      "Total Rental"}{" "}
                    hours
                  </p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "15px 0",
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
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "92%",
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
              }}
              onClick={handlePrint}
            >
              Print/Download
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
                src={`${imgUrl}${props.hostData?.action?.host?.image}`}
                alt=""
              />
            </div>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {" "}
                <p style={{ fontSize: "20px" }}>{props?.hostData?.name}</p>
              </div>
              <p>INC: {props?.hostData?.action?.host?.ine}</p>
              <p>
                Trip Completed:{" "}
                {props.hostData?.actions?.host?.tripCompleted || 0}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>
                  {" "}
                  {props.hostData?.actions?.host?.averageRatings || 0}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Email</label>
              <Input
                readOnly
                style={{ height: "40px" }}
                defaultValue={props?.hostData?.email}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Phone</label>
              <Input
                readOnly
                style={{ height: "40px" }}
                defaultValue={props?.hostData?.contact}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Address</label>
              <Input
                readOnly
                style={{ height: "40px" }}
                defaultValue={
                  props?.hostData?.action?.host?.address?.line1 +
                  ", " +
                  props?.hostData?.action?.host?.address?.city +
                  ", " +
                  props?.hostData?.action?.host?.address?.state
                }
              />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Number</label>
                <Input
                  readOnly
                  style={{ height: "40px" }}
                  defaultValue={
                    props?.hostData?.action?.host?.bankInfo?.account_number
                  }
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Holder Name</label>
                <Input
                  readOnly
                  style={{ height: "40px" }}
                  defaultValue={
                    props?.hostData?.action?.host?.bankInfo?.account_holder_name
                  }
                />
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
              onClick={handleBlockHost}
              style={{
                border: "1px solid red",
                color: "red",
                height: 50,
                width: "270px",
              }}
            >
              Block
            </Button>
            <Button
              block
              onClick={handleDeleteHost}
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
                src={`${imgUrl}${props.carDetails?.printView?.image[0]}`}
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
              <p>
                <span style={{ fontWeight: "bold" }}>License:</span>{" "}
                {props.carDetails?.printView?.carLicenseNumber}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Car Model:</span>{" "}
                {props.carDetails?.printView?.carModelName}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Gear Type:</span>{" "}
                {props.carDetails?.printView?.gearType}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Color:</span>{" "}
                {props.carDetails?.printView?.carColor}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>{props.carDetails?.printView?.averageRatings | 0}</span>
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
                  {moment(props.carDetails?.printView?.createAt).format("lll")}
                </p>
                <p>56L</p>
                <p>{props.carDetails?.printView?.hourlyRate}</p>
              </Col>
            </Row>
          </div>

          <div
            style={{
              margin: "15px 0",
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
                <p>{props.carDetails?.printView?.carOwner?.address?.city}</p>
              </Col>
            </Row>
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
              onClick={handleBlockCar}
              style={{
                border: "1px solid red",
                color: "red",
                height: 50,
                width: "270px",
              }}
            >
              Block
            </Button>
            <Button
              block
              onClick={handleDeleteCar}
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
      {props.rentInfoData && (
        <div>
          <div ref={componentRef}>
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
                  src={`${imgUrl}${props.rentInfoData?.actionData?.carId?.image[0]}`}
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
                  <div
                    style={{
                      color:
                        props.rentInfoData?.actionData?.requestStatus ==
                        "Accepted"
                          ? "#000b90"
                          : props.rentInfoData?.actionData?.requestStatus ==
                            "Pending"
                          ? "#D7263D"
                          : "#00A991",
                      backgroundColor:
                        props.rentInfoData?.actionData?.requestStatus ==
                        "Accepted"
                          ? "#e2e4ff"
                          : props.rentInfoData?.actionData?.requestStatus ==
                            "Pending"
                          ? "#FBE9EC"
                          : "#E6F6F4",
                      padding: "5px",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    {props.rentInfoData?.actionData?.requestStatus}
                  </div>
                </div>
                <p>
                  License:{" "}
                  {props.rentInfoData?.actionData?.carId?.carLicenseNumber}
                </p>
                <p>
                  Car Model:{" "}
                  {props.rentInfoData?.actionData?.carId?.carModelName}
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
                  <p>
                    {props.rentInfoData?.actionData?.hostId?.address?.line1 +
                      ", " +
                      props.rentInfoData?.actionData?.hostId?.address?.city ||
                      "address not provided"}
                  </p>
                </Col>
              </Row>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "92%",
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
              }}
              onClick={handlePrint}
            >
              Print/Download
            </Button>
          </div>
        </div>
      )}
      {props.userPaymentData && (
        <div>
          <div ref={componentRef}>
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
                  src={`${imgUrl}${props.userPaymentData?.actions?.userInfo?.image}`}
                  alt=""
                />
              </div>
              <div style={{ marginTop: "-7px" }}>
                <p style={{ fontSize: "20px" }}>
                  {props.userPaymentData?.username}
                </p>
                <p>
                  INE:{" "}
                  {props.userPaymentData?.actions?.userInfo?.ine ||
                    "Ine number isn't provided"}
                </p>
                <p>
                  Trip Completes:{" "}
                  {props.userPaymentData?.actions?.userInfo?.tripCompleted || 0}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <AiFillStar color="#fba91d" />
                  <span>
                    {" "}
                    {props.userPaymentData?.actions?.userInfo?.averageRatings ||
                      0}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Title level={4}>
                Trip Details{" "}
                <Badge
                  className="site-badge-count-109"
                  count={
                    props.userPaymentData?.actions?.status
                      ? "Completed"
                      : "Pending"
                  }
                  style={{
                    background: "#E6F6F4",
                    color: "#00A991",
                    fontSize: "11px",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
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
                  <p>Total Rental Time</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>{props.userPaymentData?.actions?.car?.carModelName}</p>
                  <p>{props.userPaymentData?.actions?.car?.carColor}</p>
                  <p>{props.userPaymentData?.actions?.car?.carLicenseNumber}</p>
                  <p>
                    {props.userPaymentData?.actions?.rentInfo?.hostId?.fullName}
                  </p>
                  <p>{props.userPaymentData?.actions?.rentInfo?.hostId?.ine}</p>
                  <p>
                    {props.userPaymentData?.actions?.rentInfo?.hostId?.address
                      ?.line1 +
                      ", " +
                      props.userPaymentData?.actions?.rentInfo?.hostId?.address
                        ?.city}
                  </p>
                  <p>
                    {props.userPaymentData?.actions?.rentInfo?.totalHours} hours
                  </p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "15px 0",

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
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "92%",
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
              }}
              onClick={handlePrint}
            >
              Print/Download
            </Button>
          </div>
        </div>
      )}
      {props.hostPaymentData && (
        <div>
          <div ref={componentRef}>
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
                  src={`${imgUrl}${props.hostPaymentData?.actions?.carOwner?.image}`}
                  alt=""
                />
              </div>
              <div style={{ marginTop: "-7px" }}>
                <p style={{ fontSize: "20px" }}>
                  {props.hostPaymentData?.username}
                </p>
                <p>INE: {props.hostPaymentData?.actions?.carOwner?.ine}</p>
                <p>Total Cars: {props.hostPaymentData?.actions?.carTotal}</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <AiFillStar color="#fba91d" />
                  <span>
                    {" "}
                    {props.hostPaymentData?.actions?.carOwner?.averageRatings ||
                      0}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Title level={4}>
                Payment Information{" "}
                {props.hostPaymentData?.actions?.status === "succeeded" ? (
                  <Badge
                    className="site-badge-count-109"
                    count={"Completed"}
                    style={{
                      background: "#E6F6F4",
                      color: "#00A991",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <Badge
                    className="site-badge-count-109"
                    count={"Pending"}
                    style={{
                      background: "#FBE9EC",
                      color: "#D7263D",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                )}
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
                  <p>Account Name</p>
                  <p>Account Number</p>
                  <p>Phone Number</p>
                  <p>Payment Method</p>
                  <p>Payment Date</p>
                  <p>Total Amount(Including 25%)</p>
                  <p>Paid Amount(Without 25%)</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>Account Name</p>
                  <p>Account Number</p>
                  <p>{props.hostPaymentData?.actions?.carOwner.phoneNumber}</p>
                  <p>{props.hostPaymentData?.actions?.method}</p>
                  <p>
                    {moment(props.hostPaymentData?.actions?.time).format(
                      "DD-MM-YYYY"
                    )}
                  </p>
                  <p>{props.hostPaymentData?.totalamount}</p>
                  <p>{props.hostPaymentData?.paidamount}</p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "15px 0",

                paddingBottom: "15px",
              }}
            >
              <Title level={4}>More Information</Title>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  {/* <p>Total Trips Completed</p>
                  <p>Trip Cancel</p> */}
                  <p>Week Start Date</p>
                  <p>Week End Date</p>
                  <p>Total Rental Time</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  {/* <p>
                    {props.hostPaymentData?.actions?.carOwner?.tripCompleted ||
                      0}
                  </p>
                  <p>Trip Cancel</p> */}

                  <p>
                    {moment(props.hostPaymentData?.actions?.startDate).format(
                      "lll"
                    )}
                  </p>

                  <p>
                    {moment(props.hostPaymentData?.actions?.endDate).format(
                      "lll"
                    )}
                  </p>
                  <p>
                    {props.hostPaymentData?.actions?.rentTotalHours +
                      " Hours" || 0}
                  </p>
                </Col>
              </Row>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "92%",
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
              }}
              onClick={handlePrint}
            >
              Print/Download
            </Button>
          </div>
        </div>
      )}
      {props.dashboardEarningData && (
        <div>
          <div ref={componentRef}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "10px",
                marginBottom: "15px",
              }}
            >
              <div>
                <img
                  width={120}
                  style={{ borderRadius: "5px" }}
                  src={`${imgUrl}${props.dashboardEarningData?.printView?.userId?.image}`}
                  alt=""
                />
              </div>
              <div style={{ marginTop: "-7px" }}>
                <p style={{ fontSize: "20px" }}>
                  {props.dashboardEarningData?.username}
                </p>
                <p>INE: {props.dashboardEarningData?.printView?.userId?.ine}</p>
                <p>
                  Trip Completes:{" "}
                  {props.dashboardEarningData?.printView?.userId
                    ?.tripCompleted || 0}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <AiFillStar color="#fba91d" />
                  <span>
                    {" "}
                    {props.dashboardEarningData?.printView?.userId
                      ?.averageRatings || 0}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Title level={5}>
                Trip Details{" "}
                {props.dashboardEarningData?.printView?.paymentData?.status ===
                "succeeded" ? (
                  <Badge
                    className="site-badge-count-109"
                    count={"Completed"}
                    style={{
                      background: "#E6F6F4",
                      color: "#00A991",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <Badge
                    className="site-badge-count-109"
                    count={"Pending"}
                    style={{
                      background: "#FBE9EC",
                      color: "#D7263D",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                )}
              </Title>
            </div>

            <div
              style={{
                margin: "15px 0",
                borderBottom: "1px solid #ebebeb",
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
                  <p>Total Rental Time</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>
                    {" "}
                    {props.dashboardEarningData?.printView?.carId?.carModelName}
                  </p>
                  <p>
                    {" "}
                    {props.dashboardEarningData?.printView?.carId?.carColor}
                  </p>
                  <p>
                    {" "}
                    {
                      props.dashboardEarningData?.printView?.carId
                        ?.carLicenseNumber
                    }
                  </p>
                  <p>
                    {" "}
                    {props.dashboardEarningData?.printView?.hostId?.fullName}
                  </p>
                  <p>
                    {" "}
                    {props.dashboardEarningData?.printView?.hostId?.ine ||
                      "INE:"}{" "}
                  </p>
                  <p>
                    {props.dashboardEarningData?.printView?.hostId?.address
                      ?.line1 +
                      ", " +
                      props.dashboardEarningData?.printView?.hostId?.address
                        ?.city}
                  </p>
                  <p>
                    {props.dashboardEarningData?.printView?.rentId?.totalHours}{" "}
                    Hours
                  </p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "15px 0",
                paddingBottom: "15px",
              }}
            >
              <Title level={5}>Payment Information</Title>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <p>Payment By</p>
                  <p>Payment Method</p>
                  <p>Payment Date</p>
                  <p>Total Amount</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>{props.dashboardEarningData?.username || ""}</p>
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
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "92%",
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
              }}
              onClick={handlePrint}
            >
              Print/Download
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
                src={`${imgUrl}${props.hostKycData?.actions?.image}`}
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.hostKycData?.name}</p>
              <p>INE: {props.hostKycData?.actions?.ine}</p>
              <p>
                Trip Completes: {props.hostKycData?.actions?.tripCompleted || 0}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span> {props.hostKycData?.actions?.averageRatings || 0}</span>
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
                <p>{props.hostKycData?.actions?.address?.city}</p>
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
          <div
            style={{
              margin: "15px 0",
            }}
          >
            <Title level={4}>KYC Documents</Title>
            {props.hostKycData?.actions?.KYC.map((kyc, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <a
                  href={`${imgUrl}${kyc}`}
                  target="_blank"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#000b90",
                  }}
                  rel="noreferrer"
                >
                  <img
                    src={pdfImg}
                    style={{ width: "50px", height: "50px" }}
                    alt="PDF Icon"
                  />
                  View Document
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {props.userKycData && (
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
                src={`${imgUrl}${props.userKycData?.actions?.image}`}
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.userKycData?.name}</p>
              <p>INE: {props.userKycData?.actions?.ine}</p>
              <p>
                Trip Completes: {props.userKycData?.actions?.tripCompleted || 0}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span> {props.userKycData?.actions?.averageRatings || 0}</span>
              </div>
            </div>
          </div>
          <div>
            <Title level={4}>User Information</Title>
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
                <p>{props.userKycData?.name}</p>
                <p>{props.userKycData?.email}</p>
                <p>{props.userKycData?.contact}</p>
                <p>{props.userKycData?.actions?.gender}</p>
                <p>{props.userKycData?.actions?.dateOfBirth}</p>
                <p>{props.userKycData?.actions?.address}</p>
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
                  {moment(props.userKycData?.actions?.createdAt).format(
                    "YYYY-MM-DD"
                  )}
                </p>
                <p>Email</p>
                <p>Last Login Date</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              margin: "15px 0",
            }}
          >
            <Title level={4}>KYC Documents</Title>
            {props.userKycData?.actions?.KYC.map((kyc, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <a
                  href={`${imgUrl}${kyc}`}
                  target="_blank"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#000b90",
                  }}
                  rel="noreferrer"
                >
                  <img
                    src={pdfImg}
                    alt="PDF Icon"
                    style={{ width: "50px", height: "50px" }}
                  />
                  View Document
                </a>
              </div>
            ))}
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
                src={`${imgUrl}${props.carKycData?.actions?.image[0]}`}
                alt=""
              />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {" "}
                <p style={{ fontSize: "20px" }}>{props.carKycData?.name}</p>
                {props.carKycData?.actions?.tripStatus === "Start" ? (
                  <div
                    style={{
                      background: "#FBE9EC",
                      color: "#D7263D",
                      padding: "5px",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    Reserved
                  </div>
                ) : (
                  <div
                    style={{
                      background: "#E6F6F4",
                      color: "#00A991",
                      padding: "5px",
                      fontSize: "11px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    Active
                  </div>
                )}
              </div>
              <p>
                <span style={{ fontWeight: "bold" }}>License:</span>{" "}
                {props.carKycData?.actions?.carLicenseNumber}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Car Model:</span>{" "}
                {props.carKycData?.actions?.carModelName}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Gear Type:</span>{" "}
                {props.carKycData?.actions?.gearType}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Color:</span>{" "}
                {props.carKycData?.actions?.carColor}
              </p>
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
                <p>
                  {" "}
                  {moment(props.carKycData?.actions?.createdAt).format(
                    "YYYY-MM-DD"
                  )}
                </p>
                <p> 56L</p>
                <p> {props.carKycData?.actions?.hourlyRate}</p>
              </Col>
            </Row>
          </div>
          <div
            style={{
              margin: "15px 0",
            }}
          >
            <Title level={4}>KYC Documents</Title>
            {props.carKycData?.actions?.KYC.map((kyc, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <a
                  href={`${imgUrl}${kyc}`}
                  target="_blank"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#000b90",
                  }}
                  rel="noreferrer"
                >
                  <img
                    src={pdfImg}
                    alt="PDF Icon"
                    style={{ width: "50px", height: "50px" }}
                  />
                  View Document
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {props.rentiIncomeData && (
        <div>
          <div ref={componentRef}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <div>
                <img
                  width={120}
                  style={{ borderRadius: "5px" }}
                  src={`${imgUrl}${props.rentiIncomeData?.actions?.carOwner?.image}`}
                  alt=""
                />
              </div>
              <div style={{ marginTop: "-7px" }}>
                <p style={{ fontSize: "20px" }}>
                  {props.rentiIncomeData?.actions?.carOwner?.fullName}
                </p>
                <p>INE: {props.rentiIncomeData?.actions?.carOwner?.ine}</p>
                <p>
                  Trip Completes:{" "}
                  {props.rentiIncomeData?.actions?.carOwner?.tripCompleted || 0}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <AiFillStar color="#fba91d" />
                  <span>
                    {" "}
                    {props.rentiIncomeData?.actions?.carOwner?.averageRatings ||
                      0}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Title level={5}>Trip Details</Title>
            </div>
            <div
              style={{
                margin: "10px 0",
                borderBottom: "1px solid #ebebeb",
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
                  <p>Total Rental Time</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>
                    {" "}
                    {
                      props.rentiIncomeData?.actions?.rentInfo?.carId
                        ?.carModelName
                    }
                  </p>
                  <p>
                    {props.rentiIncomeData?.actions?.rentInfo?.carId?.carColor}
                  </p>
                  <p>
                    {" "}
                    {
                      props.rentiIncomeData?.actions?.rentInfo?.carId
                        ?.carLicenseNumber
                    }
                  </p>
                  <p>
                    {" "}
                    {props.rentiIncomeData?.actions?.rentInfo?.hostId?.fullName}
                  </p>
                  <p>
                    {" "}
                    {props.rentiIncomeData?.actions?.rentInfo?.hostId?.ine}
                  </p>
                  <p>
                    {" "}
                    {props.rentiIncomeData?.actions?.rentInfo?.hostId?.address
                      ?.line1 +
                      ", " +
                      props.rentiIncomeData?.actions?.rentInfo?.hostId?.address
                        ?.city}
                  </p>
                  <p>
                    {props.rentiIncomeData?.actions?.rentInfo?.totalHours} Hours
                  </p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "10px 0",
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "15px",
              }}
            >
              <Title level={5}>Total Payment By User</Title>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <p>Payment By</p>
                  <p>Payment Method</p>
                  <p>Payment Date</p>
                  <p>Total Amount</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>{props.rentiIncomeData?.actions?.carOwner?.fullName}</p>
                  <p>{props.rentiIncomeData?.actions?.method}</p>
                  <p>
                    {moment(props.rentiIncomeData?.time).format("YYYY-DD-MM")}
                  </p>
                  <p>{props.rentiIncomeData?.totalAmount}</p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "10px 0",
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "15px",
              }}
            >
              <Title level={5}>Stripe Fee</Title>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <p>Payment Date</p>
                  <p>Total Amount</p>
                  <p>Stripe Fee</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>
                    {moment(props.rentiIncomeData?.time).format("YYYY-DD-MM")}
                  </p>
                  <p>{props.rentiIncomeData?.totalAmount}</p>
                  <p>{props.rentiIncomeData?.stripeFee}</p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "10px 0",
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "15px",
              }}
            >
              <Title level={5}>Host Payment</Title>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <p>Payment Date</p>
                  <p>Total Amount</p>
                  <p>Stripe Fee</p>
                  <p>Host Payment</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>
                    {moment(props.rentiIncomeData?.time).format("YYYY-DD-MM")}
                  </p>
                  <p>{props.rentiIncomeData?.actions?.method}</p>
                  <p>{props.rentiIncomeData?.stripeFee}</p>
                  <p>{props.rentiIncomeData?.hostPayment}</p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                margin: "10px 0",
                paddingBottom: "15px",
                marginBottom: "50px",
              }}
            >
              <Title level={5}>Renti Income</Title>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <p>Date</p>
                  <p>Total Amount</p>
                  <p>Stripe Fee</p>
                  <p>Host Payment</p>
                  <p>Renti's Income</p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>
                    {moment(props.rentiIncomeData?.time).format("YYYY-DD-MM")}
                  </p>
                  <p>{props.rentiIncomeData?.totalAmount}</p>
                  <p>{props.rentiIncomeData?.stripeFee}</p>
                  <p>{props.rentiIncomeData?.hostPayment}</p>
                  <p>{props.rentiIncomeData?.rentiIncome}</p>
                </Col>
              </Row>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "92%",
            }}
          >
            <Button
              block
              style={{
                background: "#000B90",
                color: "white",
                height: 50,
              }}
              onClick={handlePrint}
            >
              Print/Download
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawerPage;
