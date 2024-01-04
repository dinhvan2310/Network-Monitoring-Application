import { Button, Form, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip, message, Drawer } from "antd";
import Highlighter from 'react-highlight-words';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import JSAlert from "js-alert";
import { useEffect, useRef, useState } from "react";
import templateService from "services/templateService";

function TemplateGroups() {
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

  const [reload, setReload] = useState(false);


  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchTemplateGroups = async () => {
      setLoading(true);
      const templateGroups = await templateService.getTemplateGroups();
      console.log(templateGroups);
      const response = templateGroups.result.map(async (templateGroup) => {
        const templates = await templateService.getTemplatesByTemplateGroup(
          templateGroup.groupid
        );
        console.log(templates);
        return {
          key: templateGroup.groupid,
          name: templateGroup.name,
          templates: templates.result,
        };
      });
      const templateGroupsData = await Promise.all(response);
      console.log(templateGroupsData);
      setDataSource(templateGroupsData);
      setLoading(false);
    };
    fetchTemplateGroups();
  }, [reload]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Templates",
      dataIndex: "templates",
      key: "templates",
      render: (templates) => {
        return (
          <Space>
            <Tag color="#2ecc71">{templates.length}</Tag>
            <Space wrap={true}>
              {templates.map((template) => template.name + ", ")}
            </Space>
          </Space>
        );
      },
    },
    {
      title: () => (
        <Tooltip title="Add Template Group">
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

  return (
    <>
      <Modal
        destroyOnClose={true}
        title="New Template Group"
        open={isModalOpen}
        onOk={() => {}}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          name="addTemplateGroup"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          onFinish={async (values) => {
            const response = await templateService.createTempalteGroup(values.groupName)
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              JSAlert.alert("Template group created successfully.");
              setReload(!reload);
              setIsModalOpen(false);
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item
            label="Group Name"
            name="groupName"
            rules={[
              {
                required: true,
                message: "Please input your group name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" htmlType="reset">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        destroyOnClose={true}
        title="Edit Template Group"
        width={536}
        open={isModalEditOpen}
        onOk={() => {}}
        footer={null}
        onClose={() => {
          setIsModalEditOpen(false);
        }}
      >
        <Form
          name="editTemplateGroup"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          onFinish={async (values) => {
            const response = await templateService.updateTemplateGroup(selectedRowKeys[0], values.groupName)
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              JSAlert.alert("Template group edit successfully.");
              const templates = dataSource.filter(templateGroup => {
                console.log(templateGroup.key, selectedRowKeys[0]);
                return templateGroup.key === selectedRowKeys[0]
              })[0].templates;
              setDataSource(preDataSource => {
                return preDataSource.map(templateGroup => {
                  if(templateGroup.key === selectedRowKeys[0]) {
                    return { key: response.result.groupids[0], name: values.groupName, templates: templates }
                  }
                  return templateGroup;
                })
              });
              setSelectedRowKeys([]);
              setIsModalEditOpen(false);
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item
            label="Group Name"
            name="groupName"
            initialValue={(dataSource.filter(templateGroup => templateGroup.key === selectedRowKeys[0]) || [])[0]?.name}
            rules={[
              {
                required: true,
                message: "Please input your group name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" htmlType="reset">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <Table
        title={() => <h2>Template Groups</h2>}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />

      <Space>
        <Popconfirm
          title="Delete the selected template groups?"
          description="This action cannot be undone."
          onConfirm={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await templateService.deleteTemplateGroup(key);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setDataSource(preDataSource => {
                  return preDataSource.filter(templateGroup => templateGroup.key !== key)
                });
              }
            });
            setSelectedRowKeys([]);
          }}
          onCancel={(e) => {
            message.error("Canceled deleting template groups.");
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
            onClick={() => {
              if(selectedRowKeys.length > 1) {
                JSAlert.alert("Please select only one template group to edit.");
                return;
              }
              setIsModalEditOpen(true);
              // setSelectedRowKeys([]);
            }}
            disabled={selectedRowKeys.length > 0 ? false : true}
          >
            Edit
          </Button>
      </Space>

    </>
  );
}

export default TemplateGroups;
