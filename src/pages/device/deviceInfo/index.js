import React, { useEffect } from 'react';
import { Table } from 'antd';
import { getSnmpData } from 'services/snmpService';
import { useLoaderData } from 'react-router-dom';

export const deviceInfoLoader = async ({params}) => {
  const rs = []
  const dataInfoConfig = [{
    name: 'sysName',
    oid: '.1.3.6.1.2.1.1.5.0'
  },
  {
    name: 'sysDescr',
    oid: '.1.3.6.1.2.1.1.1.0'
  },
  {
    name: 'sysObjectID',
    oid: '.1.3.6.1.2.1.1.2.0'
  },
  {
    name: 'sysUpTime',
    oid: '.1.3.6.1.2.1.1.3.0'
  },
  {
    name: 'sysServices',
    oid: '.1.3.6.1.2.1.1.7.0'
  }
]
for (const item of dataInfoConfig) {
  const data = await getSnmpData(params.ip, item.oid, 'public');
  rs.push({
    name: item.name,
    data: data.data
  });
}
  return rs
}

function DeviceInfo() {
    const data = useLoaderData()
    
    const dataSource = data.map((item) => {
      console.log()
      return {
        key: item.name,
        name: item.name,
        value: item.data.value
      }
    })
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
        },
        
      ];
    
    return ( <Table pagination={false} dataSource={dataSource} columns={columns} /> )
}

export default DeviceInfo;