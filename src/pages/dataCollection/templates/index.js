import {
  Button,
  Space,
  Table,
  Tooltip,
  Input,
  Form,
  Modal,
  Select,
  Tag,
  Popconfirm,
  Drawer,
} from "antd";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import JSAlert from "js-alert";
import { useEffect, useRef, useState } from "react";
import itemService from "services/itemService";
import templateService from "services/templateService";
import triggerService from "services/triggerService";

function Templates() {
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

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTemplates = async () => {
      const response = await templateService.getTemplates();
      console.log(response)
      const templates = response.result.map(async (template) => {
        const items = await itemService.getItemByTemplate(template.templateid);
        // if(items.result.length === 0) return undefined;
        const triggers = await triggerService.getTriggerByTemplate(
          template.templateid
        );
        return {
          key: template.templateid,
          name: template.name,
          item: items,
          triggers: triggers.result.length,
          vendor: template.vendor_name,
          version: template.vendor_version,
          templategroups: template.templategroups,
        };
      });
      const dataSource = await Promise.all(templates);
      setDataSource(dataSource.filter(Boolean));
      setLoading(false);
    };
    fetchTemplates();
  }, [reload]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Item",
      key: "item",
      render: ({ item, key }) => {
        if (!item) return <Tag color="#2ecc71">0</Tag>;
        return (
          <Space>
            <Tag color="#2ecc71">{item.result.length}</Tag>
            {/* <Link to={`/dataCollection/items?hostid=${item.result[0].hostid}`}>{"Item"}</Link> */}
            <Link to={`/dataCollection/items?templateid=${key}`}>Item</Link>
          </Space>
        );
      },
    },
    {
      title: "Triggers",
      dataIndex: "triggers",
      key: "triggers",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: () => (
        <Tooltip title="Add Item">
          <Button
            icon={<PlusOutlined />}
            onClick={async () => {
              await loadTreeDataTemplateGroup();
              setIsModalAddShow(true);
            }}
          ></Button>
        </Tooltip>
      ),
      dataIndex: "action",
    },
  ];

  const [isModalAddShow, setIsModalAddShow] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [treeDataTemplateGroup, setTreeDataTemplateGroup] = useState([]);

  const loadTreeDataTemplateGroup = async () => {
    const templateGroups = await templateService.getTemplateGroups();
    setTreeDataTemplateGroup(
      templateGroups.result.map((templateGroup) => {
        return {
          value: templateGroup.groupid,
          title: templateGroup.name,
        };
      })
    );
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        title="Edit Template"
        width={720}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose={true}
      >
        <Form
          name="editTemplate"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{}}
          onFinish={async (values) => {
            console.log(values)
            values.groups = values.groups.map((id) => {
              return {
                groupid: id,
              };
            });
            console.log(values);
            const response = await templateService.updateTemplate(selectedRowKeys[0], values);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              JSAlert.alert(
                "Update template thành công",
                "",
                JSAlert.Icons.Success
              );
              setReload(!reload);
              setOpen(false);
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item
            label="Template name"
            name={"host"}
            rules={[
              {
                required: true,
                message: "Please input template name",
              },
            ]}
            initialValue={dataSource.filter(template => template.key === selectedRowKeys[0])[0]?.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Template group"
            name={"groups"}
            rules={[
              {
                required: true,
                message: "Please input template group",
              },
            ]}
            initialValue={dataSource.filter(template => template.key === selectedRowKeys[0])[0]?.templategroups
              .map(group => {
                return group.groupid
              })}
            // initialValue={dataSource.filter(template => template.key === selectedRowKeys[0])[0]?.groups.map(group => {
            //   return {
            //     value: group.groupid,
            //     label: group.name,
            //   }
            // })}
          >
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              // defaultValue={
              //   selectedHost
              //     ? selectedHost.result[0].hostgroups.map((group) => {
              //         return {
              //           value: group.groupid,
              //           label: group.name,
              //         };
              //       })
              //     : []
              // }
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={treeDataTemplateGroup.map((group) => {
                return {
                  value: group.value,
                  label: group.title,
                };
              })}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button type="default" htmlType="reset">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        destroyOnClose={true}
        title="Add Template"
        open={isModalAddShow}
        onCancel={() => setIsModalAddShow(false)}
        footer={null}
        // onOk={async () => {

        // setIsModalAddHostShown(false);
        // }}
      >
        <Form
          name="addTemplate"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{}}
          onFinish={async (values) => {
            if (values.groups) {
              values.groups = values.groups.map((id) => {
                return {
                  groupid: id,
                };
              });
            }
            console.log(values)
            const response = await templateService.createTempalte(values);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              JSAlert.alert(
                "Thêm template thành công",
                "",
                JSAlert.Icons.Success
              );
              setReload(!reload);
              setIsModalAddShow(false);
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Template name"
            name={"host"}
            rules={[
              {
                required: true,
                message: "Please input template name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Template group"
            name={"groups"}
            rules={[
              {
                required: true,
                message: "Please input template group",
              },
            ]}
          >
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              // defaultValue={
              //   selectedHost
              //     ? selectedHost.result[0].hostgroups.map((group) => {
              //         return {
              //           value: group.groupid,
              //           label: group.name,
              //         };
              //       })
              //     : []
              // }
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={treeDataTemplateGroup.map((group) => {
                return {
                  value: group.value,
                  label: group.title,
                };
              })}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Table
        pagination={true}
        title={() => "Hosts"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />
      <Space>
        <Popconfirm
          title="Delete the selected templates?"
          description="This action cannot be undone."
          onConfirm={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await templateService.deleteTemplate(key);
              console.log(response);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setDataSource((preDataSource) =>
                  preDataSource.filter((item) => item.key !== key)
                );
              }
            });
            setSelectedRowKeys([]);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger disabled={selectedRowKeys.length > 0 ? false : true}>
            Delete
          </Button>
        </Popconfirm>
        <Button
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={async() => {
            if (selectedRowKeys.length > 1) {
              JSAlert.alert("Please select only one template");
              return;
            }
            if(treeDataTemplateGroup.length === 0)
              await loadTreeDataTemplateGroup();
            setOpen(true);
          }}
        >
          Edit
        </Button>
      </Space>
    </>
  );
}

export default Templates;
