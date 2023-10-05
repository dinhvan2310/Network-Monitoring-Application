import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DesktopOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  HddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Modal,
  Form,
  message,
  Input,
  Space,
  Avatar,
  Typography,
  Breadcrumb,
} from "antd";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { addDevice, getDevices } from "services/devicesService";
import logo from "assets/images/logo/logo.svg";
import { disableBreadcrumbItems } from "config/breadcrumbConfig";

// ----------------------------------------------------------------------------------
const { Header, Sider, Content, Footer } = Layout;

//Loader
export const defaultLayoutLoader = async () => {
  const devices = await getDevices();
  return devices;
};

//Function Component
const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [devices, setDevices] = useState(useLoaderData());

  const { Title } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  useEffect(() => {}, [devices]);

  
  //!Breadcrumb Items
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    if (disableBreadcrumbItems.includes(_)) {
      return {
        title: _,
      };
    }
    return {
      key: url,
      title: <Link to={url}>{_}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <Space>
            <HomeOutlined />
            <span>Home</span>
          </Space>
        </Link>
      ),
      key: "home",
    },
  ].concat(extraBreadcrumbItems);

  const sidebarDevicesItems = devices.map((device) => {
    return {
      label: <Link to={`/devices/${device.ip}/overview`}>{device.name}</Link>,
      key: `/devices/${device.ip}`,
      icon: <HddOutlined />,
    };
  });

  //!Sidebar Menu Items
  const sidebarMenuItems = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "/",
      icon: <HomeOutlined />,
      onClick: () => {
        console.log("Home");
      },
    },
    {
      label: "Devices",
      key: "/devices",
      icon: <DesktopOutlined />,
      children: [
        ...sidebarDevicesItems,
        {
          label: "Add devices",
          key: "/add-devices",
          icon: <AppstoreAddOutlined />,
          onClick: () => {
            console.log("Add devices");
            setIsAddDeviceOpen(true);
          },
        },
      ],
    },
    {
      label: <Link to={"/settings"}>Settings</Link>,
      key: "/settings",
      icon: <SettingOutlined />,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Modal
        title="Add Device"
        open={isAddDeviceOpen}
        onCancel={() => setIsAddDeviceOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="addDevice"
          onFinishFailed={() => {
            message.error("Submit failed!");
          }}
          onFinish={(values) => {
            const key = "addDevice";
            setIsAddDeviceOpen(false);

            message.open({
              key,
              type: "loading",
              content: "Loading...",
            });
            setDevices([...devices, values]);
            addDevice(values).then((res) => {
              message.open({
                key,
                type: "success",
                content: "Successfully added device",
                duration: 2,
              });
            });

            console.log(values);
          }}
        >
          <Form.Item
            name="name"
            label="Device Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="ip" label="Device Ip" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
          defaultSelectedKeys={[useLocation().pathname]}
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
              <Breadcrumb items={breadcrumbItems} />
            </Space>
          </div>

          <Space size={16}>
            <Title style={{ marginBottom: 0 }} level={4}>
              Lê Thanh Việt
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
          <Outlet />
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
