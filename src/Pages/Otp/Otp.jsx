import { Button, Form, Typography } from "antd";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../Config";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";

const { Title, Paragraph, Text, Link } = Typography;

const Otp = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const { email } = useParams();

  const handleCheckOtp = () => {
    axios
      .post(
        "/api/user/verify-code",
        { oneTimeCode: otp },
        {
          headers: {
            email: email,
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          navigate(`/update-password/${email}`);
        }
      })
      .catch((err) => Swal.fire("🤢", `${err.message}`, "error"));
  };
  return (
    <div className={style.otpContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <Title
          level={2}
          style={{
            color: "#000B90",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          Check your email
        </Title>
        <Paragraph style={{ marginBottom: "30px" }}>
          Please enter the 4-digit verification code that was sent.{" "}
          <span style={{ fontWeight: "bold", color: "orange" }}>{email}</span>{" "}
          the code is valid for 3 minute.{" "}
        </Paragraph>

        <Form onFinish={handleCheckOtp}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            inputStyle={{
              height: "80px",
              width: "90px",
              borderRadius: "5px",
              marginRight: "17px",
              fontSize: "20px",
              border: "1px solid #000B90",
              color: "#000B90",
            }}
            numInputs={4}
            shouldAutoFocus={true}
            renderInput={(props) => <input {...props} />}
          />

          <div className={style.rememberAndPass}>
            <Text>Don't received code?</Text>

            <a
              className="login-form-forgot"
              style={{ color: "#000B90" }}
              href=""
            >
              Resend
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "45px",
                background: "#000B90",
                alignSelf: "bottom",
                marginTop: "130px",
              }}
            >
              Verify code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Otp;
