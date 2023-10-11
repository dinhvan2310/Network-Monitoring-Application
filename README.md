- MIB là gì
  
        MIB là viết tắt của "Management Information Base" (Cơ sở thông tin quản lý).

        Trong ngữ cảnh của giao thức SNMP (Simple Network Management Protocol), MIB là một cấu trúc dữ liệu được sử dụng để mô tả thông tin quản lý của các thiết bị mạng.

        MIB định nghĩa các đối tượng (objects) mà hệ thống quản lý có thể truy vấn thông qua SNMP. Mỗi đối tượng trong MIB

        có một định danh duy nhất được gọi là Object Identifier (OID).

        Các OID được sắp xếp theo cấu trúc cây, tạo thành một hệ thống phân cấp.

        MIB chứa thông tin chi tiết về các thuộc tính, trạng thái và thông số khác của các thành phần trong một hệ thống mạng.

        Nó mô tả cú pháp và ý nghĩa của từng đối tượng, cho phép hệ thống quản lý truy cập và điều khiển các thiết bị mạng thông qua SNMP.

        Mỗi nhà sản xuất thiết bị mạng, như Cisco, Juniper, hoặc HP, cung cấp các tập tin MIB cho các sản phẩm của họ.

        Các tập tin MIB này chứa định nghĩa của các đối tượng mà SNMP có thể truy vấn và quản lý trên các thiết bị của nhà sản xuất đó.

        Các công cụ quản lý mạng, như SNMP Manager hoặc MIB Browser, sử dụng MIB để tạo ra các yêu cầu truy vấn và hiển thị thông tin từ các thiết bị mạng.

        Các tập tin MIB của mỗi nhà sản xuất thường đi kèm với phần mềm quản lý mạng của họ hoặc có thể tải xuống từ trang web hỗ trợ của nhà sản xuất.

        Chúng thường được cung cấp dưới dạng các tệp tin văn bản với định dạng chuẩn, nhưng được đặt phần mở rộng là ".mib" hoặc ".txt".

        Các tập tin MIB này cung cấp cho các công cụ quản lý mạng (như SNMP Manager hoặc MIB Browser) thông tin về cú pháp và ý nghĩa của các đối tượng (objects)

        mà SNMP có thể truy vấn và quản lý trên các thiết bị của nhà sản xuất đó. Thông qua tập tin MIB, các công cụ này có thể hiển thị danh sách các đối tượng,

        OID (Object Identifier) tương ứng và thuộc tính của chúng.

        Quản trị viên mạng có thể sử dụng các tập tin MIB này để truy vấn và thu thập thông tin từ các thiết bị mạng của nhà sản xuất tương ứng,

        cũng như để theo dõi và quản lý các thành phần mạng.

- CISCO-PROCESS_MIB

        CISCO-PROCESS-MIB là một MIB (Management Information Base) của Cisco được sử dụng để giám sát và quản lý quá trình (process)

        trong các thiết bị mạng Cisco thông qua SNMP (Simple Network Management Protocol).

        MIB này cung cấp các đối tượng (objects) và các thuộc tính liên quan đến quá trình (process) trong hệ thống Cisco,

        cho phép quản trị viên mạng thu thập thông tin về sử dụng CPU và bộ nhớ của các quá trình đang chạy trên thiết bị.

        Dưới đây là một số ví dụ về các đối tượng (objects) quan trọng trong CISCO-PROCESS-MIB:

        - cpmCPUTotal5minRev (.1.3.6.1.4.1.9.9.109.1.1.1.1.8): Đối tượng này cung cấp tỷ lệ sử dụng CPU trong 5 phút gần nhất trên thiết bị Cisco.

        - cpmCPUTotalPhysicalIndex (.1.3.6.1.4.1.9.9.109.1.1.1.1.2): Đối tượng này cung cấp danh sách các chỉ mục (index) của các CPU vật lý trên thiết bị.

        - cpmCPUTotalEntry (.1.3.6.1.4.1.9.9.109.1.1.1.1): Đối tượng này cung cấp thông tin chi tiết về sử dụng CPU của từng CPU trên thiết bị,

        bao gồm tỷ lệ sử dụng, thời gian sử dụng, thông tin về quá trình, ...

  ![Alt text](image.png)

  -  Video
    
    ![VIDEO](20231011-1020-03.0425121-1.mp4)
  

  

        Thông qua các đối tượng và thuộc tính trong CISCO-PROCESS-MIB, quản trị viên có thể theo dõi sử dụng CPU của các quá trình,
        xác định quá trình nào đang sử dụng nhiều CPU, kiểm tra tình trạng tải CPU trên thiết bị Cisco và thực hiện các biện pháp quản lý và điều chỉnh hợp lý. 

