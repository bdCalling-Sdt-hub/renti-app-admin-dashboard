import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  UploadOutlined,
  MenuOutlined ,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import rentiLogo from '../../Images/renti-logo.png'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          height:"100vh",
          zIndex:2,
          backgroundColor:"white"
          
        }}
        >
        <div className="demo-logo-vertical" />
        <div className='logo' style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px",marginBottom:"30px"}}>
           <img src={rentiLogo} height={collapsed?"40px":"150px"} width={collapsed?"40px":"150px"}/>
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
            position:"fixed",
            width:"100vw",
            zIndex:1,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <CloseOutlined /> :<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              marginLeft:collapsed?"125px":"360px",
              fontSize: '16px',
              width: 45,
              height: 45,
            }}
          />
        </Header>
        <Content
          style={{
            marginTop:"120px",
            marginBottom:"50px",
            marginLeft:collapsed ?"130px":"360px",
            marginRight:"50px",
          
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