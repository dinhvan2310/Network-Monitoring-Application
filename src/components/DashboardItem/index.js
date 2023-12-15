import React from 'react';
import { Layout } from 'antd';
import ItemListChart from 'components/ItemListChart';
import ItemLineChart from 'components/ItemLineChart';
const { Header, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    paddingInline: 12,
    backgroundColor: '#2b2b2b',
    lineHeight: '24px',
    height: '24px',
    borderBottom: '1px solid #515151',
  };
  const contentStyle = {
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingInline: 12,
    border: '1px solid #515151',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };
  const layoutStyle = {
    borderRadius: 4,
    overflow: 'hidden',
    height: 300,
    overflowY: 'scroll',
  };

function DashboardItem({children, title}) {
    return ( 
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>{title}</Header>
                <Content style={contentStyle}>{children}</Content>
            </Layout>
        </>
     );
}

export default DashboardItem;