- Các thông tin cơ bản có thể nhận được từ SNMP
  
  
      Using SNMP, you can retrieve various types of information from a Cisco device. Here are some examples:

      1. System Information:
      - System description (sysDescr)
      - System name (sysName)
      - System location (sysLocation)
      - System contact (sysContact)
      - System uptime (sysUpTime)

      2. Interface Statistics:
      - Interface status (ifOperStatus)
      - Input/output bytes or packets on an interface (ifInOctets, ifOutOctets, ifInUcastPkts, ifOutUcastPkts, etc.)
      - Interface speed (ifSpeed)
      - Interface errors and discards (ifInErrors, ifOutErrors, ifInDiscards, ifOutDiscards)

      3. CPU and Memory Utilization:
      - CPU utilization (ciscoProcessCPU, cpmCPUTotal5minRev)
      - Memory utilization (ciscoMemoryPoolUsed)

      4. Network Routing and IP Addressing:
      - Routing table (ipRouteTable)
      - ARP table (ipNetToMediaTable)
      - IP address information (ipAdEntAddr, ipAdEntNetMask, ipAdEntIfIndex)

      5. VLAN Configuration and Trunking:
      - VLAN information (vlanTrunkPortDynamicStatus, vlanTrunkPortEncapsulationOperType)
      - Trunking status (dot1qTrunkPortStatus)

      6. Network Device Performance and Health:
      - Temperature (ciscoEnvMonTemperatureStatusValue)
      - Fan status (ciscoEnvMonFanStatusValue)
      - Power supply status (ciscoEnvMonSupplyStatusValue)
      - Interface bandwidth utilization (ifInOctets, ifOutOctets, ifSpeed)

      7. Network Security:
      - SNMP community strings (snmpCommunityTable)
      - Access control lists (ciscoAccessControlListName, ciscoAccessControlListAction)
      



## Tech Stack

**Client:** 

      - React, 
      - Antd, 
      - Axios, 
      - Classnames, 
      - Localforage, 
      - Match-sorter, 
      - React-router-dom,
      - Sass, 
      - Sort-by
      - Normalize.css

**Server:** 

      - Springboot, 
      - Hibernate


[
      {
            id, 
            deviceSettings: {
                  deviceName: R1,
                  deviceType: Router,
                  deviceIpv4: 192.168.137.1,
                  priority: 5,
                  timeout: 30s,
                  snmpVersion: 2c,
                  snmpCommunity: public,
                  snmpPort: 161,
            },
            deviceOIDs: [
                  {
                        deviceOIDValues: [
                              {
                                    date: 2021-08-10T12:00:00.000Z,
                                    value: R1
                              },
                              {
                                    date: 2021-08-10T12:00:00.000Z,
                                    value: R1
                              },
                              ...
                        ],
                        deviceOIDSettings: {
                              sensorName: sysName,
                              oidKey: .1.3.6.1.2.1.1.5.0,
                              priority: 5,
                              valueType: String,
                              unit: null,
                        }
                        childOID: [
                              {
                                    deviceOIDValues: [
                                          {
                                                date: 2021-08-10T12:00:00.000Z,
                                                value: R1
                                          },
                                          {
                                                date: 2021-08-10T12:00:00.000Z,
                                                value: R1
                                          },
                                          ...
                                    ],
                                    deviceOIDSettings: [
                                          sensorName: sysName,
                                          oidKey: .1.3.6.1.2.1.1.5.0,
                                          priority: 5,
                                          valueType: String,
                                          unit: null,
                                    ]
                              },
                              ...
                        ]
                  },
                  ...
            ]
      }
      , ...
]

Bảng devices:

| id (primary key)| device_name | device_type | device_ip      | timeout |
|-----------------|-------------|-------------|----------------|---------|
| 1               | R1          | Router      | 192.168.137.1  | 30s     |
| 2               | S1          | Switch      | 192.168.137.2  | 30s     |
| ...             | ...         | ...         | ...            | ...     |

Bảng device_oids:

| id (primary key) |device_id (foreign key)| oid_key            | oid_name   |
|-----------------|------------------------|--------------------|------------|
| 1               | 1                      | .1.3.6.1.2.1.1.5.0 | sysName    |
| 2               | 1                      | ...                | ...        |
| 3               | 2                      | ...                | ...        |
| ...             | ...                    | ...                | ...        |

Bảng oid_values:

| id (primary key)| device_oid_id (foreign key)| date                | value    |
|-----------------|----------------------------|---------------------|----------|
| 1               | 1                          | 2021-08-10T12:00:00Z| R1       |
| 2               | 1                          | ...                 | ...      |
| 3               | 2                          | ...                 | ...      |
| ...             | ...                        | ...                 | ...      |

