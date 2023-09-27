import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../Config";
const { Paragraph, Title, Text } = Typography;

const Setting = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const [openHostPaymentTime, setOpenHostPaymentTime] = useState(false);
  const [verify, setVerify] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [form, form1, form2] = Form.useForm();

  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");
  const [value, setValue] = useState(1);
  const [percentageValue, setPercentageValue] = useState();

  //set host payment time

  //manual writing get value
  const handleManualRadioValue = (e) => {
    setValue(e.target.value);
  };

  //select get value
  const handleSelectRadioValue = (e) => {
    setValue(e.target.value);
  };

  const token = localStorage.token;

  const handleSetPaymentTime = async () => {
    const time = parseInt(value);

    const response = await axios.post(
      `api/host-payment-time/create`,
      { label: time },
      {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire("Good job!", response.data.message, "success");
    setOpenHostPaymentTime(false);
  };

  useEffect(() => {
    axios
      .get(`api/host-payment-time/all`, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setValue(parseInt(res.data?.labelData?.label)));
  }, []);

  const sendVerifyOtp = () => {
    //setUpdatePassword(true), setVerify(false)
    const otp = `${firstInput}${secondInput}${thirdInput}${fourthInput}`;
    let verifycode = {
      oneTimeCode: otp,
    };

    let info = JSON.parse(localStorage.getItem("yourInfo"));

    axios
      .post("/api/user/verify-code", verifycode, {
        headers: {
          email: info.email,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdatePassword(true), setVerify(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginBottom: "10px",
    },
    notification: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginTop: "10px",
      backgroundColor: "#ffffff",
      border: "1px solid #d9d9d9",
      boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
      borderRadius: "6px",
      padding: "4px 15px",
    },
    input: {
      height: "45px",
    },
    otpInput: {
      width: "50px",
      height: "70px",
    },
  };
  const menuItems = [
    {
      key: "1",
      title: "Personal Information",
      link: "personal-information",
    },
    {
      key: "2",
      title: "Change Password",
      link: "change-password",
    },
    {
      key: "3",
      title: "Login Activity",
      link: "login-activity",
    },
    {
      key: "4",
      title: "Block List",
      link: "block-list",
    },
    {
      key: "5",
      title: "Renti Percentage",
      link: "renti-percentage",
    },
    {
      key: "6",
      title: "Host Payment Time",
      link: "host-payment-time",
    },
    {
      key: "7",
      title: "Trash",
      link: "trash",
    },
    {
      key: "8",
      title: "Privacy Policy",
      link: "privacy-policy",
    },
    {
      key: "9",
      title: "Terms and Condition",
      link: "terms-condition",
    },
    {
      key: "10",
      title: "About Us",
      link: "about-us",
    },
  ];

  const [err, setErr] = useState("");
  const handleUpdated = (values) => {
    const { password, confirmPassword } = values;

    if (password.length < 8) {
      setErr("Password must be 8 character");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Please enter the same password!");
      return;
    }
    if (!password || !confirmPassword) {
      setErr("Please give your changes password");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setErr("Ensure string has one special case letter.");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setErr("Ensure string has two uppercase letters.");
      return;
    }
    if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
      setErr("Ensure string has three lowercase letters.");
      return;
    }
    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setErr("Ensure string has two digits");
      return;
    }

    let info = JSON.parse(localStorage.getItem("yourInfo"));

    let data = {
      password: password,
    };

    axios
      .post("/api/user/update-password", data, {
        headers: {
          email: info.email,
        },
      })
      .then((res) => {
        if (res.data) {
          Swal.fire("Good job!", res.data.message, "success");

          setUpdatePassword(false);
          form2.resetFields();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNavigate = (value) => {
    if (value == "renti-percentage") {
      setOpenModal(true);
    } else if (value === "change-password") {
      setOpenChangePassModel(true);
    } else if (value === "host-payment-time") {
      setOpenHostPaymentTime(true);
    } else {
      navigate(`/setting/${value}`);
    }
  };

  const handleNotification = (e) => {
    console.log(e);
  };

  //set percentage
  const setPercentage = async () => {
    const response = await axios.post(
      "api/percentage/create",
      { content: percentageValue },
      {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.message) {
      Swal.fire("Good job!", response.data.message, "success");
    }
    setOpenModal(false);
  };

  useEffect(() => {
    axios
      .get(`api/percentage/all`, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPercentageValue(res.data?.percentage?.content));
  }, []);

  //handle change password--------------->
  const handleChangePassword = (values) => {
    let userData = JSON.parse(localStorage.getItem("yourInfo"));
    console.log(userData);
    let passChangeInfo = { ...values, email: userData.email };
    console.log("Received values of form: ", passChangeInfo);
    axios
      .post("api/user/change-password", passChangeInfo)
      .then((res) => {
        console.log(res.data);
        form.resetFields();
        setOpenChangePassModel(false);
        Swal.fire("Good job!", "Password updated successfully", "success");
      })
      .catch((err) => {
        Swal.fire("Oops!", err.response.data.message, "error");
      });
  };

  const sendEmailForChangePassword = () => {
    let info = JSON.parse(localStorage.getItem("yourInfo"));
    let myEmail = {
      email: info.email,
    };
    setOpenChangePassModel(false);
    axios
      .post("/api/user/forget-password", myEmail)
      .then((res) => {
        setVerify(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: "normal" }}>Settings</h2>
      <div style={style.formContainer}>
        {menuItems.map((item) => (
          <Button
            onClick={() => handleNavigate(item.link)}
            key={item.key}
            block
            style={style.btn}
          >
            <span>{item.title}</span>
            <LiaAngleRightSolid fontSize={20} />
          </Button>
        ))}
        <div style={style.notification}>
          <span>Notification</span>
          <Switch
            onChange={(e) => handleNotification(e)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked
            style={{ background: "#000B90" }}
          />
        </div>
        {/* change password*/}
        <Modal
          title={<p style={{ marginBottom: "30px" }}>Change password</p>}
          centered
          open={openChangePassModel}
          onCancel={() => setOpenChangePassModel(false)}
          width={500}
          footer={[]}
        >
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleChangePassword}
          >
            <div>
              <label htmlFor="" className={style.label}>
                Current Password
              </label>
              <Form.Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Password"
                  type="password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">New Password</label>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new Password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="email" className={style.label}>
                Re-Type Password
              </label>
              <Form.Item
                name="reTypedPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your Re-type Password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="text"
                className="login-form-forgot"
                style={{ color: "#000B90" }}
                onClick={() => {
                  sendEmailForChangePassword();
                }}
              >
                Forgot password
              </Button>
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
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* Verify Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#000B90",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Verify OTP
            </Title>
          }
          centered
          open={verify}
          onCancel={() => {
            setVerify(false);
          }}
          width={500}
          footer={[]}
        >
          <div>
            <Paragraph style={{ marginBottom: "30px" }}>
              We'll send a verification code to your email. Check your inbox and
              enter the code here.
            </Paragraph>

            <Input.Group
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Input
                onChange={(e) => {
                  setFirstInput(e.target.value);
                }}
                style={{ width: "80px", height: "70px" }}
              />
              <Input
                onChange={(e) => {
                  setSecondInput(e.target.value);
                }}
                style={{ ...style.otpInput, width: "80px" }}
              />
              <Input
                onChange={(e) => {
                  setThirdInput(e.target.value);
                }}
                style={{ ...style.otpInput, width: "80px" }}
              />
              <Input
                onChange={(e) => {
                  setFourthInput(e.target.value);
                }}
                style={{ ...style.otpInput, width: "80px" }}
              />
            </Input.Group>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Don't received code?</Text>

              <a
                className="login-form-forgot"
                style={{ color: "#000B90" }}
                href=""
              >
                Resend
              </a>
            </div>

            <Button
              block
              onClick={() => {
                sendVerifyOtp();
              }}
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#000B90",
                color: "#fff",
                alignSelf: "bottom",
                marginTop: "130px",
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>
        {/* Update Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#000B90",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Update Password
            </Title>
          }
          centered
          open={updatePassword}
          onCancel={() => {
            setUpdatePassword(false);
          }}
          width={500}
          footer={[]}
        >
          <Form
            form={form2}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleUpdated}
          >
            <div>
              <label htmlFor="">New Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                ]}
              >
                <Input type="text" placeholder="Password" style={style.input} />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">Re-type Password</label>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm Password!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Confirm password"
                  style={style.input}
                />
              </Form.Item>
            </div>

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
        </Modal>
        {/*Set host time*/}
        <Modal
          title={
            <p
              style={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "18px",
              }}
            >
              Set Host Payment time
            </p>
          }
          centered
          open={openHostPaymentTime}
          onCancel={() => setOpenHostPaymentTime(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          width={500}
          footer={false}
        >
          <div
            style={{
              textAlign: "center",
              background: "#f9f9ff",
              borderRadius: "6px",
              padding: "8px",
              paddingTop: "50px",
              paddingBottom: "10px",
            }}
          >
            <Radio.Group onChange={handleSelectRadioValue} value={value}>
              <Space direction="vertical">
                <Radio value={1}>1 Week</Radio>
                <Radio value={2}>2 Week</Radio>
                <Radio value={3}>3 Week</Radio>

                <Input
                  onChange={handleManualRadioValue}
                  style={{
                    width: 100,
                    marginLeft: 10,
                  }}
                  value={value >= 4 ? value : null}
                />
              </Space>
            </Radio.Group>
            <Button
              onClick={handleSetPaymentTime}
              style={{
                background: "#000b92",
                color: "#fff",
                marginTop: "80px",
                height: "45px",
                fontWeight: "300",
              }}
              block
            >
              SET
            </Button>
          </div>
        </Modal>
        {/*Set Percentage*/}
        <Modal
          title={
            <p
              style={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "18px",
              }}
            >
              Set Renti Percentage
            </p>
          }
          centered
          open={openModal}
          onOk={() => setPercentage()}
          okText="Confirm"
          onCancel={() => setOpenModal(false)}
          okButtonProps={{
            style: {
              width: "100%",
              backgroundColor: "#000b90",
              height: "40px",
              marginLeft: "-20px",
            },
          }} // Adjust the width here
          cancelButtonProps={{ style: { display: "none" } }}
          width={500}
        >
          <Input
            placeholder="set your percentage"
            style={{ height: "50px", margin: "20px 0px" }}
            onBlur={(e) => setPercentageValue(e.target.value)}
            defaultValue={percentageValue}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Setting;
