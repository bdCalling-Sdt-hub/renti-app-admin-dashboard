import { Button, Col, DatePicker, Form, Image, Input, Row, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";

import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AdminData } from "../../../ReduxSlices/ProfileUpdatedSlice";

const PersonalInfo = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.UserData);
  const { isSuccess, message } = useSelector((state) => state.adminData);

  const { fullName, address, phoneNumber, email, dateOfBirth } =
    userFromLocalStorage;

  const initialFormValues = {
    name: fullName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth ? moment(dateOfBirth) : null,
    address: address,
    inc: "", // Add a default value for inc if necessary
  };

  const handleChange = () => {
    setProfileEdit(true);
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (values) => {
    const userUpdatedValues = {
      ...userFromLocalStorage,
      fullName: values.name,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
    };

    dispatch(AdminData(userUpdatedValues));
    localStorage.setItem("yourInfo", JSON.stringify(userUpdatedValues));

    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Wow!",
        text: message,
      });
    }
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
                <h2>{fullName}</h2>
                <p>@{fullName}</p>
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

          <Form
            name="normal_login"
            className="login-form"
            initialValues={initialFormValues}
          >
            <Form.Item
              name="name"
              label="Name"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "15px" }}
            >
              <Input style={{ height: "45px" }} readOnly />
            </Form.Item>

            <Row gutter={15} style={{ marginBottom: "0px" }}>
              <Col span={12}>
                <Form.Item name="email" label="Email" labelCol={{ span: 24 }}>
                  <Input style={{ height: "45px" }} readOnly />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  labelCol={{ span: 24 }}
                >
                  <Input style={{ height: "45px" }} readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={15} style={{ marginBottom: "0px" }}>
              <Col span={12}>
                <Form.Item name="inc" label="INE" labelCol={{ span: 24 }}>
                  <Input style={{ height: "45px" }} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  labelCol={{ span: 24 }}
                >
                  <DatePicker
                    style={{ height: "45px", width: "100%" }}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Address"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "10px" }}
            >
              <Input style={{ height: "45px" }} readOnly />
            </Form.Item>
          </Form>
        </>
      ) : (
        //edit profile section here
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
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>

              <div>
                <h2>{fullName}</h2>
                <p>@{fullName}</p>
                <p>INE: GMVLMR80070501M100</p>
              </div>
            </div>
          </div>

          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            initialValues={initialFormValues}
          >
            <Form.Item
              name="name"
              label="Name"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "15px" }}
            >
              <Input style={{ height: "45px" }} />
            </Form.Item>

            <Row gutter={15} style={{ marginBottom: "0px" }}>
              <Col span={12}>
                <Form.Item name="email" label="Email" labelCol={{ span: 24 }}>
                  <Input style={{ height: "45px" }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  labelCol={{ span: 24 }}
                >
                  <Input style={{ height: "45px" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={15} style={{ marginBottom: "0px" }}>
              <Col span={12}>
                <Form.Item name="inc" label="INE" labelCol={{ span: 24 }}>
                  <Input style={{ height: "45px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  labelCol={{ span: 24 }}
                >
                  <DatePicker style={{ height: "45px", width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Address"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "10px" }}
            >
              <Input style={{ height: "45px" }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "45px",
                  fontWeight: "400px",
                  fontSize: "18px",
                  background: "#000B90",
                  marginTop: "60px",
                }}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default PersonalInfo;
