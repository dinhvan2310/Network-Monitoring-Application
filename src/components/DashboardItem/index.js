import React from 'react';
import { Layout, theme } from 'antd';
import ItemListChart from 'components/ItemListChart';
import ItemLineChart from 'components/ItemLineChart';
const { Header, Content } = Layout;

function DashboardItem({children, title, height}) {
  console.log(height)
  const { token } = theme.useToken();
  const layoutStyle = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    overflow: 'scroll',
    backgroundColor: 'transparent',
    height: height || 'auto',
  };
  const contentStyle = {
    // textAlign: 'center',
    paddingInline: 12,
    height: '100%',
    width: '100%',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
  };
  
  return ( 
    <>
      <Layout style={layoutStyle}>
        {title && <Header style={{paddingInline: 12, backgroundColor: 'transparent'}}>{title}</Header>}
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </>
  );
}

export default DashboardItem;