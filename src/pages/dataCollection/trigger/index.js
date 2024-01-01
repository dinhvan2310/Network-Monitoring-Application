import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  Select,
  Popconfirm,
  List,
  Collapse,
  Drawer 
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import JSAlert from "js-alert";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import itemService from "services/itemService";
import hostService from "services/hostService";
import triggerService from "services/triggerService";
import { render } from "@testing-library/react";

import styles from "./trigger.module.css";
import { key } from "localforage";
import templateService from "services/templateService";

const PRIORITIES = {
    0: "Not classified",
    1: "Information",
    2: "Warning",
    3: "Average",
    4: "High",
    5: "Disaster"
}
const VALUES = {
    0: "OK",
    1: "Problem"
}
const PRIORITIES_COLOR = {
    0: "#8c9ac5",
    1: "#2d99ae",
    2: "#c9b150",
    3: "#e67e22",
    4: "#e74c3c",
    5: "#9b59b6"
}
const VALUES_COLOR = {
    0: "green",
    1: "#e74c3c"
}

const expressionConverter = async (trigger, hostid, templateid) => {
  let expression = trigger.expression;
  let hostName = "";

  if(hostid !== null) {
    hostName = (await hostService.getHost(hostid)).result[0].host;
  }
  else{
    hostName = (await templateService.getTemplateById(templateid)).result[0].host;
    console.log(hostName)
  }

  const param = trigger.functions.map(async (func, index) => {
    console.log(func)
    const item = await itemService.getItem(func.itemid);
    let parameter = func.parameter.split(",")[1];
    parameter = parameter ? "," + parameter : "";
    expression = expression.replace(`{${func.functionid}}`, `${func.function}(/${hostName}/${item.result[0].key_}${parameter})`)
  })
  await Promise.all(param)

  return expression
}




