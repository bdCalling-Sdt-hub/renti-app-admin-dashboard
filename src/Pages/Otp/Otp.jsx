import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";

const Otp = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className={style.signContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <h1
          style={{
            color: "#000B90",
            fontWeight: "normal",
            marginBottom: "30px",
            textShadow: "#bfbfbf 2px 2px 4px",
          }}
        >
          Sign In
        </h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
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
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter your email address"
                className={style.input}
              />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="email" className={style.label}>
              Password
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Enter your password"
                className={style.input}
              />
            </Form.Item>
          </div>
          <div className={style.rememberAndPass}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              style={{ color: "000B90" }}
              href=""
            >
              Forgot password
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
                fontWeight: "400px",
                fontSize: "18px",
                background: "#000B90",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Otp;
