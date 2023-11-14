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
  const { isSuccess, message, adminData, isLoading } = useSelector(
    (state) => state.adminData
  );
  const [img, setImg] = useState();

  const { fullName, address, phoneNumber, email, dateOfBirth, ine, image } =
    userFromLocalStorage;

  const initialFormValues = {
    name: fullName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth ? moment(dateOfBirth) : null,
    address: address,
    inc: ine,
  };

  const handleChange = () => {
    setProfileEdit(true);
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: image,
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImg(newFileList[0].originFileObj);
  };

  const handleProfileUpdate = (values) => {
    const formData = new FormData();

    formData.append("fullName", values.name);
    formData.append("address", values.address);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("email", values.email);
    formData.append("ine", values.ine);
    formData.append("dateOfBirth", values.dateOfBirth);

    // Append text data
    if (img) {
      formData.append("image", img);
    }

    dispatch(AdminData(formData));

    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Wow!",
        text: message,
      });
      setProfileEdit(false);
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
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Image width={150} style={{ borderRadius: "6px" }} src={image} />
              <div>
                <h2>{fullName}</h2>
                <p>@{fullName}</p>
                <p>INE: {ine}</p>
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
                alignItems: "center",
                gap: "20px",
                borderBottom: "1px solid #d9d9d9",
                paddingBottom: "30px",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "150px" }}>
                <ImgCrop rotationSlider style={{ width: "100%" }}>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    style={{ width: "150px" }}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
          </div>

          <Form
            name="normal_login"
            className="login-form"
            onFinish={handleProfileUpdate}
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

            {isLoading ? (
              <p>Loading...</p>
            ) : (
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
            )}
          </Form>
        </>
      )}
    </>
  );
};

export default PersonalInfo;