function Trigger() {
  const queryString = new URLSearchParams(useLocation().search);
  const [hostid, setHostid] = useState(() => {
    return queryString.get("hostid");
  });
  const [templateid, setTemplateid] = useState(() => {
    return queryString.get("templateid");
  });
  useEffect(() => {
    setHostid(queryString.get("hostid"));
  }, [queryString]);
  useEffect(() => {
    setTemplateid(queryString.get("templateid"));
  }, [queryString])

  const [dataSource, setDataSource] = useState([]);
  const [reload, setReload] = useState(false);
  const [isModalAddShow, setIsModalAddShow] = useState(false);
  const [isModalUpdateShow, setIsModalUpdateShow] = useState(false);
  const [isModalItemShow, setIsModalItemShow] = useState(false);
  const [items, setItems] = useState([]);

  const [hostName, setHostName] = useState("");
  const [templateName, setTemplateName] = useState("");

  const [selectedItem, setSelectedItem] = useState(() => {
    return {
      expression: '',
      itemid: '',
    }
  });


  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        let trigger = null
        if(hostid) {
          trigger = await triggerService.getTriggerByHost(hostid);
          const items = await itemService.getItemsByHost(hostid);
          setHostName((await hostService.getHost(hostid)).result[0].host)
          setItems(items.result) 
          console.log(items)
        } 
        else {
          trigger = await triggerService.getTriggerByTemplate(templateid);
          const items = await itemService.getItemByTemplate(templateid);
          setTemplateName((await templateService.getTemplateById(templateid)).result[0].host)
          setItems(items.result) 
        }
        console.log(trigger);
        const rs = trigger.result.map(async (item) => {
          const expression = await expressionConverter(item, hostid, templateid);
          return {
              ...item,
              key: item.triggerid,
              expression: expression
          }
      })
        setDataSource(await Promise.all(rs));
        setLoading(false);
    }
    fetchData();
  }, [hostid, reload, templateid]);

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
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: "10%",
        render: (value) => {
          return (
              <Tag style={{
              }} color={VALUES_COLOR[value]} key={value}>
                  {VALUES[value]}
              </Tag>
          )
        }
      },
    
    {
      title: "Name",
      dataIndex: "description",
      key: "description",
      render: (description, {event_name}) => {
        return (
          <Tooltip title={event_name}>
            <span>{description}</span>
          </Tooltip>
        );
      },
    },
    {
        title: "Expression",
        dataIndex: "expression",
        key: "expression",
        textWrap: "word-break",
        ellipsis: true,
        render: (expression) => {
            return (
                <Tooltip title={expression}>
                    <span className={styles.expression}>{expression}</span>
                </Tooltip>
            )
        }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status, {state}) => {
        if(state === '1') status = '2';
        return (
            <Tag color={status === "0" ? "green" : status === '1' ? "red" : "cyan"} key={status}>
                {status === "0" ? "Enabled" : status === '1' ? "Disabled" : "Unknown"}
            </Tag>
        )
      }
    },
    {
        title: "Severity",
        dataIndex: "priority",
        key: "priority",
        width: "10%",
        render: (priority) => {
          return (
              <>
                  <Tag color={PRIORITIES_COLOR[priority]} key={PRIORITIES[priority]}>
                      {PRIORITIES[priority]}
                  </Tag>
              </>
          )
        }
      },
      {
        title: "Info",
        dataIndex: "error",
        key: "error",
        align: "center",
        width: "64px",
        render: (error) => {
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
                setIsModalAddShow(true);
              }}
            ></Button>
          </Tooltip>
        ),
        align: "center",
        width: "64px",
        dataIndex: "action",
      },
  ];

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
        rowClassName={(record, index) => {
        }}
        title={() => "Items"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />
      
      <Drawer
        destroyOnClose={true}
        title="Add Item"
        open={isModalAddShow}
        width={536}
        onClose={() => setIsModalAddShow(false)}
        footer={null}
      >
        <Form
          name="addItem"
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
          onFinish={async (values) => {
            console.log(values);
            const res = await triggerService.addTrigger(values)
            if(res.error) {
              JSAlert.alert("Error", res.error.data);
              return
            }
            JSAlert.alert("Success", "Add trigger success");
            setReload(!reload);
            setIsModalAddShow(false);
          }}
          autoComplete="off"
        >
            <Form.Item
            label="Name"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Expression"
            name={"expression"}
            rules={[
              {
                required: true,
                message: "Please input expression!",
              },
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          <Drawer 
        destroyOnClose={true}
        title={`${items.length} Items of ${hostName?hostName:templateName}`}
        open={isModalItemShow}
        size="default"
        onClose={() => setIsModalItemShow(false)}
        footer={null}
        >
          <List
            size="large"
            bordered
            dataSource={items}
            renderItem={item => 
              <List.Item 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <h4>{item.name}</h4>
                <p>{`/${hostName?hostName:templateName}/${item.key_}`}</p>
              </List.Item>
            }
          />

          </Drawer>
          <Form.Item
            label="Severity"
            name={"priority"}
            rules={[
              {
                required: true,
                message: "Please input severity!",
              },
            ]}
          >
            <Select>
                <Select.Option value="0">Not classified</Select.Option>
                <Select.Option value="1">Information</Select.Option>
                <Select.Option value="2">Warning</Select.Option>
                <Select.Option value="3">Average</Select.Option>
                <Select.Option value="4">High</Select.Option>
                <Select.Option value="5">Disaster</Select.Option>
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button 
                color="#1890ff"
                onClick={() => setIsModalItemShow(true)}
              >
                Show Items
              </Button>
          </Space>
        </Form>
      </Drawer>

      <Drawer 
        destroyOnClose={true}
        title="Update Trigger"
        open={isModalUpdateShow}
        width={536}
        onClose={() => setIsModalUpdateShow(false)}
        footer={null}
      >
        <Form
          name="addItem"
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%" }}
          initialValues={{}}
          onFinish={async (values) => {
            console.log(values);
            const res = await triggerService.updateTrigger({...values, triggerid: selectedItem.triggerid})
            if(res.error) {
              JSAlert.alert("Error", res.error.data);
              return
            }
            JSAlert.alert("Success", "Update trigger success");
            setReload(!reload);
            setIsModalUpdateShow(false);
          }}
          autoComplete="off"
        >
            <Form.Item
            label="Name"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
            initialValue={selectedItem.description}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Expression"
            name={"expression"}
            rules={[
              {
                required: true,
                message: "Please input expression!",
              },
            ]}
            initialValue={selectedItem.expression}
          >
            <Input.TextArea/>
          </Form.Item>
          
          <Drawer 
        destroyOnClose={true}
        title={`${items.length} Items of ${hostName?hostName:templateName}`}
        open={isModalItemShow}
        size="default"
        onClose={() => setIsModalItemShow(false)}
        footer={null}
        >
          <List
            size="large"
            bordered
            dataSource={items}
            renderItem={item => 
              <List.Item 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <h4>{item.name}</h4>
                <p>{`/${hostName?hostName:templateName}/${item.key_}`}</p>
              </List.Item>
            }
          />

          </Drawer>
          <Form.Item
            label="Severity"
            name={"priority"}
            rules={[
              {
                required: true,
                message: "Please input severity!",
              },
            ]}
            initialValue={selectedItem.priority}
          >
            <Select>
                <Select.Option value="0">Not classified</Select.Option>
                <Select.Option value="1">Information</Select.Option>
                <Select.Option value="2">Warning</Select.Option>
                <Select.Option value="3">Average</Select.Option>
                <Select.Option value="4">High</Select.Option>
                <Select.Option value="5">Disaster</Select.Option>
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button 
                color="#1890ff"
                onClick={() => setIsModalItemShow(true)}
              >
                Show Items
              </Button>
          </Space>
        </Form>
      </Drawer >

      
      <Space>
        <Button
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await triggerService.disableTrigger(key);
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
              const response = await triggerService.enableTrigger(key);
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
              const response = await triggerService.deleteTrigger(key);
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
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          
          
        >
          Delete
        </Button>
        </Popconfirm>
        
          <Button
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
            const trigger = await triggerService.getTrigger(selectedRowKeys[0]);
            console.log(trigger);
            const expression = await expressionConverter(trigger.result[0], hostid, templateid);
            trigger.result[0].expression = expression
            setSelectedItem(trigger.result[0]);
            setIsModalUpdateShow(true);
          }}
        >
          Edit
        </Button>
        
      </Space>
    </>
  );
}

export default Trigger;
