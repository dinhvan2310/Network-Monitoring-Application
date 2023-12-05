import { Button, Space, Table, Tag, List, Typography, notification } from "antd";
import JSAlert from "js-alert";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hostService from "services/hostService";
import itemService from "services/itemService";
import ItemGraph from "../graph";
import ItemLineChart from "components/ItemLineChart";
import ItemListChart from "components/ItemListChart";

function LatestData() {
  const columns = [
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last check",
      dataIndex: "lastcheck",
      key: "lastcheck",
    },
    {
      title: "Last value",
      textWrap: "word-break",
      ellipsis: true,
      dataIndex: "lastvalue",
      key: "lastvalue",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      textWrap: "word-break",
      ellipsis: true,
    },
    {
      title: "Graph",
      dataIndex: "history",
      key: "history",
      render: (history, {itemid, value_type}) => {
        if (history !== "0") {
          console.log(itemid);
          if(value_type === "0" || value_type === "3") {
            return <Link to={`/monitoring/graph?itemid=${itemid}`}>Graph</Link>
          } else {
            return <Link to={`/monitoring/graph?itemid=${itemid}`}>Graph</Link>
          }
        }
      },
    }
  ];

  const queryString = new URLSearchParams(useLocation().search);

  const [dataSource, setDataSource] = useState([]);
  const [hostid, setHostid] = useState(() => {
    return queryString.get("hostid");
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  useEffect(() => {
    setHostid(queryString.get("hostid"));
  }, [queryString]);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      let response = null;
      if (hostid === "all") {
        const hosts = await hostService.getHosts();
        console.log(hosts);
        const hostidsPromise = hosts.result.map(async (host) => {
          return host.hostid;
        });
        const hostids = await Promise.all(hostidsPromise);
        console.log(hostids);
        response = await itemService.getItemsByHost(hostids);
      } else {
        response = await itemService.getItemsByHost(hostid);
      }
      console.log(response);
      const data = response.result.map(async (item) => {
        const timestamp = item.lastclock;
        const date = new Date(timestamp * 1000); // Phải nhân với 1000 vì JavaScript sử dụng milliseconds cho timestamp
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        let change = "";
        let value = item.lastvalue;
        if (item.value_type === "0") {
          change = value - item.prevvalue;
          change = change.toFixed(2) + " " + item.units;
        }

        return {
          ...item,
          key: item.itemid,
          itemid: item.itemid,
          host: (await hostService.getHostName(item.hostid)).result[0].host,
          name: item.name,
          lastcheck: formattedTime,
          lastvalue: value + " " + item.units,
          change: change,
          value_type: item.value_type,
          history: item.history,
          delay: item.delay,
          units: item.units,
        };
      });
      setDataSource(await Promise.all(data));
      setLoading(false);
    };
    fetchDevices();
  }, [hostid]);

  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };
  return (
    <>
      <Table
        title={() => "Hosts"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        expandable={{
          expandedRowRender: (item) => {
            console.log(item)
            if(item.value_type === "0" || item.value_type === "3") {
              return <ItemLineChart item={item} />
            } else {
              return <ItemListChart  item={item}/>
            }
          },
          rowExpandable: (item) => item.history != "0",
          onExpand: async (expanded, record) => {

          },
        }}
      />
      <Space>
        <Button
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await hostService.disableHost(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setDataSource(
                  dataSource.map((host) => {
                    if (host.key === key) {
                      host.status = "1";
                    }
                    return host;
                  })
                );
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Disabled
        </Button>
        <Button
          type="primary"
          ghost
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await hostService.enableHost(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setDataSource(
                  dataSource.map((host) => {
                    if (host.key === key) {
                      host.status = "0";
                    }
                    return host;
                  })
                );
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Enabled
        </Button>
        <Button
          type="primary"
          ghost
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await hostService.deleteHost(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setDataSource(
                  dataSource.filter((host) => {
                    return host.key !== key;
                  })
                );
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Delete
        </Button>
      </Space>
    </>
  );
}

export default LatestData;
