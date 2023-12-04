import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Space,
  Avatar,
  Typography,
  Radio,
} from "antd";
import {DesktopOutlined, HomeOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, MenuUnfoldOutlined, MonitorOutlined, DatabaseOutlined,
        MenuFoldOutlined, UserSwitchOutlined, LogoutOutlined, QuestionOutlined, UnorderedListOutlined, ProjectOutlined} from '@ant-design/icons';
import logo from "assets/images/logo/logo.svg";
import { Link, Outlet } from "react-router-dom";
import userService from "services/userService";

// ----------------------------------------------------------------------------------
const { Header, Sider, Content, Footer } = Layout;

//Function Component
const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const Title = Typography.Title;
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchUserData = async () => {
      const respone = await userService.checkAuthentication(localStorage.getItem("token"))
      setUserData(respone)
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchDevices = async () => {
      
    }
    fetchDevices()
  }, [])



  const sidebarMenuItems = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Monitoring",
      key: "/monitoring",
      icon: <MonitorOutlined />,
      children: [
        {
          label: <Link to={"/monitoring/hosts"}>Hosts</Link>,
          key: "/monitoring/hosts",
          icon: <DesktopOutlined />,
        },
        {
          label: <Link to={"/monitoring/latestData?hostid=all"}>Latest Data</Link>,
          key: "/monitoring/latestData",
          icon: <DatabaseOutlined />,
        }
      ]
    },
    {
      label: "Data Collection",
      key: "/dataCollection",
      icon: <DesktopOutlined/>,
      children: [
        {
          label: <Link to={"/dataCollection/hosts"}>Hosts</Link>,
          key: "/dataCollection/hosts",
          icon: <DesktopOutlined />,
        },
        {
          label: <Link to={"/dataCollection/hostGroups"} >Host Groups</Link>,
          key: "/dataCollection/hostGroups",
          icon: <AppstoreOutlined />,
        },
        {
          label: <Link to={"/dataCollection/templates"} >Templates</Link>,
          key: "/dataCollection/templates",
          icon: <ProjectOutlined />,
        },
        {
          label: <Link to={"/dataCollection/templateGroups"} >Template Groups</Link>,
          key: "/dataCollection/templateGroups",
          icon: <UnorderedListOutlined />,
        }
      ],
    },
    {
      label: "Users",
      key: "/USERS",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to={"/users"}>Users</Link>,
          key: "/users",
          icon: <UserOutlined />,
        },
        {
          label: "User roles",
          key: "/users/roles",
          icon: <UserSwitchOutlined />,
        }
      ]
    },
    {
      label: "Help",
      key: "/help",
      icon: <QuestionOutlined />,
    },
    {
      label: "User settings",
      key: "/user-settings",
      icon: <SettingOutlined />,
    },
    {
      label: "Logout",
      key: "/logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        userService.logout();
        window.location.href = "/login";
      }
    }
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
 
      <Sider
        style={{ height: "100vh" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        {collapsed || (
          <img
            alt="img"
            style={{
              width: "100%",
              objectFit: "cover",
            }}
            src={logo}
          />
        )}
        <Menu
          style={{
            borderRight: 0,
          }}
          theme="light"
          mode="inline"
          items={sidebarMenuItems}
        ></Menu>
      </Sider>
      <Layout
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Header
          style={{
            padding: 0,
            marginLeft: 2,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Space>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Space>
          </div>

          <Space size={16}>
            <Title style={{ marginBottom: 0 }} level={4}>
              {userData.result?.name}
            </Title>
            <Avatar
              style={{ marginRight: 16 }}
              size="large"
              icon={<UserOutlined />}
            />
          </Space>
        </Header>

        <Content
          style={{
            margin: `2px 2px`,
            padding: 24,
            paddingTop: 0,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "scroll",
          }}
        >
          <Outlet/>
        </Content>
        <Footer
          style={{
            margin: "0px 2px",
            padding: "0",
            background: colorBgContainer,
            textAlign: "center",
          }}
        >
          Snmp App ©2023 Created by SUZUME
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
