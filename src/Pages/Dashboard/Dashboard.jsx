/* eslint-disable no-unused-vars */
import { CarOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Layout, Menu, Select, theme } from "antd";

import { Divider } from "antd";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCarRental, MdPayment, MdPeopleOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { GoPeople } from "./../../../node_modules/react-icons/go/index.esm";

import { RiUserSearchLine } from "react-icons/ri";

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { BiUser } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiSignOutThin } from "react-icons/pi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import rentiLogo from "../../Images/renti-logo.png";
import Styles from "./Dashboard.module.css";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const items = [...Array(5).keys()].map((item, index) => {
  return {
    key: index,
    label: (
      <Link to="/notification" style={{}} rel="noreferrer">
        <div
          className={Styles.everyNotify}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{
              backgroundColor: "#d9cffb",
              borderRadius: "100%",
              padding: "5px",
              marginRight: "15px",
            }}
            width="30"
            height="30"
            src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
            alt="person-male--v2"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>
              <span>Sanchej haro manual </span>started a new trip from mexico.
            </p>
            <span style={{ color: "#d2d2d2" }}>1 hr ago</span>
          </div>
        </div>
      </Link>
    ),
  };
});

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.lang || "en"
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.yourInfo);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [t, i18n] = useTranslation("global");
  const location = useLocation();

  const path = location.pathname;

  //profile
  let imgUrl;
  if (
    user.image !== null &&
    user.image !== undefined &&
    user.image !== "" &&
    user.image.length !== 0
  ) {
    imgUrl = user.image;
  } else {
    imgUrl = "https://siffahim.github.io/MetaCGI-Tailwind/images/2.jpg";
  }

  const handleLinkClick = (event, linkText) => {
    event.preventDefault(); // Prevent the default link behavior (navigation)
    console.log(`Clicked on link with text: ${linkText}`);
  };

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("lang", value);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const logout = () => {
    Swal.fire({
      title: "Do you want to Logout from here?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("yourInfo");

        navigate("/signin");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  const profileItems = [
    {
      key: 1,
      label: (
        <Link
          to="/notification"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "0px",
          }}
        >
          <BiUser color="#000B90" fontSize={25} />
          Profile
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link
          to="/notification"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "0px",
          }}
        >
          <IoIosNotificationsOutline color="#000B90" fontSize={25} />
          <span style={{ fontSize: "16px" }}>Notification</span>
        </Link>
      ),
    },
    {
      key: 3,
      label: (
        <Link
          to="/notification"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "0px",
          }}
        >
          <PiSignOutThin color="#000B90" fontSize={25} />
          Logout
        </Link>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item disabled>
        <h2
          style={{
            color: "#000b90",
            fontWeight: "500",
            borderBottom: "1px solid #e6e7f4",
            paddingBottom: "20px",
          }}
        >
          Notifications
        </h2>
        {/* <span style={{ fontWeight: 'bold', color: '#000' }}>Notifications</span> */}
      </Menu.Item>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <Button
          type="primary"
          block
          style={{
            height: "50px",
            backgroundColor: "#e6e7f4",
            color: "#000b90",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <Link to="/notification">See All</Link>
        </Button>
      </div>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="313px"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          zIndex: 2,
          backgroundColor: "white",
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <img
            src={rentiLogo}
            height={collapsed ? "40px" : "150px"}
            width={collapsed ? "40px" : "150px"}
          />
        </div>

        <Menu
          style={{ padding: collapsed ? "0px" : "20px", border: "none" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            icon={<RxDashboard style={{ fontSize: "14px" }} />}
          >
            <Link to="/" style={{ fontSize: "16px" }}>
              {t("dashboard")}
            </Link>
          </Menu.Item>

          <SubMenu
            style={{ fontSize: "16px" }}
            key="2"
            icon={<GiReceiveMoney style={{ fontSize: "14px" }} />}
            title={t("earning.title")}
          >
            <Menu.Item key="31">
              <Link to="/earning/today-income">{t("earning.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="32">
              <Link to="/earning/weekly-income">{t("earning.subTitle2")}</Link>
            </Menu.Item>
            <Menu.Item key="33">
              <Link to="/earning/monthly-income">{t("earning.subTitle3")}</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            style={{ fontSize: "16px" }}
            key="3"
            icon={<MdPayment style={{ fontSize: "14px" }} />}
            title={t("payment.title")}
          >
            <Menu.Item key="34">
              <Link to="/user-payment">{t("payment.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="35">
              <Link to="/host-payment">{t("payment.subTitle2")}</Link>
            </Menu.Item>
            <Menu.Item key="36">
              <Link to="/stripe-bills">{t("payment.subTitle3")}</Link>
            </Menu.Item>
            <Menu.Item key="37">
              <Link to="/renti-income">{t("payment.subTitle4")}</Link>
            </Menu.Item>
            <Menu.Item key="38">
              <Link to="/wallet">{t("payment.subTitle5")}</Link>
            </Menu.Item>
          </SubMenu>
          <Divider />

          <SubMenu
            style={{ fontSize: "16px" }}
            key="4"
            icon={<GoPeople style={{ fontSize: "14px" }} />}
            title={t("hostInfo.title")}
          >
            <Menu.Item key="39">
              <Link to="/host-information">{t("hostInfo.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="40">
              <Link to="/host-request">{t("hostInfo.subTitle2")}</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="5"
            icon={<MdPeopleOutline style={{ fontSize: "14px" }} />}
          >
            <Link to="/user-information" style={{ fontSize: "16px" }}>
              {t("userInfo")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="6"
            icon={<MdCarRental style={{ fontSize: "14px" }} />}
          >
            <Link to="/rent-information" style={{ fontSize: "16px" }}>
              {t("rentInfo")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="7"
            icon={<CarOutlined style={{ fontSize: "14px" }} />}
          >
            <Link to="/car-information" style={{ fontSize: "16px" }}>
              {t("carInfo")}
            </Link>
          </Menu.Item>

          <Divider />

          <SubMenu
            style={{ fontSize: "16px" }}
            key="8"
            icon={<RiUserSearchLine style={{ fontSize: "14px" }} />}
            title={t("kyc.title")}
          >
            <Menu.Item key="41">
              <Link to="/host-kyc">{t("kyc.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="42">
              <Link to="/user-kyc">{t("kyc.subTitle2")}</Link>
            </Menu.Item>
            <Menu.Item key="43">
              <Link to="/car-kyc">{t("kyc.subTitle3")}</Link>
            </Menu.Item>
            <Menu.Item key="44">
              <Link to="/kyc-form">{t("kyc.subTitle4")}</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="9"
            icon={<SettingOutlined style={{ fontSize: "14px" }} />}
          >
            <Link to="/setting" style={{ fontSize: "16px" }}>
              {t("setting.title")}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "60px",
          }}
        >
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "125px" : "360px",
                fontSize: "16px",
                color: "#000B90",
                width: 45,
                height: 45,
              }}
            />
            {/* <h2>{t("header.title")}</h2> */}
            <h2 style={{ color: "#000B90", letterSpacing: "0.3px" }}>
              {path === "/"
                ? "Dashboard"
                : path === "/earning/today-income"
                ? "Earnings"
                : path === "/earning/weekly-income"
                ? "Earnings"
                : path === "/earning/monthly-income"
                ? "Earnings"
                : path === "/host-information"
                ? "Host Information"
                : path === "/host-request"
                ? "Host Information"
                : path === "/user-information"
                ? "User Information"
                : path === "/rent-information"
                ? "Rent Information"
                : path === "/car-information"
                ? "Car Information"
                : path === "/host-kyc"
                ? "KYC"
                : path === "/user-kyc"
                ? "KYC"
                : path === "/car-kyc"
                ? "KYC"
                : path === "/kyc-form"
                ? "KYC"
                : path === "/user-payment"
                ? "Payments"
                : path === "/host-payment"
                ? "Payments"
                : path === "/stripe-bills"
                ? "Payments"
                : path === "/renti-income"
                ? "Payments"
                : path === "/wallet"
                ? "Payments"
                : path === "/setting"
                ? "Settings"
                : path === "/setting/personal-information"
                ? "Settings"
                : path === "/setting/login-activity"
                ? "Settings"
                : path === "/setting/block-list"
                ? "Settings"
                : path === "/setting/trash"
                ? "Settings"
                : path === "/setting/privacy-policy"
                ? "Settings"
                : path === "/setting/terms-condition"
                ? "Settings"
                : path === "/setting/about-us"
                ? "Settings"
                : ""}
            </h2>
          </div>

          <div
            className={Styles.notificatonProfileSection}
            style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
          >
            <div className="" style={{ marginRight: "40px" }}>
              <Select
                value={selectedLanguage}
                style={{ width: 150 }}
                onChange={handleSelectLanguage}
              >
                <Option value="en">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                      alt="English"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    English
                  </div>
                </Option>
                <Option value="es">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://e0.pxfuel.com/wallpapers/630/608/desktop-wallpaper-spain-flag-in-collection.jpg"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    Spanish
                  </div>
                </Option>
              </Select>
            </div>
            <div className={Styles.notificaton}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
                trigger={["click"]}
              >
                <Button
                  type="text"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Badge count={5} color="#000b90">
                    <IoIosNotificationsOutline
                      style={{ cursor: "pointer" }}
                      fontSize={35}
                      color="#000b90"
                    />
                  </Badge>
                </Button>
              </Dropdown>
            </div>
            <div className={Styles.profile}>
              <Dropdown
                menu={{
                  items: profileItems,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                  src={imgUrl}
                  alt="profile"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "120px",
            marginBottom: "50px",
            marginLeft: collapsed ? "130px" : "360px",
            marginRight: "60px",
            background: "#e6e7f4",

            padding: 50,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
