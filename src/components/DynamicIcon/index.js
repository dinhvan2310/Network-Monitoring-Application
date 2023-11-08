import React from 'react';
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
  FireOutlined,
  ForkOutlined,
  LayoutOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  TranslationOutlined,
  VideoCameraOutlined,
  ShareAltOutlined,
  SendOutlined,
  SolutionOutlined,
  SaveOutlined,
  PushpinOutlined,
  PoundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DesktopOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  HddOutlined,
  UserOutlined,
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

const createComponent = (componentName) => {
        switch(componentName) {
          case 'AndroidOutlined':
            return <AndroidOutlined />;
            break;
          case 'AppleOutlined':
            return <AppleOutlined />;
          case 'WindowsOutlined':
            return <WindowsOutlined />;
          case 'AliwangwangOutlined':
            return <AliwangwangOutlined />
          case 'DingdingOutlined':
            return <DingdingOutlined />
          case 'BugOutlined':
            return <BugOutlined />
          case 'CloudOutlined':
            return <CloudOutlined />
          case 'ControlOutlined':
            return <ControlOutlined />
          case 'CreditCardOutlined':
            return <CreditCardOutlined />
          case 'FireOutlined':
            return <FireOutlined />
          case 'ForkOutlined':
            return <ForkOutlined />
          case 'LayoutOutlined':
            return <LayoutOutlined />
          case 'MailOutlined':
            return <MailOutlined />
          case 'ShoppingCartOutlined':
            return <ShoppingCartOutlined />
          case 'TranslationOutlined':
            return <TranslationOutlined />
          case 'VideoCameraOutlined':
            return <VideoCameraOutlined />
          case 'ShareAltOutlined':
            return <ShareAltOutlined />
          case 'SendOutlined':
            return <SendOutlined />
          case 'SolutionOutlined':
            return <SolutionOutlined />
          case 'SaveOutlined':
            return <SaveOutlined />
          case 'PushpinOutlined':
            return <PushpinOutlined />
          case 'PoundOutlined':
            return <PoundOutlined />
          case 'MenuFoldOutlined':
            return <MenuFoldOutlined />
          case 'MenuUnfoldOutlined':
            return <MenuUnfoldOutlined />
          case 'HomeOutlined':
            return <HomeOutlined />
          case 'DesktopOutlined':
            return <DesktopOutlined />
          case 'SettingOutlined':
            return <SettingOutlined />
          case 'AppstoreAddOutlined':
            return <AppstoreAddOutlined />
          case 'HddOutlined':
            return <HddOutlined />
          case 'UserOutlined':
            return <UserOutlined />
          case 'ThunderboltOutlined':
            return <ThunderboltOutlined />
          case 'TagsOutlined':
            return <TagsOutlined />
          case 'TableOutlined':
            return <TableOutlined />
          case 'AmazonOutlined':
            return <AmazonOutlined />
          case 'PieChartOutlined':
            return <PieChartOutlined />
          case 'BoxPlotOutlined':
            return <BoxPlotOutlined />
          case 'WarningOutlined':
            return <WarningOutlined />
          case 'CheckSquareOutlined':
            return <CheckSquareOutlined />
          case 'InfoOutlined':
            return <InfoOutlined />
          case 'EditOutlined':
            return <EditOutlined />
          case 'HighlightOutlined':
            return <HighlightOutlined />
          case 'ZoomOutOutlined':
            return <ZoomOutOutlined />
          case 'AlignCenterOutlined':
            return <AlignCenterOutlined />
          case 'UndoOutlined':
            return <UndoOutlined />
          case 'HeatMapOutlined':
            return <HeatMapOutlined />
          case 'GithubOutlined':
            return <GithubOutlined />
          case 'YoutubeOutlined':
            return <YoutubeOutlined />
          case 'LinkedinOutlined':
            return <LinkedinOutlined />
          case 'InstagramOutlined':
            return <InstagramOutlined />
          case 'SketchOutlined':
            return <SketchOutlined />
          case 'BellOutlined':
            return <BellOutlined />
          case 'CodeOutlined':
            return <CodeOutlined />
          case 'CoffeeOutlined':
            return <CoffeeOutlined />
          default:
            return <HddOutlined/>;
        }
};


const DynamicIcon = ({ componentName }) => {
  const Component = createComponent(componentName);
    return Component;
};

export default DynamicIcon;
