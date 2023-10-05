import React, { useState } from "react";
import { Table, Dropdown, Space } from "antd";
import {MenuOutlined, PauseOutlined, CaretRightOutlined, RedoOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom"


const DeviceOverview = () => {

  const url = useLocation().pathname;

  const ip = url.split("/")[2];

const item = [
    {
        label: (<Space><PauseOutlined /><span>Pause</span></Space>),
        key: "pause",
    },
    {
        label: (<Space><CaretRightOutlined /><span>Resume</span> </Space>),
        key: "resume",
    },
    {
        label: (<Space><RedoOutlined /><span>Scan Now</span> </Space>),
        key: "scannow",
    },
    {
        label: (<Space><DeleteOutlined /><span>Delete</span> </Space>),
        key: "delete",
    }
]
const items = [
    {
        label: (<Space><PlusOutlined /><Link to={`/devices/${ip}/addsensor`}>Add Sensor</Link></Space>),
        key: "addsensor",
    },
    {
        label: (<Space><PauseOutlined /><span>Pause</span></Space>),
        key: "pause",
    },
    {
        label: (<Space><CaretRightOutlined /><span>Resume</span> </Space>),
        key: "resume",
    },
    {
        label: (<Space><RedoOutlined /><span>Scan Now</span> </Space>),
        key: "scannow",
    },
    {
        label: (<Space><DeleteOutlined /><span>Delete</span> </Space>),
        key: "delete",
    }
]

const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

const columns = [
  {
    title: "Pos",
    dataIndex: "pos",
    multiple: 1,
    sorter: (a, b) => a.pos - b.pos,
  },
  {
    title: "Sensor",
    dataIndex: "sensor",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Message",
    dataIndex: "message",
  },
  {
    title: "Priority",
    dataIndex: "priority",
  },
  {
    title: (
        <Dropdown
          menu={{
            items,
            onClick,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
            <MenuOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <Dropdown
        menu={{
          item,
          onClick,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
          <MenuOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
  },
];
const data = [];
for (let i = 1; i < 46; i++) {
  data.push({
    pos: i,
    sensor: i,
    status: `Edward King ${i}`,
    message: 32,
    priority: `London, Park Lane no. ${i}`,
  });
}
  

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <Table  columns={columns} dataSource={data} />
  );
};
export default DeviceOverview;
