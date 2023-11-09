import { Button, Modal, Space, Table, Tag, Tooltip, TreeSelect } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import JSAlert from "js-alert";
import { useEffect, useState } from "react";
import hostService from "services/hostService";
import templateService from "services/templateService";

function Hosts() {
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
        <Tooltip title="Add User">
          <Button
            icon={<AppstoreAddOutlined />}
            onClick={() => {
              setIsModalAddHostShown(true);
            }}
          ></Button>
        </Tooltip>
      ),
      dataIndex: "action",
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      const hosts = await hostService.getHosts();
      const hostInterfaces = hosts.result.map(async (host) => {
        const hostInterfaces = await hostService.getHostInterfaces(host.hostid);
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
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const [treeData, setTreeData] = useState([]);
  return (
    <>
      <Modal
        open={isModalAddHostShown}
        onCancel={() => setIsModalAddHostShown(false)}
        onOk={async () => {
          const response = await hostService.createHost({
            host: "test",
            interfaces: [
              {
                type: 2,
                main: 1,
                useip: 1,
                ip: "192.168.137.3",
                dns: "",
                port: "161",
                details: {
                  version: 2,
                  bulk: 1,
                  community: "public",
                },
              },
            ],
            groups: [
              {
                groupid: "2",
              },
            ],
            templates: [
              {
                templateid: "10001",
              },
            ],
          });
          if(response.error){
            JSAlert.alert(response.error.data, response.error.message);
          }else{
            JSAlert.alert("Create host successfully");
          }
          setIsModalAddHostShown(false);
        }}
      >
        <h1>Modal add host</h1>
      </Modal>
      <Modal
        open={isModalShown}
        onCancel={() => setIsModalShown(false)}
        onOk={async () => {
          const host = await hostService.getHost(selectedRowKeys[0]);
          console.log(selectedRowKeys);
          console.log(host);
          const templates = await templateService.getTemplatesByHost(
            selectedRowKeys[0]
          );
          const template = await templateService.getTemplatesByHost(
            selectedRowKeys[0]
          );
          console.log(template);
          const templateids = template.result.map(
            (template) => template.templateid
          );
          console.log(templateids);
          console.log(value);
          console.log([...templateids, value]);
          const response = await hostService.updateHostTemplates(
            selectedRowKeys[0],
            [...templateids, value]
          );
          if (response.error) {
            JSAlert.alert(response.error.data, response.error.message);
          } else {
          }
          setIsModalShown(false);
          setSelectedRowKeys([]);
        }}
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
          treeData={treeData}
        />
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
        <Button
          type="default"
          ghost
          danger
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
            const templateGroups = await templateService.getTemplateGroups();
            console.log(templateGroups);
            const treeDataTemp = templateGroups.result.map(
              async (templateGroup) => {
                const templates =
                  await templateService.getTemplatesByTemplateGroup(
                    templateGroup.groupid
                  );
                console.log(templates);
                return {
                  disabled: true,
                  title: templateGroup.name,
                  value: templateGroup.groupid,
                  children: templates.result.map((template) => {
                    return {
                      isLeaf: true,
                      title: template.name,
                      value: template.templateid,
                    };
                  }),
                };
              }
            );
            console.log(await Promise.all(treeDataTemp));
            setTreeData(await Promise.all(treeDataTemp));

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
