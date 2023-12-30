import React, { useEffect } from "react";
import { Row, Col, Calendar, theme, List, Avatar, Table } from "antd";
import DashboardItem from "components/DashboardItem";
import ReactClock from "@uiw/react-clock";
import ItemLineChart from "components/ItemLineChart";
import itemService from "services/itemService";
import hostService from "services/hostService";
import triggerService from "services/triggerService";
import userService from "services/userService";
import { key } from "localforage";
import Problem from "components/Problem";
const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

function Home() {
  const { token } = theme.useToken();
  const wrapperStyle = {
    // width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [infoSystemLoading, setInfoSystemLoading] = React.useState(false);

  const [infoSystem, setInfoSystem] = React.useState([]);
  useEffect(() => {
    const getInfoSystem = async () => {
      setInfoSystemLoading(true);

      const host = await hostService.getHosts();


      const zabbix = host.result.filter(
        (item) => item.host === "Zabbix server"
      );
      // const zabbixVersion = (
      //   await itemService.getItemsByHost(zabbix[0].hostid)
      // ).result.filter((item) => item.name === "Zabbix server: Version")[0]
      //   .lastvalue;
      // console.log(zabbixVersion);

      console.log(host);
      const numberHost = host.result.length;
      const numberHostEnable = host.result.filter(
        (item) => item.status === "0"
      ).length;

      const host_ = host.result.map(async (h) => {
        const item = await itemService.getItemsByHost(h.hostid);
        const trigger = await triggerService.getTriggerByHost(h.hostid);
        return {
          ...h,
          items: item.result.length,
          triggers: trigger.result.length,
        };
      });
      const host__ = await Promise.all(host_);
      console.log(host__);

      const numberItem = host__.reduce((acc, cur) => acc + cur.items, 0);

      const numberTrigger = host__.reduce((acc, cur) => acc + cur.triggers, 0);

      const numberUser = (await userService.getUsers()).result.length;
      const infoSystemData = [
        // {
        //   key: "0",
        //   parameter: "Zabbix server version",
        //   value: zabbixVersion,
        // },
        {
          key: "1",
          parameter: "Zabbix server is running",
          value: "Yes",
        },
        {
          key: "2",
          parameter: "Number of hosts",
          value: numberHost + " (" + numberHostEnable + " enabled)",
        },
        {
          key: "3",
          parameter: "Number of items",
          value: numberItem,
        },
        {
          key: "4",
          parameter: "Number of triggers",
          value: numberTrigger,
        },
        {
          key: "5",
          parameter: "Number of users",
          value: numberUser,
        },
      ];
      setInfoSystem(infoSystemData);
      setInfoSystemLoading(false);
    };
    getInfoSystem();
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <DashboardItem>
            <Table
              loading={infoSystemLoading}
              columns={[
                {
                  title: "Parameter",
                  dataIndex: "parameter",
                  width: 150,
                },
                {
                  title: "Value",
                  dataIndex: "value",
                  width: 150,
                },
              ]}
              dataSource={infoSystem}
              pagination={false}
              // scroll={{
              //   y: 240,
              // }}
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
            <ReactClock width={"100%"} height={"95%"} />
          </DashboardItem>
        </Col>
        <Col span={12}>
          <DashboardItem title={"Current problems"} scroll={true}>
            <Problem />
          </DashboardItem>
        </Col>
      </Row>
    </>
  );
}

export default Home;
