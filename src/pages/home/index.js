import React from "react";
import { Row, Col, Calendar, theme, List, Avatar, Table } from "antd";
import DashboardItem from "components/DashboardItem";
import ReactClock from '@uiw/react-clock';
import ItemLineChart from "components/ItemLineChart";
const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const item = {
  "itemid": "23625",
  "type": "5",
  "snmp_oid": "",
  "hostid": "10084",
  "name": "Zabbix server: Value cache hits",
  "key_": "zabbix[vcache,cache,hits]",
  "delay": "1m",
  "history": "1w",
  "trends": "365d",
  "status": "0",
  "value_type": "0",
  "trapper_hosts": "",
  "units": "vps",
  "formula": "",
  "logtimefmt": "",
  "templateid": "22196",
  "valuemapid": "0",
  "params": "",
  "ipmi_sensor": "",
  "authtype": "0",
  "username": "",
  "password": "",
  "publickey": "",
  "privatekey": "",
  "flags": "0",
  "interfaceid": "0",
  "description": "The effectiveness statistics of Zabbix value cache. The number of cache hits (history values taken from the cache).",
  "inventory_link": "0",
  "lifetime": "0",
  "evaltype": "0",
  "jmx_endpoint": "",
  "master_itemid": "0",
  "timeout": "3s",
  "url": "",
  "query_fields": [],
  "posts": "",
  "status_codes": "200",
  "follow_redirects": "1",
  "post_type": "0",
  "http_proxy": "",
  "headers": [],
  "retrieve_mode": "0",
  "request_method": "0",
  "output_format": "0",
  "ssl_cert_file": "",
  "ssl_key_file": "",
  "ssl_key_password": "",
  "verify_peer": "0",
  "verify_host": "0",
  "allow_traps": "0",
  "uuid": "69b14487a9744dbb866f2e6ee131d0e5",
  "state": "0",
  "error": "",
  "parameters": [],
  "lastclock": "1702663365",
  "lastns": "72385924",
  "lastvalue": "6.155649323259164",
  "prevvalue": "5.934123054282829",
  "key": "23625",
  "host": "Zabbix server",
  "lastcheck": "1702663365",
  "change": "0.22 vps"
}

function Home() {
  const { token } = theme.useToken();
  const wrapperStyle = {
    // width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <DashboardItem title="Item List Chart" height={'346px'}>
            <List
              itemLayout="vertical"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </DashboardItem>
        </Col>
        <Col span={8}>
          <DashboardItem>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} /> 
          </DashboardItem>
        </Col>
        <Col span={4}>
          <DashboardItem>
            <ReactClock width={'100%'} height={'95%'}/>
          </DashboardItem>
        </Col>
        <Col span={8}>
          <DashboardItem title="Item Line Chart">
            <ItemLineChart item={item}/>
          </DashboardItem>
        </Col>
        <Col span={8}>
          <DashboardItem title="Item Line Chart">
            <ItemLineChart item={item}/>
          </DashboardItem>
        </Col>
        <Col span={8}>
          <DashboardItem title="Item Line Chart">
            <ItemLineChart item={item}/>
          </DashboardItem>
        </Col>
        <Col span={24}>
          <DashboardItem title="Item Line Chart">
            <Table 
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Age',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: 'Address',
                  dataIndex: 'address',
                  key: 'address',
                },
              ]}
              dataSource={[
                {
                  key: '1',
                  name: 'John Brown',
                  age: 32,
                  address: 'New York No. 1 Lake Park',
                },
                {
                  key: '2',
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 1 Lake Park',
                },
                {
                  key: '3',
                  name: 'Joe Black',
                  age: 32,
                  address: 'Sidney No. 1 Lake Park',
                }
              ]}
            />
          </DashboardItem>
        </Col>
      </Row>
    </>
  );
}

export default Home;
