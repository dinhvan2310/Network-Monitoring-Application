import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  TreeSelect,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import JSAlert from "js-alert";
import { useEffect, useRef, useState } from "react";
import hostService from "services/hostService";
import templateService from "services/templateService";
import itemService from "services/itemService";
import { Link } from "react-router-dom";
import { key } from "localforage";

function Hosts() {
  //
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
      title: "Item",
      key: "item",
      render: ({ item, key }) => {
        if (!item) return <Tag color="#2ecc71">0</Tag>;
        return (
          <Space>
            <Tag color="#2ecc71">{item.result.length}</Tag>
            <Link to={`/dataCollection/items?hostid=${key}`}>{"Item"}</Link>
          </Space>
        );
      },
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
    {
      title: () => (
        <Tooltip title="Add Host">
          <Button
            icon={<PlusOutlined />}
            onClick={async () => {
              await loadTreeData();
              await loadTreeDataHostGroup();
              setIsModalAddHostShown(true);
            }}
          ></Button>
        </Tooltip>
      ),
      dataIndex: "action",
    },
  ];

  const validateIPAddress = (_, value, callback) => {
    // Regular expression pattern to match IPv4 address
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (value && !ipRegex.test(value)) {
      callback("Please enter a valid IPv4 address!");
    } else {
      callback();
    }
  };

  const loadTreeData = async () => {
    const templateGroups = await templateService.getTemplateGroups();
    const treeDataTemp = templateGroups.result.map(async (templateGroup) => {
      const templates = await templateService.getTemplatesByTemplateGroup(
        templateGroup.groupid
      );
      return {
        disabled: true,
        title: templateGroup.name,
        value: templateGroup.groupid,
        key: templateGroup.groupid,
        children: templates.result.map((template) => {
          return {
            isLeaf: true,
            title: template.name,
            key: template.templateid,
            value: template.templateid,
          };
        }),
      };
    });
    setTreeData(await Promise.all(treeDataTemp));
  };

  const [treeDataHostGroup, setTreeDataHostGroup] = useState([]);
  const loadTreeDataHostGroup = async () => {
    const hostGroups = await hostService.getHostGroups();
    const treeDataTemp = hostGroups.result.map((hostGroup) => {
      return {
        title: hostGroup.name,
        key: hostGroup.groupid,
        value: hostGroup.groupid,
      };
    });
    setTreeDataHostGroup(treeDataTemp);
  };

  const [version, setVersion] = useState(2);
  const [SMNPv3Version, setSMNPv3Version] = useState(1);
  const [reLoad, setReLoad] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setReLoad((pre) => !pre);
  }, [version]);

  const [dataSource, setDataSource] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);

      // const template3 = await templateService.getTemplatesByHost(10603)
      // console.log(template3)
      // const template2 = await templateService.getTemplatesByHost(10602)
      // console.log(template2)

      const hosts = await hostService.getHosts();
      console.log(hosts);

      const hostInterfaces = hosts.result.map(async (host) => {
        const hostInterfaces = await hostService.getHostInterfaces(host.hostid);
        console.log(await itemService.getItemsByHost(host.hostid));
        const item = await itemService.getItemsByHost(host.hostid);
        return {
          key: host.hostid,
          name: host.name,
          interfaces: hostInterfaces.result[0]
            ? hostInterfaces.result[0].ip +
              " : " +
              hostInterfaces.result[0].port
            : "",
          item: item,
          status: host.status,
          hostInterfaces: hostInterfaces,
          type: hostInterfaces.result[0] ? hostInterfaces.result[0].type : "",
        };
      });
      const hostsData = await Promise.all(hostInterfaces);
      setDataSource(hostsData);
      setLoading(false);
    };
    fetchDevices();
  }, []);

  const [loading, setLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isModalAddHostShown, setIsModalAddHostShown] = useState(false);
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

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const [treeData, setTreeData] = useState([]);
  return (
    <>
      <Modal
        title="Add host"
        open={isModalAddHostShown}
        onCancel={() => {
          setVersion(2);
          setSMNPv3Version(0);
          setIsModalAddHostShown(false)
        }}
        destroyOnClose={true}
        footer={null}
        // onOk={async () => {

        // setIsModalAddHostShown(false);
        // }}
      >
        <Form
          name="addhost"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{}}
          onFinish={async (values) => {
            let response;
            if (values.templateid) {
              response = await hostService.createHost({
                host: `${values.host}`,
                interfaces: [
                  {
                    type: 2,
                    main: 1,
                    useip: 1,
                    ip: `${values.ip}`,
                    dns: "",
                    port: `${values.port}`,
                    details: {
                      version: `${values.version}`,
                      bulk: 1,
                      community: `${values.community}`,
                    },
                  },
                ],
                groups: [
                  {
                    groupid: `${values.groupid}`,
                  },
                ],
                templates: [
                  {
                    templateid: `${values.templateid}`,
                  },
                ],
              });
            } else {
              response = await hostService.createHost({
                host: `${values.host}`,
                interfaces: [
                  {
                    type: 2,
                    main: 1,
                    useip: 1,
                    ip: `${values.ip}`,
                    dns: "",
                    port: `${values.port}`,
                    details: {
                      version: `${values.version}`,
                      bulk: 1,
                      community: `${values.community}`,
                    },
                  },
                ],
                groups: [
                  {
                    groupid: `${values.groupid}`,
                  },
                ],
              });
            }
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              JSAlert.alert("Create host successfully");
              setDataSource([
                ...dataSource,
                {
                  key: response.result.hostids[0],
                  name: values.host,
                  interfaces: values.ip + " : " + values.port,
                  status: 1,
                  item: await itemService.getItemsByHost(
                    response.result.hostids[0]
                  ),
                  hostInterfaces: {
                    result: [
                      {
                        available: 0,
                      },
                    ],
                  },
                  type: "2",
                },
              ]);
              setIsModalAddHostShown(false);
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
          <Form.Item label="Template" name={"templateid"}>
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={value}
              dropdownStyle={{ maxHeight: 1000, overflow: "auto" }}
              placeholder="Please select"
              allowClear
              // treeDefaultExpandAll
              onChange={onChange}
              treeData={treeData}
            />
          </Form.Item>
          <Form.Item
            label="Host group"
            name={"groupid"}
            rules={[
              {
                required: true,
                message: "Please input host group",
              },
            ]}
          >
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={value}
              dropdownStyle={{ maxHeight: 1000, overflow: "auto" }}
              placeholder="Please select"
              allowClear
              // treeDefaultExpandAll
              onChange={onChange}
              treeData={treeDataHostGroup}
            />
          </Form.Item>
          <Form.Item
            label="Ip address"
            name={"ip"}
            rules={[
              {
                required: true,
                message: "Please input ip address",
              },
              {
                validator: validateIPAddress,
                message: "Please input valid ip address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Port"
            name={"port"}
            initialValue={"161"}
            rules={[
              {
                required: true,
                message: "Please input port",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Snmp version"
            name={"version"}
            rules={[
              {
                required: true,
                message: "Please input snmp version",
              },
            ]}
            initialValue={version}
          >
            <Select
              style={{
                width: 120,
              }}
              onChange={(value) => {
                setVersion(value);
              }}
              options={[
                {
                  value: 2,
                  label: "SMNPv2",
                },
                {
                  value: 3,
                  label: "SMNPv3",
                },
              ]}
            />
          </Form.Item>
          {version === 2 ? (
            <Form.Item
              label="Community"
              name={"community"}
              initialValue={"public"}
              rules={[
                {
                  required: true,
                  message: "Please input snmp community",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : version === 3 ? (
            <>
              <Form.Item
                label="Security level"
                name={"securityLevel"}
                initialValue={SMNPv3Version}
              >
                <Select
                  style={{
                    width: 120,
                  }}
                  onChange={(value) => {
                    setSMNPv3Version(value);
                  }}
                  options={[
                    {
                      value: 0,
                      label: "noAuthNoPriv",
                    },
                    {
                      value: 1,
                      label: "authNoPriv",
                    },
                    {
                      value: 2,
                      label: "authPriv",
                    },
                  ]}
                />
              </Form.Item>
              {SMNPv3Version === 0 ? (
                <>
                  <Form.Item
                    label="Context name"
                    name={"contextName"}
                    initialValue={""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Security name"
                    name={"securityName"}
                    initialValue={""}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : null}
            </>
          ) : null}

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Modal
        open={isModalShown}
        onCancel={() => setIsModalShown(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="editHost"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          onFinish={async (values) => {
            console.log(values);
            let host = {
              hostid: `${selectedHost.result[0].hostid}`,
              host: `${values.host}`,
            };
            if (values.templateid) {
              host.templates = values.templateid.map((id) => {
                return {
                  templateid: id,
                };
              });
            }
            if (values.groupid) {
              host.groups = values.groupid.map((id) => {
                return {
                  groupid: id,
                };
              });
            }
            console.log(host);

            const response = await hostService.updateHost(host);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              JSAlert.alert("Update host successfully");
              setDataSource(
                dataSource.map((host) => {
                  if (host.key === selectedHost.result[0].hostid) {
                    host.name = values.host;
                  }
                  return host;
                })
              );
              setIsModalShown(false);
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            initialValue={selectedHost ? selectedHost.result[0].host : null}
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
          <Form.Item label="Template" name={"templateid"}>
            <TreeSelect
              showSearch
              multiple
              style={{ width: "100%" }}
              defaultValue={
                selectedHost
                  ? selectedHost.templates.result.map((template) => {
                      return template.templateid;
                    })
                  : []
              }
              dropdownStyle={{ maxHeight: 1000, overflow: "auto" }}
              placeholder="Please select"
              allowClear
              // treeDefaultExpandAll
              onChange={onChange}
              treeData={treeData}
            />
          </Form.Item>
          <Form.Item
            label="Host group"
            name={"groupid"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input host group",
            //   },
            // ]}
          >
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={
                selectedHost
                  ? selectedHost.result[0].hostgroups.map((group) => {
                      return {
                        value: group.groupid,
                        label: group.name,
                      };
                    })
                  : []
              }
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={treeDataHostGroup.map((group) => {
                return {
                  value: group.value,
                  label: group.title,
                };
              })}
            />
          </Form.Item>
          {/* <Form.Item
            label="Ip address"
            name={"ip"}
            rules={[
              {
                required: true,
                message: "Please input ip address",
              },
              {
                validator: validateIPAddress,
                message: "Please input valid ip address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Port"
            name={"port"}
            initialValue={"161"}
            rules={[
              {
                required: true,
                message: "Please input port",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Snmp version"
            name={"version"}
            rules={[
              {
                required: true,
                message: "Please input snmp version",
              },
            ]}
          >
            <Select
              // defaultValue={2}
              style={{
                width: 120,
              }}
              onChange={(value) => {
                setVersion(value);
              }}
              options={[
                {
                  value: 2,
                  label: "SMNPv2",
                },
                {
                  value: 3,
                  label: "SMNPv3",
                },
              ]}
            />
          </Form.Item>
          {version === 2 ? (
            <Form.Item
              label="Community"
              name={"community"}
              initialValue={"public"}
              rules={[
                {
                  required: true,
                  message: "Please input snmp community",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : version === 3 ? (
            <h1>Version3</h1>
          ) : null} */}

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
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
                setDataSource((preData) => {
                  return preData.filter((host) => host.key !== key);
                });
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Delete
        </Button>
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
            await loadTreeData();
            let hostSelected = await hostService.getHost(selectedRowKeys[0]);
            hostSelected.templates = await templateService.getTemplatesByHost(
              selectedRowKeys[0]
            );
            console.log(hostSelected);
            setSelectedHost(hostSelected);
            setValue(
              hostSelected.templates.result.map((template) => {
                return template.templateid;
              })
            );

            await loadTreeDataHostGroup();
            await loadTreeData();
            setIsModalShown(true);
          }}
        >
          Edit
        </Button>
      </Space>
    </>
  );
}

export default Hosts;
