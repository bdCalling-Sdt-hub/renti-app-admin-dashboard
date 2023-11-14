import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import logo from "../../Images/Logo.png";
import { UserData, reset } from "../../ReduxSlices/SigninSlice";
import style from "./Signin.module.css";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, userData, accessToken, message } =
    useSelector((state) => state.UserData);

  useEffect(() => {
    if (isError == true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
    if (isSuccess == true) {
      localStorage.setItem("yourInfo", JSON.stringify(userData));
      localStorage.setItem("token", accessToken);
      window.location.href = "/";
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, dispatch, navigate]);

  const handleSignIn = (values) => {
    const loginTime = new Date().getTime();
    dispatch(UserData(values));
    localStorage.setItem("loginTime", loginTime);
  };

  const handleForget = () => {
    navigate("/email");
  };

  return (
    <div className={style.signContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <h2
          style={{
            color: "#000B90",
            fontWeight: "normal",
            marginBottom: "30px",
            textShadow: "#bfbfbf 2px 2px 4px",
          }}
        >
          Sign In
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSignIn}
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
                prefix={<AiOutlineMail className="site-form-item-icon" />}
                placeholder="Enter your email address"
                type="email"
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
                prefix={<AiFillLock className="site-form-item-icon" />}
                type="password"
                placeholder="Enter your password"
                className={style.input}
              />
            </Form.Item>
          </div>
          <div className={style.rememberAndPass}>
            <div></div>

            <a
              className="login-form-forgot"
              style={{ color: "#000B90" }}
              href=""
              onClick={handleForget}
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
                marginTop: "60px",
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

export default Signin;
