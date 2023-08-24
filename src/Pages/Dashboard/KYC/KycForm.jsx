import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import styleForm from "./KycForm.module.css";
const { Option } = Select;

const KycForm = () => {
  const [form, setForm] = useState("host");

  const [selectedCountry, setSelectedCountry] = useState("usa");

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const style = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },
    formNavigateBtn: {
      height: "50px",
    },
    input: {
      height: "40px",
    },
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "10px" }}>Kyc Form</h2>
      <div style={style.formContainer}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #cbcbcb",
            padding: "10px",
            gap: "10px",
          }}
        >
          <Button
            type="text"
            onClick={() => setForm("host")}
            className={`${form === "host" ? styleForm.navigateBtn : ""}`}
            style={style.formNavigateBtn}
            block
          >
            Host
          </Button>
          <Button
            type="text"
            onClick={() => setForm("user")}
            className={`${form === "user" ? styleForm.navigateBtn : ""}`}
            style={style.formNavigateBtn}
            block
          >
            User
          </Button>
          <Button
            type="text"
            onClick={() => setForm("car")}
            className={`${form === "car" ? styleForm.navigateBtn : ""}`}
            style={style.formNavigateBtn}
            block
          >
            Car
          </Button>
        </div>

        <div style={{ margin: "50px 0" }}>
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <label htmlFor="">Full Name</label>
                  <Form.Item name="name">
                    <Input
                      style={style.input}
                      placeholder="Type full name here"
                    />
                  </Form.Item>
                </div>
                <div>
                  <label
                    htmlFor=""
                    style={{ display: "block", marginBottom: "15px" }}
                  >
                    Gender
                  </label>
                  <Radio.Group>
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                    <Radio value={3}>Others</Radio>
                  </Radio.Group>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label htmlFor="">Phone Number</label>
                  <div style={{ display: "flex" }}>
                    <Form.Item name="country">
                      <Select
                        placeholder="Select a country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        <Option value="usa" selected>
                          🏳️‍⚧️
                        </Option>
                        <Option value="canada">🏳️‍🌈</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="number">
                      <Input
                        placeholder="Type Phone number here"
                        style={{
                          width: "465px",
                          height: "40px",
                          marginLeft: "10px",
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <label htmlFor="">Address</label>
                  <Form.Item name="address">
                    <Input
                      style={style.input}
                      placeholder="Type address here"
                    />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="">RFC</label>
                  <Form.Item name="rfc">
                    <Input style={style.input} placeholder="Type RFC here" />
                  </Form.Item>
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <label htmlFor="">Email</label>
                  <Form.Item name="email">
                    <Input style={style.input} placeholder="Type email here" />
                  </Form.Item>
                </div>

                <div style={{ margin: "15px 0" }}>
                  <label htmlFor="">Date of Birth</label>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <DatePicker style={{ height: "40px" }} format="DD" />
                    <DatePicker
                      style={{ height: "40px" }}
                      format="MM"
                      onlyMonthPicker
                    />
                    <DatePicker style={{ height: "40px" }} onlyYearPicker />
                  </div>
                </div>

                <div>
                  <label htmlFor="">Credit Card Number</label>
                  <Form.Item name="cardNumber">
                    <Input
                      style={style.input}
                      placeholder="Type card number here"
                    />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="">Expire Date</label>
                  <Form.Item name="expireDate">
                    <Input style={style.input} placeholder="MM-YY" />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="">CVV</label>
                  <Form.Item name="cvv">
                    <Input style={style.input} placeholder="Type CVV here" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default KycForm;
