import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../Config";
import logo from "../../Images/Logo.png";
import style from "./UpdatePass.module.css";

const UpdatePass = () => {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  const handleChangePassword = (values) => {
    const { password, confirmPassword } = values;
    axios
      .post(
        "/api/user/update-password",
        { password: password },
        {
          headers: {
            email: email,
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          Swal.fire("✅", "Successfully updated password", "success");
          navigate("/signin");
        }
      })
      .catch((err) => Swal.fire("🤢", `${err.message}`, "error"));

    // if (password.length < 8) {
    //   setErr("Password must be 8 character");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   setErr("Please enter the same password!");
    //   return;
    // }
    // if (!password || !confirmPassword) {
    //   setErr("Please give your changes password");
    //   return;
    // }
    // if (!/(?=.*[!@#$&*])/.test(password)) {
    //   setErr("Ensure string has one special case letter.");
    //   return;
    // }
    // if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
    //   setErr("Ensure string has two uppercase letters.");
    //   return;
    // }
    // if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
    //   setErr("Ensure string has three lowercase letters.");
    //   return;
    // }
    // if (!/(?=.*[0-9].*[0-9])/.test(password)) {
    //   setErr("Ensure string has two digits");
    //   return;
    // }
  };

  return (
    <div className={style.updateContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <h1
          style={{
            color: "#000B90",
            fontWeight: "normal",
            marginBottom: "30px",
          }}
        >
          Update Password
        </h1>
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            name="password"
            label="New password"
            rules={[
              {
                required: true,
                message: "Please enter new password!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              className={style.input}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Re-type password"
            rules={[
              {
                required: true,
                message: "Please enter confirm Password!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Confirm password"
              className={style.input}
            />
          </Form.Item>

          {/* showing error */}
          <label style={{ color: "red" }}>{err}</label>

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
                marginTop: "100px",
              }}
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePass;
