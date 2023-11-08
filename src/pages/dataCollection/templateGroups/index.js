import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import JSAlert from "js-alert";
import { useEffect, useState } from "react";
import hostService from "services/hostService";
import templateService from "services/templateService";

function TemplateGroups() {
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
  }, []);

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
  ];

  return (
    <>
      <Table
        title={() => <h2>Template Groups</h2>}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />

      <Popconfirm
        title="Delete the selected template groups?"
        description="This action cannot be undone."
        onConfirm={() => {
          selectedRowKeys.forEach(async (key) => {
            const response = await templateService.deleteTemplateGroup(key);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              setDataSource(
                dataSource.filter((templateGroup) => {
                  return templateGroup.key !== key;
                })
              );
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
    </>
  );
}

export default TemplateGroups;