Bảng child_oids:

| id (primary key)| device_oid_id (foreign key)| oid_key            | oid_name   |
|-----------------|----------------------------|--------------------|------------|
| 1               | 1                          | .1.3.6.1.2.1.1.1.0 | sysDescr   |
| 2               | 1                          | ...                | ...        |
| 3               | 2                          | ...                | ...        |
| ...             | ...                        | ...                | ...        |

Bảng child_oid_values:

| id (primary key)| device_oid_id (foreign key)| date                | value    |
|-----------------|----------------------------|---------------------|----------|
| 1               | 1                          | 2021-08-10T12:00:00Z| R1       |
| 2               | 1                          | ...                 | ...      |
| 3               | 2                          | ...                 | ...      |
| ...             | ...                        | ...                 | ...      |


// !Done
getAllDevices() -> http://localhost:8080/api/devices
      return {
            id,
            deviceName,
      }

// !Done
getDeviceById(id) -> http://localhost:8080/api/devices/{id}
      // return về DeviceEntity 
      return {
            id,
            deviceSettings: {
                  deviceName,
                  deviceType,
                  deviceIpv4,
                  priority,
                  timeout,
                  snmpVersion,
                  snmpCommunity,
                  snmpPort,
            },
            deviceOIDs: [
                  {
                        deviceOIDValues: [
                              {
                                    date,
                                    value,
                              },
                              {
                                    date,
                                    value,
                              },
                              ...
                        ],
                        deviceOIDSettings: {
                              sensorName,
                              oidKey,
                              priority,
                              valueType,
                              unit,
                        }
                        childOID: [
                              {
                                    deviceOIDValues: [
                                          {
                                                date,
                                                value,
                                          },
                                          {
                                                date,
                                                value,
                                          },
                                          ...
                                    ],
                                    deviceOIDSettings: [
                                          sensorName,
                                          oidKey,
                                          priority,
                                          valueType,
                                          unit,
                                    ]
                              },
                              ...
                        ]
                  },
                  ...
            ]
      }

// !Done
getDeviceSettingsById(id) -> http://localhost:8080/api/devices/{id}/settings
      // return DeviceSettings
      return {
            deviceName,
            deviceType,
            deviceIpv4,
            priority,
            timeout,
            snmpVersion,
            snmpCommunity,
            snmpPort,
      }

// !Done
getDeviceOIDsById(id) -> http://localhost:8080/api/devices/{id}/oids
      // return List DeviceOIDs
      return [
            {
                  deviceOIDValues: [
                        {
                              date,
                              value,
                        },
                        {
                              date,
                              value,
                        },
                        ...
                  ],
                  deviceOIDSettings: {
                        sensorName,
                        oidKey,
                        priority,
                        valueType,
                        unit,
                  }
                  childOID: [
                        {
                              deviceOIDValues: [
                                    {
                                          date,
                                          value,
                                    },
                                    {
                                          date,
                                          value,
                                    },
                                    ...
                              ],
                              deviceOIDSettings: [
                                    sensorName,
                                    oidKey,
                                    priority,
                                    valueType,
                                    unit,
                              ]
                        },
                        ...
                  ]
            },
            ...
      ]

// !Done
updateDeviceSettingsById(id, deviceSettings) -> http://localhost:8080/api/devices/{id}/settings
      // return DeviceSettings
      return {
            deviceName,
            deviceType,
            deviceIpv4,
            priority,
            timeout,
            snmpVersion,
            snmpCommunity,
            snmpPort,
      }

// !Done
updateDeviceOIDsById(id, deviceOIDs) -> http://localhost:8080/api/devices/{id}/oids
      // return DeviceOIDs
      return [
            {
                  deviceOIDValues: [
                        {
                              date,
                              value,
                        },
                        {
                              date,
                              value,
                        },
                        ...
                  ],
                  deviceOIDSettings: {
                        sensorName,
                        oidKey,
                        priority,
                        valueType,
                        unit,
                  }
                  childOID: [
                        {
                              deviceOIDValues: [
                                    {
                                          date,
                                          value,
                                    },
                                    {
                                          date,
                                          value,
                                    },
                                    ...
                              ],
                              deviceOIDSettings: [
                                    sensorName,
                                    oidKey,
                                    priority,
                                    valueType,
                                    unit,
                              ]
                        },
                        ...
                  ]
            },
            ...
      ]

! Done
deleteDeviceById(id) -> http://localhost:8080/api/devices/{id}
      return {
            id,
            deviceName,
      }

