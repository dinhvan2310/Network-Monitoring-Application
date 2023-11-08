import { Alert, Button, Form, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip, message } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import hostService from "services/hostService";
import JSAlert from "js-alert";

function HostGroups() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHostGroups = async () => {
      setLoading(true);
      const hostGroups = await hostService.getHostGroups();
      const result = hostGroups.result.map(async (hostGroup) => {
        const hosts = await hostService.getHostsByGroup(hostGroup.groupid);
        return {
          groupid: hostGroup.groupid,
          name: hostGroup.name,
          hosts: hosts.result,
        };
      });
      const hostGroupsData = await Promise.all(result);
      setDataSource(
        hostGroupsData.map((hostGroup) => {
          return {
            key: hostGroup.groupid,
            name: hostGroup.name,
            hosts: hostGroup.hosts,
            action: hostGroup,
          };
        })
      );
      setLoading(false);
    };
    fetchHostGroups();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hosts",
      dataIndex: "hosts",
      key: "hosts",
      render: (hosts) => {
        return (
          <Space direction="horizontal">
            <Tag color="#2ecc71">
              {hosts.length}
            </Tag>
            <Space
              direction="horizontal"
              style={{
                width: "100%",
              }}
            >
              {hosts.map((host) => {
                return <Alert message={host.name} type="success" />;
              })}
            </Space>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (hostGroup) => {
        console.log(hostGroup);
        return (
          <Space direction="horizontal">
            <Tag color="#f1c40f" onClick={() => {
              setSelectedHostGroup({id: hostGroup.key, name: hostGroup.name});
              setIsModalUpdateOpen(true);
            }}
              style={{cursor: "pointer"}}
            >Edit</Tag>
          </Space>
        );
      },
    },
    {
      title: () => (
        <Tooltip title="Create Host Group">
          <Button
            icon={<FolderAddOutlined />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          ></Button>
        </Tooltip>
      ),
      dataIndex: "action",
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedHostGroup, setSelectedHostGroup] = useState(null);//{key: 1, name: "test", hosts: []}
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  return (
    <>
    <Modal
        title="Host Group"
        open={isModalUpdateOpen}
        onOk={() => {}}
        footer={null}
        onCancel={() => {
          setIsModalUpdateOpen(false);
        }}
      >
        <Form
          name="updateHostGroup"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={async (values) => {
            const response = await hostService.updateHostGroup(selectedHostGroup.id, values.groupName);
            if(response.error) {
              JSAlert.alert(response.error.data, response.error.message);
              return
            } else {
              setIsModalUpdateOpen(false);
              setDataSource(dataSource.map((hostGroup) => {
                if(hostGroup.key === selectedHostGroup.id) {
                  return {
                    key: selectedHostGroup.id,
                    name: values.groupName,
                    hosts: hostGroup.hosts
                  }
                } else {
                  return hostGroup
                }
              }))
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item style={{marginTop: "24px"}} label="Group Name" name="groupName" rules={[
              {
                required: true,
                message: "Please input your groupName!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" >Update</Button>
        </Form>
      </Modal>
      <Modal
        title="Create Host Group"
        open={isModalOpen}
        onOk={() => {}}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          name="createHostGroup"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={async (values) => {
            const response = await hostService.createHostGroup(values.groupName);
            if(response.error) {
              JSAlert.alert(response.error.data, response.error.message);
              return
            } else {
              setIsModalOpen(false);
              setDataSource([...dataSource, {key: response.result.groupids[0], name: values.groupName, hosts: []}])
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item style={{marginTop: "24px"}} label="Group Name" name="groupName" rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" >Add</Button>
        </Form>
      </Modal>
      <Table
        title={() => "Host Groups"}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowSelection={rowSelection}
      />
      <Popconfirm
        title="Delete the selected host groups?"
        description="This action cannot be undone."
        onConfirm={() => {
          selectedRowKeys.forEach(async (key) => {
            const response = await hostService.deleteHostGroup(key);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              setDataSource(dataSource.filter((host) => host.key !== key));
            }
          });
          setSelectedRowKeys([]);
        }}
        onCancel={(e) => {
          message.error("Canceled deleting host groups.");
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
        >
          Delete
        </Button>
      </Popconfirm>
    </>
  );
}

export default HostGroups;
