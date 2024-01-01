import {
  Button,
  Space,
  Table,
  Tag,
  List,
  Typography,
  notification,
  Tooltip,
  Input,
  Popconfirm,
} from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import JSAlert from "js-alert";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hostService from "services/hostService";
import itemService from "services/itemService";
import ItemLineChart from "components/ItemLineChart";
import ItemListChart from "components/ItemListChart";

function formatTimeTicks(timeTicks) {
  // Chuyển đổi TimeTicks thành milliseconds
  var milliseconds = timeTicks * 10; // Một TimeTick tương đương với 0.01 giây (10 milliseconds)

  // Tạo đối tượng Date từ milliseconds
  var date = new Date(milliseconds);

  // Lấy ngày, giờ, phút và giây từ đối tượng Date
  var days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();

  // Trả về chuỗi định dạng ngày/giờ/phút/giây
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

const ItemValueType = {
  0: "Numeric (float)",
  3: "Numeric (unsigned)",
  1: "Character",
  2: "Log",
  4: "Text",
};

const ItemType = {
  0: "Zabbix agent",
  2: "Zabbix trapper",
  3: "Simple check",
  5: "Zabbix internal",
  7: "Zabbix agent (active)",
  9: "Web item",
  10: "External check",
  11: "Database monitor",
  12: "IPMI agent",
  13: "SSH agent",
  14: "TELNET agent",
  15: "CALCULATED",
  16: "JMX AGENT",
  17: "SNMP TRAP",
  18: "Dependent item",
  19: "HTTP agent",
  20: "SNMP agent",
  21: "Script",
};

function LatestData() {
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
      title: "Host",
      dataIndex: "host",
      key: "host",
      ...getColumnSearchProps("host")
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Type of information",
      dataIndex: "value_type",
      key: "value_type",
      render: (value_type) => {
        return <Tag>{ItemValueType[value_type]}</Tag>;
      },
      filters: [
        {
          text: "Numeric (float)",
          value: "0",
        },
        {
          text: "Numeric (unsigned)",
          value: "3",
        },
        {
          text: "Character",
          value: "1",
        },
        {
          text: "Log",
          value: "2",
        },
        {
          text: "Text",
          value: "4",
        },
      ],
      onFilter: (value, record) => {
        return record.value_type === value;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return <Tag>{ItemType[type]}</Tag>;
      },
      filters: [
        {
          text: "Zabbix agent",
          value: "0",
        },
        {
          text: "Zabbix trapper",
          value: "2",
        },
        {
          text: "Simple check",
          value: "3",
        },
        {
          text: "Zabbix internal",
          value: "5",
        },
        {
          text: "Zabbix agent (active)",
          value: "7",
        },
        {
          text: "Web item",
          value: "9",
        },
        {
          text: "External check",
          value: "10",
        },
        {
          text: "Database monitor",
          value: "11",
        },
        {
          text: "IPMI agent",
          value: "12",
        },
        {
          text: "SSH agent",
          value: "13",
        },
        {
          text: "TELNET agent",
          value: "14",
        },
        {
          text: "CALCULATED",
          value: "15",
        },
        {
          text: "JMX AGENT",
          value: "16",
        },
        {
          text: "SNMP TRAP",
          value: "17",
        },
        {
          text: "Dependent item",
          value: "18",
        },
        {
          text: "HTTP agent",
          value: "19",
        },
        {
          text: "SNMP agent",
          value: "20",
        },
        {
          text: "Script",
          value: "21",
        },
      ],
      // defaultFilteredValue: [20, 5, 18],
      onFilter: (value, record) => {
        return record.type === value;
      },
    },
    {
      title: "Last check",
      dataIndex: "lastcheck",
      key: "lastcheck",
      render: (lastcheck) => {
        if (lastcheck === "0") return "";
        const timestamp = lastcheck;
        const date = new Date(timestamp * 1000); // Phải nhân với 1000 vì JavaScript sử dụng milliseconds cho timestamp
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedTime;
      },
      sorter: (a, b) => a.lastcheck - b.lastcheck,
    },
    {
      title: "Last value",
      textWrap: "word-break",
      ellipsis: true,
      dataIndex: "lastvalue",
      key: "lastvalue",
      render: (lastvalue, { prevvalue, units, value_type, lastcheck }) => {
        if (lastvalue === "0" && prevvalue === "0" && lastcheck === "0")
          return "";
        if (value_type === "0") {
          return Number(lastvalue).toFixed(2) + " " + units;
        } else if (value_type === "3") {
          return Number(lastvalue).toFixed(0) + " " + units;
        }
        return lastvalue;
      },
      filters: [
        {
          text: "Without data",
          value: "0",
        },
        {
          text: "With data",
          value: "1",
        },
      ],
      onFilter: (value, record) => {
        if (value === "0")
          return record.lastvalue == 0 && record.prevvalue == 0;
        if (value === "1")
          return record.lastvalue != 0 || record.prevvalue != 0;
      },
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      align: "center",
      textWrap: "word-break",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      textWrap: "word-break",
      ellipsis: true,
    },
    {
      title: "Graph",
      dataIndex: "history",
      key: "history",
      width: "84px",
      render: (
        history,
        { itemid, value_type, lastvalue, prevvalue, lastcheck }
      ) => {
        if (
          history !== "0" &&
          (lastvalue != 0 || prevvalue != 0 || lastcheck != 0)
        ) {
          if (value_type === "0" || value_type === "3") {
            return <Link to={`/monitoring/graph?itemid=${itemid}`}>Graph</Link>;
          } else {
            return <Link to={`/monitoring/graph?itemid=${itemid}`}>Graph</Link>;
          }
        }
      },
    },
    {
      title: "Info",
      dataIndex: "error",
      key: "error",
      align: "center",
      width: "64px",
      render: (error) => {
        if (error !== "") {
          return (
            <Tooltip title={error}>
              <InfoCircleOutlined />
            </Tooltip>
          );
        }
      },
      filters: [
        {
          text: "Error",
          value: "0",
        },
      ],
      onFilter: (value, record) => {
        return record.error;
      },
    },
  ];

  const queryString = new URLSearchParams(useLocation().search);

  const [dataSource, setDataSource] = useState([]);
  const [hostid, setHostid] = useState(() => {
    return queryString.get("hostid");
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
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
        let change = null;
        if(item.units === 'uptime') {
          console.log(item)
          console.log(item.lastvalue)
          item.lastvalue = formatTimeTicks(item.lastvalue*100);
          item.value_type = 4;
          console.log(item.lastvalue)
        } 
        if(item.units === 'B') {
          if (item.lastvalue > 1024*1024*1024) {
            item.lastvalue = (item.lastvalue/1024/1024/1024);
            item.prevvalue = (item.prevvalue/1024/1024/1024);
            item.units = 'GB';
          } else if (item.lastvalue > 1024*1024) {
            item.lastvalue = (item.lastvalue/1024/1024);
            item.prevvalue = (item.prevvalue/1024/1024);
            item.units = 'MB';
          } else if (item.lastvalue > 1024) {
            item.lastvalue = (item.lastvalue/1024);
            item.prevvalue = (item.prevvalue/1024);
            item.units = 'KB';
          } else {
            item.units = 'B';
          }
          
        }
        if(item.units === 'bps') {
          item.lastvalue = (item.lastvalue/1024/1024);
          item.prevvalue = (item.prevvalue/1024/1024);
          item.units = 'Mbps';
        }
        let value = item.lastvalue;
        if (
          item.lastvalue === "0" &&
          item.prevvalue === "0" &&
          item.lastclock === "0"
        ) {
          change = "";
        } else {
          if (item.value_type === "0" || item.value_type === "3") {
            change = value - item.prevvalue;
            if (item.value_type === "0")
              change = change.toFixed(2) + " " + item.units;
            else change = change.toFixed(0) + " " + item.units;
          }
        }

        return {
          ...item,
          key: item.itemid,
          itemid: item.itemid,
          host: (await hostService.getHostName(item.hostid)).result[0].host,
          name: item.name,
          lastcheck: item.lastclock,
          lastvalue: value,
          prevvalue: item.prevvalue,
          change: change,
          value_type: item.value_type,
          history: item.history,
          delay: item.delay,
          units: item.units,
          error: item.error,
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
        bordered
        size="middle"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        columnWidth={32}
        expandable={{
          expandedRowRender: (item) => {
            console.log(item);
            if (item.value_type === "0" || item.value_type === "3") {
              return <div style={{
                width: '100%',
                padding: '0 142px'
              }}> <ItemLineChart item={item} /> </div>;
            } else {
              return <ItemListChart item={item} />;
            }
          },
          rowExpandable: (item) =>
            item.history != "0" &&
            !item.error &&
            (item.lastvalue != 0 || item.prevvalue != 0 || item.lastcheck != 0),
          onExpand: async (expanded, record) => {},
        }}
      />
    </>
  );
}

export default LatestData;
