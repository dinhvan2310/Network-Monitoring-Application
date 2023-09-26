import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;




const Device = () => {
  const [current, setCurrent] = useState("mail");
  const url = useLocation().pathname;

  const ip = url.split("/")[2];

  useEffect(() => {
    setCurrent(url.split("/")[3])
  }, [url])



  const items = [
    {
      label: <Link to={`/devices/${ip}/home`}>Home</Link>,
      key: "home",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <AppstoreOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: (
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Navigation Four - Link
        </a>
      ),
      key: "alipay",
    },
    {
      label: <Link to={`/devices/${ip}/info`}>Info</Link>,
      key: "info",
      icon: <InfoCircleOutlined />,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingOutlined />,
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout style={{
      background: 'rgb(255, 255, 255)',
    }}>
      <Space direction="vertical" size={"large"}>
        <Header style={{
          padding: 0,
        }}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>
          <Content style={{
            // marginTop: 24,
          }}>
            <Outlet />
          </Content>
      </Space>
    </Layout>
  );
};
export default Device;
