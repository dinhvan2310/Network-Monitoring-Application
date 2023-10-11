import React, { useEffect, useState } from "react";
import { Table, Dropdown, Space, Rate } from "antd";
import {
  MenuOutlined,
  PauseOutlined,
  CaretRightOutlined,
  RedoOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { getDeviceById, getDeviceOIDsById } from "services/devicesService";
import { getSnmpData } from "services/snmpService";

export const loaderDeviceOverview = async() => {

}

const DeviceOverview = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = useParams().id;
  const items = [
    {
      label: (
        <Space>
          <PlusOutlined />
          <Link to={`/devices/${id}/addsensor`}>Add Sensor</Link>
        </Space>
      ),
      key: "addsensor",
    },
    {
      label: (
        <Space>
          <PauseOutlined />
          <span>Pause</span>
        </Space>
      ),
      key: "pause",
    },
    {
      label: (
        <Space>
          <CaretRightOutlined />
          <span>Resume</span>{" "}
        </Space>
      ),
      key: "resume",
    },
    {
      label: (
        <Space>
          <RedoOutlined />
          <span>Scan Now</span>{" "}
        </Space>
      ),
      key: "scannow",
    },
  ];
  
  const onClick = ({ key }) => {
    if(key === 'scannow')
    {
      setCountdown(30)
      setRenderCount(prevRenderCount => prevRenderCount + 1);
    }
  };
  
  const columns = [
    {
      title: "Pos",
      dataIndex: "pos",
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
      title: "Value",
      dataIndex: "value",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => <Rate value={priority} disabled={true} />,
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
    },
  ];

  const [data, setData] = useState({});
  const [dataSource, setDataSource] = useState([]);

  const [countdown, setCountdown] = useState(30);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(30)
      setRenderCount(prevRenderCount => prevRenderCount + 1);
    }
  }, [countdown]);

  


  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      setLoading(true);
      const data = await getDeviceById(id)
      setData(data);

      console.log(data)

      const oids = []
      data.deviceOIDs.forEach(element => {
        oids.push(element.deviceOIDSettings.oidKey)
      });

      const snmpValues = []
      for (const iterator of oids) {
        snmpValues.push(await getSnmpData(data.deviceSettings.deviceIpv4, iterator, data.deviceSettings.snmpCommunity)) 
      }
      console.log(snmpValues)

      const dataSource = []
      data.deviceOIDs.forEach((element, index) => {
      dataSource.push({
        pos: index,
        sensor: element.deviceOIDSettings.sensorName,
        status: "UP",
        message: "OK",
        value: snmpValues[index].data.value,
        priority: element.deviceOIDSettings.priority,
      })
      })
      console.log(dataSource)
      setDataSource(dataSource);
      setLoading(false);
    };
    fetchData();
  }, [renderCount])




  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {countdown}
        </span>
      </div>

      <Table  columns={columns} dataSource={dataSource}  loading={loading}/>
    </div>
  );
};
export default DeviceOverview;
