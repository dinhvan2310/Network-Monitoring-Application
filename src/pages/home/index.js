import React, { useEffect } from "react";
import { Row, Col, Calendar, theme, List, Avatar, Table } from "antd";
import DashboardItem from "components/DashboardItem";
import ReactClock from "@uiw/react-clock";
import ItemLineChart from "components/ItemLineChart";
import itemService from "services/itemService";
import hostService from "services/hostService";
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
  const [graphCPU, setGraphCPU] = React.useState([]);
  const [graphWifiBitSent, setGraphWifiBitSent] = React.useState([]);
  const [graphWifiBitReceived, setGraphWifiBitReceived] = React.useState([]);
  console.log("getInfo");
  useEffect(() => {
    const getInfoSystem = async () => {
      console.log("getInfo");
      setInfoSystemLoading(true);
      const host = await hostService.getHostByName("PC");
      const items = await itemService.getItemsByHost(host.result[0].hostid);
      console.log(
        items.result.filter(
          (item) => item.name === "Windows: CPU utilization"
        )[0]
      );

      const data = items.result.map(async (item) => {
        return {
          parameter: item.name,
          key: item.itemid,
          value: item.lastvalue + " " + item.units,
        };
      });

      const result = (await Promise.all(data)).filter((item) => item !== null);
      setInfoSystem(result);
      setInfoSystemLoading(false);
      console.log(
        items.result.filter(
          (item) => item.name === "Windows: CPU utilization"
        )[0]
      );
      setGraphCPU(
        items.result.filter(
          (item) => item.name === "Windows: CPU utilization"
        )[0]
      );
      setGraphWifiBitSent(
        items.result.filter(
          (item) => item.name === "Interface wireless_32768(Wi-Fi): Bits sent"
        )[0]
      );
      setGraphWifiBitReceived(
        items.result.filter(
          (item) =>
            item.name === "Interface wireless_32768(Wi-Fi): Bits received"
        )[0]
      );
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
              scroll={{
                y: 240,
              }}
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
        {console.log(graphCPU)}
        {console.log(graphWifiBitSent)}
        {console.log(graphWifiBitReceived)}
        {graphCPU && graphWifiBitSent && graphWifiBitReceived && (
          
          <>
            <Col span={8}>
              <DashboardItem>
                {graphCPU.length !== 0 && <ItemLineChart item={graphCPU} />}
              </DashboardItem>
            </Col>
            <Col span={8}>
              <DashboardItem>
              {graphWifiBitSent.length !== 0 && <ItemLineChart item={graphWifiBitSent} />}
              </DashboardItem>
            </Col>
            <Col span={8}>
              <DashboardItem>
              {graphWifiBitReceived.length !== 0 && <ItemLineChart item={graphWifiBitReceived} />}
              </DashboardItem>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}

export default Home;
