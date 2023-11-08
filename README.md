getAllDevices() -> GET: http://localhost:8080/api/devices
      // trả về List DeviceEntity
      return {
            
      }

addDevice(deivce) -> POST: http://localhost:8080/api/devices
      // body param: , id cho 0, tạo mới id, UUID.randomUUID().toString()
      // return về DeviceEntity mới tạo
getDeviceById(id) -> GET: http://localhost:8080/api/devices/{id}
      // return về DeviceEntity

getDeviceSettingsById(id) -> GET: http://localhost:8080/api/devices/{id}/settings
      // return DeviceSettings
updateDeviceSettingsById(id, deviceSettings) -> PUT: http://localhost:8080/api/devices/{id}/settings
      // body param: deviceSettings
      // return DeviceSettings

getDeviceOIDsById(id) -> GET: http://localhost:8080/api/devices/{id}/oids
      // return List DeviceOIDs
addDeviceOIDsById(id, deviceOID) -> POST: http://localhost:8080/api/devices/{id}/oids
      // body param: deviceOID
      // return deviceOID
deleteDeviceOIDsById(id, deviceOID) -> DELETE: http://localhost:8080/api/devices/{id}/oids/{oidId}
      // return DeviceOID

getDeviceOIDSettingsById(id, oidId) -> GET: http://localhost:8080/api/devices/{id}/oids/{oidId}/settings
      // return DeviceOIDSettings
updateDeviceOIDSettingsById(id, oidId, deviceOIDSettings) -> PUT: http://localhost:8080/api/devices/{id}/oids/{oidId}/settings
      // body param: deviceOIDSettings
      // return DeviceOIDSettings

getDeviceOIDValuesById(id, oidId, from, to) -> GET: http://localhost:8080/api/devices/{id}/oids/{oidId}/values?from={from}&to={to}
      // from, to: yyyy-MM-dd, query param
      // lấy dữ liệu từ from đến to
      // return List DeviceOIDValues
generateDeviceOIDValuesById(id, oidId) -> POST: http://localhost:8080/api/devices/{id}/oids/{oidId}/values
      // bên server tự gọi snmp lấy giá trị và lưu vào db sao đó trả về phần tử đầu tiên trong DeviceOIDValues
      // return DeviceOIDValues.GetFirst()

getDeviceOIDChildOIDsById(id, oidId) -> GET: http://localhost:8080/api/devices/{id}/oids/{oidId}/childoids
      // return List DeviceOIDs
getDeviceOIDCHildOIDById(id, oidId, childOidId) -> GET: http://localhost:8080/api/devices/{id}/oids/{oidId}/childoids/{childOidId}
      // return DeviceOID
addDeviceOIDChildOIDsById(id, oidId, deviceOID) -> POST: http://localhost:8080/api/devices/{id}/oids/{oidId}/childoids
      // body param: deviceOID
      // return deviceOID
deleteDeviceOIDChildOIDsById(id, oidId, childOidId) -> DELETE: http://localhost:8080/api/devices/{id}/oids/{oidId}/childoids/{childOidId}
      // return DeviceOID

deleteDevice(id) -> DELETE: http://localhost:8080/api/devices/{id}
      // return DeviceEntity












[
      {
            _id,                                
            deviceSettings: {
                  deviceName: R1,
                  deviceType: Router,
                  deviceIpv4: 192.168.137.1,
                  deviceIcon: ,
                  monitorStatus: true,
                  priority: 5,
                  snmpVersion: v2c,
                  snmpCommunity: public,
                  snmpPort: 161,
            },
            deviceOIDs: [
                  {
                        deviceOIDId,           // int auto increment (0 ->)
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
                              pause: false,
                              unit: null,
                        }
                        childDeviceOID: [
                              {
                                    deviceChildOIDId,           // int auto increment (0 ->)
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
                                          pause: false,
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

// !Done
getAllDevices() -> GET: http://localhost:8080/api/devices
      // trả về {id, deviceName}, tạo model mới để trả về 
      return {
            id,
            deviceName,
      }

// param device = deviceEntity
addDevice(device) -> POST: http://localhost:8080/api/devices
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
                        ],
                        deviceOIDSettings: {
                              sensorName,
                              oidKey,
                              priority,
                              pause,
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
                                          pause,
                                    ]
                              },
                        ]
                  },
            ]
      }

// !Done
getDeviceById(id) -> GET: http://localhost:8080/api/devices/{id}
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

