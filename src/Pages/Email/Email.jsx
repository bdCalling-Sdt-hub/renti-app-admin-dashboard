import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../Config";
import logo from "../../Images/Logo.png";
import style from "./Email.module.css";

const { Title, Paragraph, Text, Link } = Typography;

const Email = () => {
  const navigate = useNavigate();
  const handleEmail = (values) => {
    const email = values.email;
    axios
      .post("/api/user/forget-password", { email: email })
      .then((res) => {
        if (res.data.message) {
          Swal.fire("✅", "Successfully Send OTP on your email", "success");
          navigate(`/forget-password/${values.email}`);
        }
      })
      .catch((err) => Swal.fire("🤢", `${err.message}`, "error"));
  };
  return (
    <div className={style.emailContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <Title
          level={2}
          style={{
            color: "#000B90",
            fontWeight: "500px",
            marginBottom: "5px",
          }}
        >
          Enter your email
        </Title>
        <Paragraph style={{ marginBottom: "30px" }}>
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </Paragraph>

        <Form onFinish={handleEmail}>
          <div>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <Form.Item
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                className={style.input}
              />
            </Form.Item>
          </div>

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
                alignSelf: "bottom",
                marginTop: "130px",
              }}
            >
              Send verification code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Email;
