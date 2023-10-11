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
  const [current, setCurrent] = useState("overview");
  const url = useLocation().pathname;

  const ip = url.split("/")[2];

  useEffect(() => {
    setCurrent(url.split("/")[3])
  }, [url])



  const items = [
    {
      label: <Link to={`/devices/${ip}`}>Overview</Link>,
      key: "overview",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/statistic/2`}>2 Days</Link>,
      key: "2days",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/statistic/30`}>30 Days</Link>,
      key: "30days",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/statistic/365`}>365 Days</Link>,
      key: "365days",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/alarms/`}>Alarms</Link>,
      key: "alarms",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/log`}>Log</Link>,
      key: "lò",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/info`}>Info</Link>,
      key: "info",
      icon: <InfoCircleOutlined />,
    },
    {
      label: <Link to={`/devices/${ip}/settings`}>Settings</Link>,
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
