import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Rate, Row } from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
  AliwangwangOutlined,
  DingdingOutlined,
  BugOutlined,
  CloudOutlined,
  ControlOutlined,
  CreditCardOutlined,
  DesktopOutlined,
  FireOutlined,
  ForkOutlined,
  HomeOutlined,
  LayoutOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  TranslationOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ShareAltOutlined,
  SendOutlined,
  SolutionOutlined,
  SaveOutlined,
  PushpinOutlined,
  PoundOutlined,
  ThunderboltOutlined,
  TagsOutlined,
  TableOutlined,
  AmazonOutlined,
  PieChartOutlined,
  BoxPlotOutlined,
  WarningOutlined,
  CheckSquareOutlined,
  InfoOutlined,
  EditOutlined,
  HighlightOutlined,
  ZoomOutOutlined,
  AlignCenterOutlined,
  UndoOutlined,
  HeatMapOutlined,
  GithubOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  SketchOutlined,
  BellOutlined,
  CodeOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import Title from "antd/es/skeleton/Title";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const priorityDesc = ["Lowest", "Low", "Normal", "Medium", "High"];
const options = [
  {
    label: <CoffeeOutlined />,
    value: "CoffeeOutlined",
  },
  {
    label: <CodeOutlined />,
    value: "CodeOutlined",
  },
  {
    label: <BellOutlined />,
    value: "BellOutlined",
  },
  {
    label: <SketchOutlined />,
    value: "SketchOutlined",
  },
  {
    label: <InstagramOutlined />,
    value: "InstagramOutlined",
  },
  {
    label: <LinkedinOutlined />,
    value: "LinkedinOutlined",
  },
  {
    label: <YoutubeOutlined />,
    value: "YoutubeOutlined",
  },
  {
    label: <GithubOutlined />,
    value: "GithubOutlined",
  },
  {
    label: <HeatMapOutlined />,
    value: "HeatMapOutlined",
  },
  {
    label: <UndoOutlined />,
    value: "UndoOutlined",
  },
  {
    label: <AlignCenterOutlined />,
    value: "AlignCenterOutlined",
  },
  {
    label: <ZoomOutOutlined />,
    value: "ZoomOutOutlined",
  },
  {
    label: <HighlightOutlined />,
    value: "HighlightOutlined",
  },
  {
    label: <EditOutlined />,
    value: "EditOutlined",
  },
  {
    label: <InfoOutlined />,
    value: "InfoOutlined",
  },
  {
    label: <CheckSquareOutlined />,
    value: "CheckSquareOutlined",
  },
  {
    label: <WarningOutlined />,
    value: "WarningOutlined",
  },
  {
    label: <BoxPlotOutlined />,
    value: "BoxPlotOutlined",
  },
  {
    label: <PieChartOutlined />,
    value: "PieChartOutlined",
  },
  {
    label: <AmazonOutlined />,
    value: "AmazonOutlined",
  },
  {
    label: <AndroidOutlined />,
    value: "AndroidOutlined",
  },
  {
    label: <AppleOutlined />,
    value: "AppleOutlined",
  },
  {
    label: <WindowsOutlined />,
    value: "WindowsOutlined",
  },
  {
    label: <AliwangwangOutlined />,
    value: "AliwangwangOutlined",
  },
  {
    label: <DingdingOutlined />,
    value: "DingdingOutlined",
  },
  {
    label: <BugOutlined />,
    value: "BugOutlined",
  },
  {
    label: <CloudOutlined />,
    value: "CloudOutlined",
  },
  {
    label: <ControlOutlined />,
    value: "ControlOutlined",
  },
  {
    label: <CreditCardOutlined />,
    value: "CreditCardOutlined",
  },
  {
    label: <DesktopOutlined />,
    value: "DesktopOutlined",
  },
  {
    label: <FireOutlined />,
    value: "FireOutlined",
  },
  {
    label: <ForkOutlined />,
    value: "ForkOutlined",
  },
  {
    label: <HomeOutlined />,
    value: "HomeOutlined",
  },
  {
    label: <LayoutOutlined />,
    value: "LayoutOutlined",
  },
  {
    label: <MailOutlined />,
    value: "MailOutlined",
  },
  {
    label: <ShoppingCartOutlined />,
    value: "ShoppingCartOutlined",
  },
  {
    label: <TranslationOutlined />,
    value: "TranslationOutlined",
  },
  {
    label: <UserOutlined />,
    value: "UserOutlined",
  },
  {
    label: <VideoCameraOutlined />,
    value: "VideoCameraOutlined",
  },
  {
    label: <ShareAltOutlined />,
    value: "ShareAltOutlined",
  },
  {
    label: <SendOutlined />,
    value: "SendOutlined",
  },
  {
    label: <SolutionOutlined />,
    value: "SolutionOutlined",
  },
  {
    label: <SaveOutlined />,
    value: "SaveOutlined",
  },
  {
    label: <PushpinOutlined />,
    value: "PushpinOutlined",
  },
  {
    label: <PoundOutlined />,
    value: "PoundOutlined",
  },
  {
    label: <ThunderboltOutlined />,
    value: "ThunderboltOutlined",
  },
  {
    label: <TagsOutlined />,
    value: "TagsOutlined",
  },
  {
    label: <TableOutlined />,
    value: "TableOutlined",
  },
];

function DeviceSettings() {
  const [PriorityValue, setPriorityValue] = useState(3);
  const [value1, setValue1] = useState("Apple");

  return (
    <>
      <h3
        style={{
          marginLeft: "24px",
          marginBottom: "12px",
        }}
      >
        Basic Device Settings
      </h3>
      <Form
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          marginBottom: "24px",
          padding: "24px 48px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
      >
        <Form.Item label="Device Name">
          <Input />
        </Form.Item>
        <Form.Item label="Monitoring Status">
          <Radio.Group>
            <Radio checked value={true}>
              {" "}
              Started (default){" "}
            </Radio>
            <Radio value={false}> Paused </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="IPv4 Address">
          <Input />
        </Form.Item>
        <Form.Item label="Priority">
          <Rate
            allowClear={false}
            defaultValue={3}
            tooltips={priorityDesc}
            onChange={setPriorityValue}
            value={PriorityValue}
          />
          {PriorityValue ? (
            <span className="ant-rate-text">
              {priorityDesc[PriorityValue - 1]}
            </span>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <h3
        style={{
          marginLeft: "24px",
          marginBottom: "12px",
        }}
      >
        Additional Device Information
      </h3>
      <Form
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          marginBottom: "24px",
          padding: "24px 48px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
      >
        <Form.Item label="Device Icon">
          <Radio.Group
            size="large"
            options={options}
            onChange={({ target: { value } }) => {
              setValue1(value);
            }}
            value={value1}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <h3
        style={{
          marginLeft: "24px",
          marginBottom: "12px",
        }}
      >
        Credentials for SNMP Devices
      </h3>
      <Form
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          marginBottom: "24px",
          padding: "24px 48px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
      >
        <Form.Item label="SNMP Version">
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Radio checked value={"v1"}>
              SNMP v1
            </Radio>
            <Radio value={"v2"}> SNMP v2c (default) </Radio>
            <Radio value={"v3"}> SNMP v3 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="SNMP Community String">
          <Input />
        </Form.Item>
        <Form.Item label="SNMP Port">
          <Input />
        </Form.Item>
        <Form.Item label="SNMP Timeout">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <Form>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            danger
          >
            DELETE DEVICE
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DeviceSettings;
