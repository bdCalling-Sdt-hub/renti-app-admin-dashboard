import {
  CarOutlined,
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, Layout, Menu, Select, theme } from "antd";
import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCarRental, MdPayment, MdPeopleOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link, Outlet } from "react-router-dom";
import rentiLogo from "../../Images/renti-logo.png";
import { GoPeople } from "./../../../node_modules/react-icons/go/index.esm";
import Styles from "./Dashboard.module.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const items = [...Array(5).keys()].map((item, index) => {
  return {
    key: index,
    label: (
      <a
        target="_blank"
        href="https://www.antgroup.com"
        style={{}}
        rel="noreferrer"
      >
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
      </a>
    ),
  };
});

// const items =
//  [
//   {
//     key: '1',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         <div className='' style={{display:"flex",alignItems:"center"}}>
//              <img style={{backgroundColor:"#d9cffb",borderRadius:"100%",padding:"5px",marginRight:"15px"}} width="30" height="30" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
//              <div className='' style={{padding:0,margin:0}}>
//                 <p style={{}}><span>Sanchej haro manual </span>started a new trip from mexico.</p>
//                 <span style={{color:"#d2d2d2"}}>1 hr ago</span>
//              </div>
//         </div>

//       </a>
//     ),

//   },
//   {
//     key: '2',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         <div className='' style={{display:"flex",alignItems:"center"}}>
//              <img style={{backgroundColor:"#d9cffb",borderRadius:"100%",padding:"5px",marginRight:"15px"}} width="30" height="30" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
//              <div className='' style={{padding:0,margin:0}}>
//                 <p style={{}}><span>Sanchej haro manual </span>started a new trip from mexico.</p>
//                 <span style={{color:"#d2d2d2"}}>1 hr ago</span>
//              </div>
//         </div>

//       </a>
//     ),

//   },
//   {
//     key: '3',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         <div className='' style={{display:"flex",alignItems:"center"}}>
//              <img style={{backgroundColor:"#d9cffb",borderRadius:"100%",padding:"5px",marginRight:"15px"}} width="30" height="30" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
//              <div className='' style={{padding:0,margin:0}}>
//                 <p style={{}}><span>Sanchej haro manual </span>started a new trip from mexico.</p>
//                 <span style={{color:"#d2d2d2"}}>1 hr ago</span>
//              </div>
//         </div>

//       </a>
//     ),

//   },
//   {
//     key: '4',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         <div className='' style={{display:"flex",alignItems:"center"}}>
//              <img style={{backgroundColor:"#d9cffb",borderRadius:"100%",padding:"5px",marginRight:"15px"}} width="30" height="30" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
//              <div className='' style={{padding:0,margin:0}}>
//                 <p style={{}}><span>Sanchej haro manual </span>started a new trip from mexico.</p>
//                 <span style={{color:"#d2d2d2"}}>1 hr ago</span>
//              </div>
//         </div>

//       </a>
//     ),

//   },
//   {
//     key: '5',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         <div className='' style={{display:"flex",alignItems:"center"}}>
//              <img style={{backgroundColor:"#d9cffb",borderRadius:"100%",padding:"5px",marginRight:"15px"}} width="30" height="30" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
//              <div className='' style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
//                 <p style={{}}><span>Sanchej haro manual </span>started a new trip from mexico.</p>
//                 <span style={{color:"#d2d2d2"}}>1 hr ago</span>
//              </div>
//         </div>

//       </a>
//     ),

//   },
// ];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
  };

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
          See All
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
            icon={<RxDashboard style={{ fontSize: "20px" }} />}
          >
            <Link to="#" style={{ fontSize: "20px" }}>
              Dashboard
            </Link>
          </Menu.Item>

          <SubMenu key="2" icon={<GiReceiveMoney />} title="Earnings">
            <Menu.Item key="31">
              <a href="#">Subnav 3-1</a>
            </Menu.Item>
            <Menu.Item key="32">
              <a href="#">Subnav 3-2</a>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="3" icon={<MdPayment />} title="Payments">
            <Menu.Item key="31">
              <a href="#">Subnav 3-1</a>
            </Menu.Item>
            <Menu.Item key="32">
              <a href="#">Subnav 3-2</a>
            </Menu.Item>
          </SubMenu>
          <Divider />

          <SubMenu key="4" icon={<GoPeople />} title="Host information">
            <Menu.Item key="31">
              <a href="#">Subnav 3-1</a>
            </Menu.Item>
            <Menu.Item key="32">
              <a href="#">Subnav 3-2</a>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="5" icon={<MdPeopleOutline />}>
            <Link to="#">User information</Link>
          </Menu.Item>

          <Menu.Item key="6" icon={<MdCarRental />}>
            <Link to="#">Rent information</Link>
          </Menu.Item>

          <Menu.Item key="7" icon={<CarOutlined />}>
            <Link to="#">Car information</Link>
          </Menu.Item>

          <Divider />

          <SubMenu key="8" icon={<FaUserLock />} title="KYC">
            <Menu.Item key="31">
              <a href="#">Subnav 3-1</a>
            </Menu.Item>
            <Menu.Item key="32">
              <a href="#">Subnav 3-2</a>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="7" icon={<UserOutlined />}>
            <Link to="#">Settings</Link>
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
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "125px" : "360px",
                fontSize: "16px",
                width: 45,
                height: 45,
                marginRight: "10px",
              }}
            />
            <h2>Dashboard</h2>
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
                // Use the "value" property of options as the label
              >
                <Option value="english">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                      alt="English"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    English
                  </div>
                </Option>
                <Option value="spanish">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://e0.pxfuel.com/wallpapers/630/608/desktop-wallpaper-spain-flag-in-collection.jpg"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    Spanish
                  </div>
                </Option>
                <Option value="bangla">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://www.babseacle.org/wp-content/uploads/2020/09/Bangla-flag.jpg"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    Bangla
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
              >
                <img
                  style={{ cursor: "pointer" }}
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
                  alt="appointment-reminders--v1"
                />
              </Dropdown>
            </div>
            <div className={Styles.profile}>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  width="40"
                  height="40"
                  src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
                  alt="person-male--v2"
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

            padding: 24,
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
