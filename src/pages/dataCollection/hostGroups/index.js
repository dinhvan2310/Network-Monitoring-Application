import { Alert, Button, Form, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip, message } from "antd";
import Highlighter from 'react-highlight-words';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import hostService from "services/hostService";
import JSAlert from "js-alert";

function HostGroups() {
  //
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
      ...getColumnSearchProps('name'),
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
            icon={<PlusOutlined />}
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
  const [selectedHostGroup, setSelectedHostGroup] = useState(() => {
    return {
      name: "",
    }
  });//{key: 1, name: "test", hosts: []}
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  return (
    <>
    <Modal
    destroyOnClose={true}
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
              JSAlert.alert("Host group updated successfully.");
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
            ]}
            initialValue={selectedHostGroup.name}
            >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" >Update</Button>
        </Form>
      </Modal>
      <Modal
      destroyOnClose={true}
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
              JSAlert.alert("Host group created successfully.");
              setDataSource([...dataSource, {key: response.result.groupids[0], name: values.groupName, hosts: []}])
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item style={{marginTop: "24px"}} label="Group Name" name="groupName" rules={[
              {
                required: true,
                message: "Please input your group name!",
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
              setDataSource(preDataSource => preDataSource.filter(hostGroup => hostGroup.key !== key))
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
