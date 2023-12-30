import { Button, Space, Table, Tag, Input, Badge, Avatar } from "antd";
import { SearchOutlined, ExclamationCircleOutlined  } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import hostService from "services/hostService";
import itemService from "services/itemService";
import Problem from "components/Problem";
import problemService from "services/problemService";

function MonitoringHost() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
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
      render: ({ latestData }) => {
        console.log(latestData.latestData.length);
        console.log(latestData.hostid);
        return (
          <Space>
            <Link to={`/monitoring/latestData?hostid=${latestData.hostid}`}>
              Latest data
            </Link>
            <Tag color="#2ecc71">{latestData.latestData.length}</Tag>
          </Space>
        );
      },
    },
    {
      title: "Problems",
      key: "problems",
      
      render: ({ problems }) => {
        return (
          <Space>
            <Badge count={problems.length} showZero  >
              <Avatar  size="default" icon={<ExclamationCircleOutlined />}/>
            </Badge>
          </Space>
        );
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

        const problems = await problemService.getProblemByHost(host.hostid);
        console.log(problems);

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
          latestData: { latestData: items.result, hostid: host.hostid },
          type: hostInterfaces.result ? hostInterfaces.result[0].type : "",
          problems: problems.result,
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
        expandable={{
          expandedRowRender: (item) => {
            return <Problem item={item} />;
          },
          rowExpandable: (item) => {
            return item.problems.length > 0;
          },
        }}
      />
    </>
  );
}

export default MonitoringHost;
