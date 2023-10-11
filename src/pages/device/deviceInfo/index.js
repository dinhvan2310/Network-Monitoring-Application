import React, { useEffect } from "react";
import { Table } from "antd";
import { getSnmpData } from "services/snmpService";
import { useLoaderData, useParams } from "react-router-dom";
import { getDeviceSettingsById } from "services/devicesService";

function DeviceInfo() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  
  const id = useParams().id;
  useEffect(() => {
    async function fetchData() {
      const rs = await deviceInfoLoader();
      setData(rs);
    }
    fetchData();
  }, []);



  const deviceInfoLoader = async () => {
    setLoading(true);
    const rs = [];
    const deviceSettings = await getDeviceSettingsById(id);

    const ifNumber = (await getSnmpData(deviceSettings.deviceIpv4, ".1.3.6.1.2.1.2.1.0", "public")).data.value;
    const dataInfoInterface = []

    for(let i = 1; i <= ifNumber; i++) {
      dataInfoInterface.push({
        name: "MACAddress: " + (await getSnmpData(deviceSettings.deviceIpv4, `.1.3.6.1.2.1.2.2.1.2.${i}`, "public")).data.value,
        oid: `1.3.6.1.2.1.2.2.1.6.${i}`
      })
    }

    const dataInfoConfig = [
      {
        name: "sysName",
        oid: ".1.3.6.1.2.1.1.5.0",
      },
      {
        name: "sysDescr",
        oid: ".1.3.6.1.2.1.1.1.0",
      },
      {
        name: "sysLocation",
        oid: ".1.3.6.1.2.1.1.6.0"
      },
      {
        name: "sysObjectID",
        oid: ".1.3.6.1.2.1.1.2.0",
      },
      {
        name: "sysUpTime",
        oid: ".1.3.6.1.2.1.1.3.0",
      },
      {
        name: "sysServices",
        oid: ".1.3.6.1.2.1.1.7.0",
      },
      {
        name: "sysContact",
        oid: ".1.3.6.1.2.1.1.4.0"
      },
      ...dataInfoInterface
    ];
    for (const item of dataInfoConfig) {
      const data = await getSnmpData(deviceSettings.deviceIpv4, item.oid, "public");
      rs.push({
        name: item.name,
        data: data.data,
      });
    }
    setLoading(false);
    return rs;
  };



  const dataSource = data.map((item) => {
    return {
      key: item.name,
      name: item.name,
      value: item.data.value,
    };
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      
    />
  );
}

export default DeviceInfo;
