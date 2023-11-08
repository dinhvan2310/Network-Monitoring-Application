import { Button, Space, Table, Tag } from "antd";
import JSAlert from "js-alert";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hostService from "services/hostService";
import itemService from "services/itemService";

function MonitoringHost() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Interfaces",
      dataIndex: "interfaces",
      key: "interfaces",
    },
    {
      title: "Status",
      key: "status",
      render: ({ status }) => {
        return status === "1" ? (
          <Tag color="#e74c3c">Disabled</Tag>
        ) : (
          <Tag color="#2ecc71">Enabled</Tag>
        );
      },
    },
    {
      title: "Availability",
      key: "availability",
      render: ({ hostInterfaces }) => {
        const availability = hostInterfaces.result[0]
          ? hostInterfaces.result[0].available
          : "0";
        return availability === "0" ? (
          <Tag color="#e74c3c">Unknown</Tag>
        ) : availability === "1" ? (
          <Tag color="#2ecc71">Available</Tag>
        ) : (
          <Tag color="#e74c3c">Unavailable</Tag>
        );
      },
    },
    {
      title: "Latest data",
      key: "latestData",
      render: ({latestData}) => {
        console.log(latestData.latestData.length)
        console.log(latestData.hostid)
        return (
        <Space>
            <Link to={`/monitoring/latestData?hostid=${latestData.hostid}`}>Latest data</Link>
            <Tag color="#2ecc71">{latestData.latestData.length}</Tag>
        </Space>)
      },
    },
    {
      title: "Type",
      key: "type",
      render: ({ type }) => {
        return type === "1" ? (
          <Tag>Agent</Tag>
        ) : type === "2" ? (
          <Tag>SNMP</Tag>
        ) : type === "3" ? (
          <Tag>IPMI</Tag>
        ) : type === "4" ? (
          <Tag>JMX</Tag>
        ) : (
          <Tag color="#e74c3c">Unknown</Tag>
        );
      },
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      const hosts = await hostService.getHosts();
      const hostInterfaces = hosts.result.map(async (host) => {
        console.log(host);
        const hostInterfaces = await hostService.getHostInterfaces(host.hostid);
        const items = await itemService.getItemsByHost(host.hostid);
        console.log(items);
        return {
          key: host.hostid,
          name: host.name,
          interfaces: hostInterfaces.result[0]
            ? hostInterfaces.result[0].ip +
              " : " +
              hostInterfaces.result[0].port
            : "",
          status: host.status,
          hostInterfaces: hostInterfaces,
          latestData: {latestData: items.result, hostid: host.hostid},
          type: hostInterfaces.result? hostInterfaces.result[0].type : "",
        };
      });
      const hostsData = await Promise.all(hostInterfaces);
      setDataSource(hostsData);
      setLoading(false);
    };
    fetchDevices();
  }, []);

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

export default MonitoringHost;
