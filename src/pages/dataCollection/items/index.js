import { Button, Form, Input, Modal, Space, Table, Tag, Tooltip, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import JSAlert from "js-alert";
import { useEffect, useState } from "react";
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


function Items() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "History",
      dataIndex: "history",
      key: "history",
    },
    {
        title: "Trends",
        dataIndex: "trends",
        key: "trends",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
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

  
  useEffect(() => {
    setHostid(queryString.get("hostid"));
  }, [queryString])

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const items = await itemService.getItemsByHost(hostid);
        const dataTable = await Promise.all(items.result.map(async (template) => {
            return {
                key: template.itemid,
                name: template.name,
                key_: template.key_,
                interval: template.delay === "0" ? "" : template.delay,
                history: template.history,
                trends: template.trends,
                type: ItemType[template.type],
                status: template.state === "1"? <Tag color="#333">Not Support</Tag> : 
                (template.status === "0" ? <Tag color="#2ecc71">{"Enabled"}</Tag> : <Tag color="#e74c3c">Disabled</Tag>),
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
            console.log(await hostService.getHostInterfaces(hostid))
            values.interfaceid = (await hostService.getHostInterfaces(hostid)).result[0].interfaceid;
            console.log(values);
            const response = await itemService.createItem(values);
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
            name={"hostid"}
            initialValue={hostid}
            hidden={true}
          >
            <Input type="hidden"/>
          </Form.Item>
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
            initialValue={selectedItem ? selectedItem.key_ : ""}
          >
            <Input />
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
            <Input />
          </Form.Item>
          {(type == 0 || type == 3) && (
            <Form.Item
            label="Units"
            name={"units"}
            initialValue={selectedItem ? selectedItem.units : ""}
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
            initialValue={selectedItem ? selectedItem.history : ""}
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
            initialValue={selectedItem ? selectedItem.trends : ""}
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
        <Button
          type="primary"
          ghost
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
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
        >
          Delete
        </Button>
        <Button
          type="primary"
          danger
          ghost
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
            selectedRowKeys.forEach(async (key) => {
              const response = await itemService.clearHistoryAndTrends(key)
              console.log(response)
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setReload(!reload);
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Clear history and trends
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
