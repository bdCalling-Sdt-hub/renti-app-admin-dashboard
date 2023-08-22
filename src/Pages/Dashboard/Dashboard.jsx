import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  UploadOutlined,
  MenuOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import rentiLogo from '../../Images/renti-logo.png';
import Styles from './Dashboard.module.css'
<img src="" alt="" srcset="" />
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;




const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        <div className='' style={{display:"flex"}}>
             <img style={{backgroundColor:"#d9cffb",borderRadius:"100%",padding:"5px",marginRight:"15px"}} width="30" height="30" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
             <div className='' style={{padding:0,margin:0,height:"50px"}}>
                <p style={{padding:0}}><span>Sanchej haro manual </span>started a new trip from mexico.</p>
                <p>1 hr ago</p>
             </div>
        </div>
        
      </a>
    ),
    
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];


const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const menu = (
    <Menu>
      <Menu.Item disabled>
        <h2 style={{color:"#000b90",fontWeight:"500",borderBottom:"1px solid #e6e7f4",paddingBottom:"20px"}}>Notifications</h2>
        {/* <span style={{ fontWeight: 'bold', color: '#000' }}>Notifications</span> */}
      </Menu.Item>
      {items.map(item => (
        <Menu.Item key={item.key}>
          {item.label}
          </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout
      style={{ height: "100vh", width: "100vw" }}
    >
      <Sider
        width="313px"


        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          position: 'fixed',
          height: "100vh",
          zIndex: 2,
          backgroundColor: "white"

        }}
      >
        <div className="demo-logo-vertical" />
        <div className='logo' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px", marginBottom: "30px" }}>
          <img src={rentiLogo} height={collapsed ? "40px" : "150px"} width={collapsed ? "40px" : "150px"} />
        </div>

        <Menu

          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <a href="#">Dashboard</a>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <a href="#">Earnings</a>
          </Menu.Item>
          <SubMenu key="3" icon={<UploadOutlined />} title="nav 3">
            <Menu.Item key="31">
              <a href="#">Subnav 3-1</a>
            </Menu.Item>
            <Menu.Item key="32">
              <a href="#">Subnav 3-2</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "100px",
            zIndex: 1,
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "150px"
          }}
        >
          <div className='' style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "125px" : "360px",
                fontSize: '16px',
                width: 45,
                height: 45,
                marginRight: "10px"
              }}
            />
            <h2>Dashboard</h2>
          </div>

          <div className={Styles.notificaton_profile_section} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className={Styles.notificaton}>
              <Dropdown
              
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button className={Styles.notify_btn} style={{padding:"10px" ,border:"none"}}>
                   <img width="30" height="30" src="https://img.icons8.com/ios/50/appointment-reminders--v1.png" alt="appointment-reminders--v1"/>
                </Button>
              </Dropdown>
            
            </div>
            <div className='profile'>
            <Dropdown
             
             menu={{
               items,
             }}
             placement="bottomLeft"
             arrow={{
               pointAtCenter: true,
             }}
           >
             <Button className={Styles.profile_btn} style={{padding:"10px" ,border:"none"}}>
                <img width="45" height="45" src="https://img.icons8.com/3d-fluency/94/person-male--v2.png" alt="person-male--v2"/>
             </Button>
           </Dropdown>
                
            </div>
          </div>

        </Header>
        <Content
          style={{
            marginTop: "120px",
            marginBottom: "50px",
            marginLeft: collapsed ? "130px" : "360px",
            marginRight: "50px",

            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis natus dolorum sit. Ullam voluptatem laboriosam ipsa eveniet rem vel voluptas earum ad. Asperiores blanditiis nemo unde aut voluptas iste explicabo reiciendis? Possimus officia iusto rerum et soluta praesentium corrupti fugiat, quam cumque officiis facilis, animi quis obcaecati blanditiis? Incidunt voluptates in, eius velit dignissimos vero alias temporibus molestias saepe atque excepturi dicta rerum numquam accusantium perspiciatis deserunt porro tempore illo expedita amet libero consectetur! Placeat, pariatur magnam quidem perferendis eveniet praesentium aspernatur nam optio iste ut, aperiam at quod omnis laboriosam nulla voluptatum quis, itaque quibusdam aliquam facere deleniti. Nemo?
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;