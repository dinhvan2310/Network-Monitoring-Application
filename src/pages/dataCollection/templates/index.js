import { Button, Space, Table } from "antd";
import JSAlert from "js-alert";
import { useEffect, useState } from "react";
import itemService from "services/itemService";
import templateService from "services/templateService";
import triggerService from "services/triggerService";

function Templates() {
  useEffect(() => {
    setLoading(true);
    const fetchTemplates = async () => {
      const response = await templateService.getTemplates();
      console.log(response);
      const templates = response.result.map(async (template) => {
        const items = await itemService.getItemByTemplate(template.templateid);
        const triggers = await triggerService.getTriggerByTemplate(
          template.templateid
        );
        return {
          key: template.templateid,
          name: template.name,
          items: items.result.length,
          triggers: triggers.result.length,
          vendor: template.vendor_name,
          version: template.vendor_version,
        };
      });
      const dataSource = await Promise.all(templates);
      setDataSource(dataSource);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
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
  ];
  const [dataSource, setDataSource] = useState([]);

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
        pagination={true}
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
              const response = await templateService.deleteTemplate(key);
              console.log(response);
              if (response.error) {
                JSAlert.alert(response.error.data, response.error.message);
              } else {
                setDataSource(
                    dataSource.filter((template) => template.key !== key)
                );
              }
            });
            setSelectedRowKeys([]);
          }}
        >
          Delete
        </Button>
      </Space>
    </>
  );
}

export default Templates;
