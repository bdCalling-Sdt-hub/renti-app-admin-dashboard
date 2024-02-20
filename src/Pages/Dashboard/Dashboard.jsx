/* eslint-disable no-unused-vars */
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Select,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillCar, AiFillSetting, AiOutlineMenu } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdCarRental, MdPayment } from "react-icons/md";
import { PiSignOutThin } from "react-icons/pi";
import { RiUserSearchLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { imgUrl } from "../../../ImageConfig";
import rentiLogo from "../../Images/favLogo.png";
import { Notifications } from "../../ReduxSlices/NotificationSlice";
import { GoPeople } from "./../../../node_modules/react-icons/go/index.esm";
import Styles from "./Dashboard.module.css";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.lang || "en"
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.yourInfo);
  const dispatch = useDispatch();
  const { notView, allNotification } = useSelector(
    (state) => state.NotificationData
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [t, i18n] = useTranslation("global");
  const location = useLocation();
  const path = location.pathname;
  const [notifications, setNotifications] = useState([]);
  const notifyOnOffValue = useSelector(
    (state) => state.NotifyOnOff?.notifyShow
  );

  const booleanValue =
    notifyOnOffValue === "false" ? false : Boolean(notifyOnOffValue);

  useEffect(() => {
    // Connect to server using socket.io-client
    var socket = io("http://192.168.10.14:9000");
    socket.on("connect", () => {
      // Emit events or listen for events here
      socket.on("admin-notification", (data) => {
        setNotifications(data);
      });
    });
  }, []);

  useEffect(() => {
    const data = {
      limit: 8,
      page: 1,
    };
    dispatch(Notifications(data));
  }, [dispatch]);

  const commonData = notifications?.allNotification
    ? notifications
    : allNotification;

  const items = commonData?.allNotification?.slice(0, 4).map((item, index) => {
    function getTimeAgo(timestamp) {
      const now = new Date();
      const date = new Date(timestamp);

      const secondsAgo = Math.floor((now - date) / 1000);
      const minutesAgo = Math.floor(secondsAgo / 60);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      const yearsAgo = Math.floor(daysAgo / 365);

      if (yearsAgo > 0) {
        return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
      } else if (daysAgo > 0) {
        return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
      } else if (hoursAgo > 0) {
        return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
      } else if (minutesAgo > 0) {
        return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
      } else {
        return "just now";
      }
    }

    return {
      key: index,
      label: (
        <Link to="/notification" rel="noreferrer">
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
              src={`${imgUrl}${item.image}`}
              alt="person-male--v2"
            />
            <div className="" style={{ marginTop: "" }}>
              <p>{item.message}</p>
              <span style={{ color: "#d2d2d2" }}>
                {getTimeAgo(item.createdAt)}
              </span>
            </div>
          </div>
        </Link>
      ),
    };
  });

  //profile
  let imgUri;
  if (
    user.image !== null &&
    user.image !== undefined &&
    user.image !== "" &&
    user.image.length !== 0
  ) {
    imgUri = `${imgUrl}${user.image}`;
  } else {
    imgUri = "https://siffahim.github.io/MetaCGI-Tailwind/images/2.jpg";
  }

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("lang", value);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const logoutAutoMate = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("yourInfo");
    localStorage.removeItem("loginTime");

    navigate("/signin");
  };

  const checkLogOutTime = () => {
    const loginTime = localStorage.loginTime;

    if (loginTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(loginTime);

      let diff = Math.round(timeDifference / 60000);

      if (diff > 1440) {
        logoutAutoMate();
      }
    }
  };

  checkLogOutTime();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("yourInfo");
        localStorage.removeItem("loginTime");

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
          to="/setting/personal-information"
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
        <div
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "0px",
          }}
        >
          <PiSignOutThin color="#000B90" fontSize={25} />
          Logout
        </div>
      ),
    },
  ];

  //breadcrumb
  const breadcrumb = [
    {
      path: "/",
      title: "Dashboard",
    },
    {
      path: "/earning/today-income",
      title: "Earnings",
    },
    {
      path: "/earning/weekly-income",
      title: "Earnings",
    },
    {
      path: "/earning/monthly-income",
      title: "Earnings",
    },
    {
      path: "/host-information",
      title: "Host Information",
    },
    {
      path: "/host-request",
      title: "Host Information",
    },
    {
      path: "/user-information",
      title: "User Information",
    },
    {
      path: "/user-request",
      title: "User Information",
    },
    {
      path: "/rent-information",
      title: "Rent Information",
    },
    {
      path: "/car-information",
      title: "Car Information",
    },
    {
      path: "/car-request",
      title: "Car Information",
    },
    {
      path: "/host-kyc",
      title: "KYC",
    },
    {
      path: "/user-kyc",
      title: "KYC",
    },
    {
      path: "/car-kyc",
      title: "KYC",
    },
    {
      path: "/kyc-form",
      title: "KYC",
    },
    {
      path: "/user-payment",
      title: "Payments",
    },
    {
      path: "/host-payment",
      title: "Payments",
    },
    {
      path: "/stripe-bills",
      title: "Payments",
    },
    {
      path: "/renti-income",
      title: "Payments",
    },
    {
      path: "/wallet",
      title: "Payments",
    },
    {
      path: "/setting",
      title: "Settings",
    },
    {
      path: "/setting/personal-information",
      title: "Settings",
    },
    {
      path: "/setting/login-activity",
      title: "Settings",
    },
    {
      path: "/setting/block-list",
      title: "Settings",
    },
    {
      path: "/setting/trash",
      title: "Settings",
    },
    {
      path: "/setting/privacy-policy",
      title: "Settings",
    },
    {
      path: "/setting/terms-condition",
      title: "Settings",
    },
    {
      path: "/setting/about-us",
      title: "Settings",
    },
    {
      path: "/notification",
      title: "Notification",
    },
  ];

  const dashboardTitle = breadcrumb.find((item) => item.path === path);

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
      </Menu.Item>
      {items?.map((item) => (
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
        <Link
          style={{
            backgroundColor: "#e6e7f4",
            color: "#000b90",
            fontSize: "18px",
            fontWeight: "bold",
            width: "100%",
            textAlign: "center",
            padding: "10px",
            borderRadius: "5px",
          }}
          to="/notification"
        >
          See all
        </Link>
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
        className="sidebar-menu"
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          zIndex: 2,
          backgroundColor: "#fff",
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
            icon={<RxDashboard style={{ fontSize: "18px" }} />}
          >
            <Link to="/" style={{ fontSize: "16px" }}>
              {t("dashboard")}
            </Link>
          </Menu.Item>

          <SubMenu
            style={{ fontSize: "16px" }}
            key="2"
            icon={<GiReceiveMoney style={{ fontSize: "18px" }} />}
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
            icon={<MdPayment style={{ fontSize: "18px" }} />}
            title={t("payment.title")}
          >
            <Menu.Item key="34">
              <Link to="/user-payment">{t("payment.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="35">
              <Link to="/host-payment">{t("payment.subTitle2")}</Link>
            </Menu.Item>
            {/* <Menu.Item key="36">
              <Link to="/stripe-bills">{t("payment.subTitle3")}</Link>
            </Menu.Item> */}
            <Menu.Item key="37">
              <Link to="/renti-income">{t("payment.subTitle4")}</Link>
            </Menu.Item>
            {/* <Menu.Item key="38">
              <Link to="/wallet">{t("payment.subTitle5")}</Link>
            </Menu.Item> */}
          </SubMenu>
          <Divider />

          <SubMenu
            style={{ fontSize: "16px" }}
            key="4"
            icon={<GoPeople style={{ fontSize: "18px" }} />}
            title={t("hostInfo.title")}
          >
            <Menu.Item key="39">
              <Link to="/host-information">{t("hostInfo.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="40">
              <Link to="/host-request">{t("hostInfo.subTitle2")}</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            style={{ fontSize: "16px" }}
            key="5"
            icon={<GoPeople style={{ fontSize: "18px" }} />}
            title={t("userInfo.title")}
          >
            <Menu.Item key="47">
              <Link to="/user-information" style={{ fontSize: "16px" }}>
                {t("userInfo.subTitle1")}
              </Link>
            </Menu.Item>
            <Menu.Item key="48">
              <Link to="/user-request">{t("userInfo.subTitle2")}</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="6"
            icon={<MdCarRental style={{ fontSize: "18px" }} />}
          >
            <Link to="/rent-information" style={{ fontSize: "16px" }}>
              {t("rentInfo")}
            </Link>
          </Menu.Item>

          <SubMenu
            style={{ fontSize: "16px" }}
            key="7"
            icon={<AiFillCar style={{ fontSize: "18px" }} />}
            title={t("carInfo.title")}
          >
            <Menu.Item key="45">
              <Link to="/car-information" style={{ fontSize: "16px" }}>
                {t("carInfo.subTitle1")}
              </Link>
            </Menu.Item>
            <Menu.Item key="46">
              <Link to="/car-request">{t("carInfo.subTitle2")}</Link>
            </Menu.Item>
          </SubMenu>

          <Divider />

          <SubMenu
            style={{ fontSize: "16px" }}
            key="8"
            icon={<RiUserSearchLine style={{ fontSize: "18px" }} />}
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
            icon={<AiFillSetting style={{ fontSize: "18px" }} />}
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
            height: "70px",
            zIndex: 1,
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "60px",
          }}
        >
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <Button
              type="text"
              icon={collapsed ? <AiOutlineMenu /> : <AiOutlineMenu />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "125px" : "360px",
                fontSize: "18px",
                color: "#000B90",
              }}
            />
            {/* <h2>{t("header.title")}</h2> */}
            <h2 style={{ color: "#000B90", letterSpacing: "0.3px" }}>
              {dashboardTitle?.title}
            </h2>
          </div>

          <div
            className={Styles.notificatonProfileSection}
            style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
          >
            <div className="" style={{ marginRight: "30px" }}>
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

            {booleanValue && (
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
                  <Badge count={commonData.notViewed} color="#000b90">
                    <IoIosNotificationsOutline
                      style={{ cursor: "pointer" }}
                      fontSize={35}
                      color="#000b90"
                    />
                  </Badge>
                </Button>
              </Dropdown>
            )}

            <div className={Styles.profile}>
              <Dropdown
                menu={{
                  items: profileItems,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
                trigger={["click"]}
              >
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                  src={imgUri}
                  alt="profile"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "90px",
            marginBottom: "20px",
            marginLeft: collapsed ? "130px" : "360px",
            marginRight: "60px",
            background: "#e6e7f4",
            padding: "10px 50px",
            minHeight: 280,
            overflow: "auto",
            borderRadius: "5px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
