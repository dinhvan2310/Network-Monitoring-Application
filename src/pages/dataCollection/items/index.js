import { Button, Form, Input, Modal, Space, Table, Tag, Tooltip, Select, Popconfirm} from "antd";
import { PlusOutlined, SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import JSAlert from "js-alert";
import Highlighter from 'react-highlight-words';
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import itemService from "services/itemService";
import hostService from "services/hostService";

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

const ItemValueType = {
  0: "Numeric (float)",
  3: "Numeric (unsigned)",
  1: "Character",
  2: "Log",
  4: "Text",
}


function Items() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
          color: filtered ? '#1677ff' : undefined,
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
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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
      ...getColumnSearchProps('name'),
    },
    {
      title: "Key",
      dataIndex: "key_",
      key: "key_",
    },
    {
      title: "Interval",
      dataIndex: "interval",
      key: "interval",
      sorter: (a, b) => {
        let intervalA = a.interval;
        let intervalB = b.interval;
        if(a.interval[a.interval.length - 1] === "s") intervalA = Number(a.interval.replace(/[^0-9]/g, ''))
        else if(a.interval[a.interval.length - 1] === "m") intervalA = Number(a.interval.replace(/[^0-9]/g, '')) * 60
        else if(a.interval[a.interval.length - 1] === "h") intervalA = Number(a.interval.replace(/[^0-9]/g, '')) * 3600
        else if(a.interval[a.interval.length - 1] === "d") intervalA = Number(a.interval.replace(/[^0-9]/g, '')) * 86400
        if(b.interval[b.interval.length - 1] === "s") b.interval = Number(b.interval.replace(/[^0-9]/g, ''))
        else if(b.interval[b.interval.length - 1] === "m") intervalB = Number(b.interval.replace(/[^0-9]/g, '')) * 60
        else if(b.interval[b.interval.length - 1] === "h") intervalB = Number(b.interval.replace(/[^0-9]/g, '')) * 3600
        else if(b.interval[b.interval.length - 1] === "d") intervalB = Number(b.interval.replace(/[^0-9]/g, '')) * 86400
        return intervalA - intervalB;
      },
    },
    {
      title: "History",
      dataIndex: "history",
      key: "history",
      sorter: (a, b) => {
        let historyA = a.history;
        let historyB = b.history;
        if(a.history[a.history.length - 1] === "s") historyA = Number(a.history.replace(/[^0-9]/g, ''))
        else if(a.history[a.history.length - 1] === "m") historyA = Number(a.history.replace(/[^0-9]/g, '')) * 60
        else if(a.history[a.history.length - 1] === "h") historyA = Number(a.history.replace(/[^0-9]/g, '')) * 3600
        else if(a.history[a.history.length - 1] === "d") historyA = Number(a.history.replace(/[^0-9]/g, '')) * 86400
        if(b.history[b.history.length - 1] === "s") b.history = Number(b.history.replace(/[^0-9]/g, ''))
        else if(b.history[b.history.length - 1] === "m") historyB = Number(b.history.replace(/[^0-9]/g, '')) * 60
        else if(b.history[b.history.length - 1] === "h") historyB = Number(b.history.replace(/[^0-9]/g, '')) * 3600
        else if(b.history[b.history.length - 1] === "d") historyB = Number(b.history.replace(/[^0-9]/g, '')) * 86400
        return historyA - historyB;
      },
    },
    {
        title: "Trends",
        dataIndex: "trends",
        key: "trends",
        sorter: (a, b) => {
          let trendsA = a.trends;
          let trendsB = b.trends;
          if(a.trends[a.trends.length - 1] === "s") trendsA = Number(a.trends.replace(/[^0-9]/g, ''))
          else if(a.trends[a.trends.length - 1] === "m") trendsA = Number(a.trends.replace(/[^0-9]/g, '')) * 60
          else if(a.trends[a.trends.length - 1] === "h") trendsA = Number(a.trends.replace(/[^0-9]/g, '')) * 3600
          else if(a.trends[a.trends.length - 1] === "d") trendsA = Number(a.trends.replace(/[^0-9]/g, '')) * 86400
          if(b.trends[b.trends.length - 1] === "s") b.trends = Number(b.trends.replace(/[^0-9]/g, ''))
          else if(b.trends[b.trends.length - 1] === "m") trendsB = Number(b.trends.replace(/[^0-9]/g, '')) * 60
          else if(b.trends[b.trends.length - 1] === "h") trendsB = Number(b.trends.replace(/[^0-9]/g, '')) * 3600
          else if(b.trends[b.trends.length - 1] === "d") trendsB = Number(b.trends.replace(/[^0-9]/g, '')) * 86400
          return trendsA - trendsB;
        },
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type) => {
          return <Tag >{ItemType[type]}</Tag>;
        },
        filters: [
          {
            text: 'Zabbix agent',
            value: '0',
          },
          {
            text: 'Zabbix trapper',
            value: '2',
          },
          {
            text: 'Simple check',
            value: '3',
          },
          {
            text: 'Zabbix internal',
            value: '5',
          },
          {
            text: 'Zabbix agent (active)',
            value: '7',
          },
          {
            text: 'Web item',
            value: '9',
          },
          {
            text: 'External check',
            value: '10',
          },
          {
            text: 'Database monitor',
            value: '11',
          },
          {
            text: 'IPMI agent',
            value: '12',
          },
          {
            text: 'SSH agent',
            value: '13',
          },
          {
            text: 'TELNET agent',
            value: '14',
          },
          {
            text: 'CALCULATED',
            value: '15',
          },
          {
            text: 'JMX AGENT',
            value: '16',
          },
          {
            text: 'SNMP TRAP',
            value: '17',
          },
          {
            text: 'Dependent item',
            value: '18',
          },
          {
            text: 'HTTP agent',
            value: '19',
          },
          {
            text: 'SNMP agent',
            value: '20',
          },
          {
            text: 'Script',
            value: '21',
          }
        ],
        defaultFilteredValue: [
          20, 5
        ],
        onFilter: (value, record) => {
          return record.type === value;
        }
    },
    {
      title: "Type of information",
      dataIndex: "value_type",
      key: "value_type",
      render: (value_type) => {
        return <Tag >{ItemValueType[value_type]}</Tag>;
      },
      filters: [
        {
          text: 'Numeric (float)',
          value: '0',
        },
        {
          text: 'Numeric (unsigned)',
          value: '3',
        },
        {
          text: 'Character',
          value: '1',
        },
        {
          text: 'Log',
          value: '2',
        },
        {
          text: 'Text',
          value: '4',
        }
      ],
      onFilter: (value, record) => {
        return record.value_type === value;
      },
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          console.log(status, status)
          return status[1] === "1"? <Tag color="#333">Not Support</Tag> : 
                (status[0] === "0" ? <Tag color="#2ecc71">{"Enabled"}</Tag> : <Tag color="#e74c3c">Disabled</Tag>)
        },
        filters: [
          {
            text: 'enabled',
            value: '0',
          },
          {
            text: 'disabled',
            value: '2',
          },
          {
            text: 'not support',
            value: '1',
          }
        ],
        onFilter: (value, record) => {
          console.log(value, record);
          if(value === "0") return record.status[0] === "0" && record.status[1] === "0";
          if(value === "2") return record.status[0] === "1" && record.status[1] === "0";
          if(value === "1") return record.status[1] === "1";
        },
    },
    {
      title: "Info",
      dataIndex: "error",
      key: "error",
      align: "center",
      width: "64px",
      render: (error) => {
        console.log(error);
        if (error) {
          return (
            <Tooltip title={error}>
              <InfoCircleOutlined />
            </Tooltip>
          )
        }
      },
    },
    {
        title: () => (
          <Tooltip title="Add Item">
            <Button
              icon={<PlusOutlined />}
              onClick={async () => {
                setType(0);
                setIsModalAddShow(true);
              }}
            ></Button>
          </Tooltip>
        ),
        dataIndex: "action",
      },
  ];

  const queryString = new URLSearchParams(useLocation().search);

  const [dataSource, setDataSource] = useState([]);
  const [ reload, setReload ] = useState(false);
  const [isModalAddShow, setIsModalAddShow] = useState(false);
  const [isModalUpdateShow, setIsModalUpdateShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState(0);


  const [hostid, setHostid] = useState(() => {
    return queryString.get("hostid");
  });

  const [templateid, setTemplateid] = useState(() => {
    return queryString.get("templateid");
  });

  
  useEffect(() => {
    setHostid(queryString.get("hostid"));
  }, [queryString])

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        let items
        if(hostid)
          items = await itemService.getItemsByHost(hostid);
        else if(templateid)
          items = await itemService.getItemByTemplate(templateid);
        console.log(items)
        const dataTable = await Promise.all(items.result.map(async (item) => {
            return {
                key: item.itemid,
                name: item.name,
                key_: item.key_,
                interval: item.delay === "0" ? "" : item.delay,
                history: item.history,
                trends: item.trends,
                type: item.type,
                status: [item.status, item.state],
                error: item.error,
                value_type: item.value_type,
            }
        }))
        setDataSource(dataTable);
        setLoading(false);
    }
    fetchData();
  }, [hostid, reload]);

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
        <Modal
        destroyOnClose={true}
        title="Add Item"
        open={isModalAddShow}
        onCancel={() => setIsModalAddShow(false)}
        footer={null}
        // onOk={async () => {

        // setIsModalAddHostShown(false);
        // }}
      >
        <Form
          name="addItem"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{}}
          onFinish={async (values) => {
            if(values.history === "0d") values.history = "0";
            if(values.trends === "0d") values.trends = "0";
            if(values.units === undefined) values.units = "";
            if(values.description === undefined) values.description = "";
            let response
            console.log(await hostService.getHostInterfaces(hostid))
            if(hostid)
              {
                values.interfaceid = (await hostService.getHostInterfaces(hostid)).result[0].interfaceid;
                values.hostid = hostid;
                response = await itemService.createItem(values);
              }
              else{
                values.hostid = templateid;
                response = await itemService.createItemWithoutInterfaceid(values);
              }

            console.log(values);
            if(response.error){
              JSAlert.alert(response.error.data, response.error.message);
            }else{
              JSAlert.alert("Update host successfully");
              setReload(!reload);
              setIsModalAddShow(false);
            }
          }}
          autoComplete="off"
        >
            <Form.Item
            label="Host name"
            name={"host"}
            rules={[
              {
                required: true,
                message: "Please input host name",
              },
            ]}
          >
            <Input />
          </Form.Item>
            <Form.Item
            label="Key"
            name={"key_"}
            rules={[
              {
                required: true,
                message: "Please input key",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type of information"
            name={"value_type"}
            initialValue={0}
            rules={[
              {
                required: true,
                message: "Please input type of information",
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
              onChange={(value) => {
                setType(value);
              }}
              options={[
                {
                  value: 0,
                  label: "Numeric (float)",
                },
                {
                  value: 3,
                  label: "Numeric (unsigned)",
                },
                {
                  value: 1,
                  label: "Character",
                },
                {
                  value: 2,
                  label: "Log",
                },
                {
                  value: 4,
                  label: "Text",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="SNMP OID"
            name={"snmp_oid"}
            rules={[
              {
                required: true,
                message: "Please input SNMP OID",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {(type == 0 || type == 3) && (
            <Form.Item
            label="Units"
            name={"units"}
          >
            <Input />
          </Form.Item>
          ) }
          <Form.Item
            label="Update interval"
            name={"delay"}
            rules={[
              {
                required: true,
                message: "Please input update interval",
              },
              {
                pattern: /^(\d+)(s|m|h|d)$/,
                message: "Please input update interval in format 30s,1m,2h,1d",
              }
            ]}
            initialValue={"30s"}
          >
            <Input placeholder="30s,1m,2h,1d"/>
          </Form.Item>
          <Form.Item
            label="History storage period"
            name={"history"}
            rules={[
              {
                required: true,
                message: "Please input history storage period",
              },
              {
                pattern: /^(\d+)(d)$/,
                message: "Please input history storage period in format 90d",
              }
            ]}
            initialValue={"90d"}
          >
            <Input placeholder="90d"/>
          </Form.Item>
          <Form.Item
            label="Trend storage period"
            name={"trends"}
            rules={[
              {
                required: true,
                message: "Please input trend storage period",
              },
              {
                pattern: /^(\d+)(d)$/,
                message: "Please input trend storage period in format 365d",
              }
            ]}
            initialValue={"365d"}
          >
            <Input placeholder="365d"/>
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
        <Modal
        destroyOnClose={true}
        title="Update Item"
        open={isModalUpdateShow}
        onCancel={() => setIsModalUpdateShow(false)}
        footer={null}
        // onOk={async () => {

        // setIsModalAddHostShown(false);
        // }}
      >
        <Form
          name="updateItem"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{}}
          onFinish={async (values) => {
            if(values.history === "0d") values.history = "0";
            if(values.trends === "0d") values.trends = "0";
            if(values.units === undefined) values.units = "";
            if(values.description === undefined) values.description = "";
            if(selectedItem.templateid !== '0')
              values.value_type = null
            console.log(values)

            const response = await itemService.updateItem(values);
            if(response.error){
              JSAlert.alert(response.error.data, response.error.message);
            }else{
              JSAlert.alert("Update host successfully");
              setReload(!reload);
              setIsModalUpdateShow(false);
            }

          }}
          autoComplete="off"
        >
            <Form.Item
              name={"itemid"}
              initialValue={selectedItem ? selectedItem.itemid : ""}
              hidden={true}
            >
            <Input type="hidden"/>
            </Form.Item>
            <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input host name",
              },
            ]}
            initialValue={ selectedItem ? selectedItem.name : "" }
          >
            <Input disabled={!(selectedItem.templateid === '0')}/>
          </Form.Item>
            <Form.Item
            label="Key"
            name={"key_"}
            rules={[
              {
                required: true,
                message: "Please input key",
              },
            ]}
            initialValue={selectedItem ? selectedItem.key_ : ""}
          >
            <Input disabled={!(selectedItem.templateid === '0')}/>
          </Form.Item>
          <Form.Item
            label="Type of information"
            name={"value_type"}
              initialValue={selectedItem ? Number(selectedItem.value_type) : 0}
            rules={[
              {
                required: true,
                message: "Please input type of information",
              },
            ]}
          >
            <Select
              disabled={!(selectedItem.templateid === '0')}
              style={{
                width: '100%',
              }}
              onChange={(value) => {
                setType(value);
              }}
              options={[
                {
                  value: 0,
                  label: "Numeric (float)",
                },
                {
                  value: 3,
                  label: "Numeric (unsigned)",
                },
                {
                  value: 1,
                  label: "Character",
                },
                {
                  value: 2,
                  label: "Log",
                },
                {
                  value: 4,
                  label: "Text",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="SNMP OID"
            name={"snmp_oid"}
            rules={[
              {
                required: true,
                message: "Please input SNMP OID",
              },
            ]}
            initialValue={selectedItem ? selectedItem.snmp_oid : ""}
          >
            <Input disabled={!(selectedItem.templateid === '0')}/>
          </Form.Item>
          {(type == 0 || type == 3) && (
            <Form.Item
            label="Units"
            name={"units"}
            initialValue={selectedItem ? selectedItem.units : ""}
          >
            <Input disabled={!(selectedItem.templateid === '0')}/>
          </Form.Item>
          ) }
          <Form.Item
            label="Update interval"
            name={"delay"}
            rules={[
              {
                required: true,
                message: "Please input update interval",
              },
              {
                pattern: /^(\d+)(s|m|h|d)$/,
                message: "Please input update interval in format 30s,1m,2h,1d",
              }
            ]}
            initialValue={selectedItem ? selectedItem.delay : ""}
          >
            <Input placeholder="30s,1m,2h,1d"/>
          </Form.Item>
          <Form.Item
            label="History storage period"
            name={"history"}
            rules={[
              {
                required: true,
                message: "Please input history storage period",
              },
              {
                pattern: /^(\d+)(d)$/,
                message: "Please input history storage period in format 90d",
              }
            ]}
            initialValue={selectedItem ? (selectedItem.history === '0' ? '0d' : selectedItem.history) : ""}
          >
            <Input placeholder="90d"/>
          </Form.Item>
          <Form.Item
            label="Trend storage period"
            name={"trends"}
            rules={[
              {
                required: true,
                message: "Please input trend storage period",
              },
              {
                pattern: /^(\d+)(d)$/,
                message: "Please input trend storage period in format 365d",
              }
            ]}
            initialValue={selectedItem ? (selectedItem.trends === '0' ? '0d' : selectedItem.trends) : ""}
          >
            <Input placeholder="365d"/>
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            initialValue={selectedItem ? selectedItem.description : ""}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Table
        title={() => "Items"}
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
              const response = await itemService.disableItem(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setReload(!reload);
                // setDataSource(
                //   dataSource.map((item) => {
                //     if (item.key == key) {
                //       item.status = "1";
                //     }
                //     return item;
                //   })
                // );
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
              const response = await itemService.enableItem(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setReload(!reload);
                // setDataSource(
                //   dataSource.map((item) => {
                //     if (item.key === key) {
                //       item.status = "0";
                //     }
                //     return item;
                //   })
                // );
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Enabled
        </Button>
        <Popconfirm
          title= {`Are you sure to delete ${selectedRowKeys.length} items?`}
          description="This action cannot be undone."
          onConfirm={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await itemService.deleteItem(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setReload(!reload);
                // setDataSource(
                //   dataSource.filter((host) => {
                //     return host.key !== key;
                //   })
                // );
              }
            });
            setSelectedRowKeys([]);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
          type="primary"
          ghost
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          
          
        >
          Delete
        </Button>
        </Popconfirm>
        
          <Button
          type="primary"
          ghost
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={async () => {
            if (selectedRowKeys.length > 1) {
              JSAlert.alert("Please select only one host to edit");
              return;
            }
            if (selectedRowKeys.length === 0) {
              JSAlert.alert("Please select a host to edit");
              return;
            }
            const response = await itemService.getItem(selectedRowKeys[0]);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              setSelectedItem(response.result[0]);
              setType(response.result[0].value_type);
              setIsModalUpdateShow(true);
            }
          }}
        >
          Edit
        </Button>
        
      </Space>
    </>
  );
}

export default Items;
