import localforage from "localforage";
import { startTransition } from "react";
import httpRequest from "utils/httpRequests"


export const getAllDevices = async () => {
    // try{
    //     const data = await httpRequest.get(`devices`)
    //     return data
    // }
    // catch(error){
    //     console.log(error)
    // }
    return [
        {
            id: "1",
            deviceName: "Router",
        },
        {
            id: "2",
            deviceName: "Switch",
        },
        {
            id: "3",
            deviceName: "Firewall",
        }
    ]
}

export const addDevice = async (device) => {
    try{
        const data = await httpRequest.post(`devices`, device)
        return data
    } catch(error){
        console.log(error)
    }
}

export const getDeviceById = async (id) => {
    // try{
    //     const data = await httpRequest.get(`devices/${id}`)
    //     return data
    // } catch(error){
    //     console.log(error)
    // }
    return {
        id: id,
        deviceSettings: {
              deviceName: "Router",
              deviceType: "Router",
              deviceIpv4: "192.168.137.1",
              priority: 5,
              timeout: 30,
              snmpVersion: "v2c",
              snmpCommunity: "public",
              snmpPort: 161,
        },
        deviceOIDs: [
              {
                    deviceOIDValues: [
                          
                    ],
                    deviceOIDSettings: {
                          sensorName: "CPU Load",
                          oidKey: ".1.3.6.1.4.1.9.9.109.1.1.1.1.5.1",
                          priority: 4,
                          valueType: "unsigned integer",
                          unit: "",
                    },
                    childOID: [
                          
                    ]
              },
              {
                    deviceOIDValues: [
                          
                    ],
                    deviceOIDSettings: {
                        sensorName: "System Up Time",
                        oidKey: ".1.3.6.1.2.1.1.3.0",
                        priority: 2,
                        valueType: "string",
                        unit: "",
                    },
                    childOID: [
                          
                    ]
              },
        ]
  }
}

export const updateDevice = async (id, device) => {
    try{
        const data = await httpRequest.put(`devices/${id}`, device)
        return data
    } catch(error){
        console.log(error)
    }
}

export const deleteDeviceById = async (id) => {
    try{
        const data = await httpRequest.delete(`devices/${id}`)
        return data
    } catch(error){
        console.log(error)
    }
}

export const getDeviceSettingsById = async (id) => {
    // try{
    //     const data = await httpRequest.get(`devices/${id}/settings`)
    //     return data
    // } catch(error){
    //     console.log(error)
    // }
    return {
        deviceName: "Router",
        deviceType: "Router",
        deviceIpv4: "192.168.137.1",
        priority: 5,
        timeout: 30,
        snmpVersion: "v2c",
        snmpCommunity: "public",
        snmpPort: 161,
  }
}

export const getDeviceOIDsById = async (id) => {
    // try{
    //     const data = await httpRequest.get(`devices/${id}/oids`)
    //     return data
    // } catch(error){
    //     console.log(error)
    // }
    return [
        {
            deviceOIDValues: [
                  {
                    date: "2021-09-01T00:00:00.000Z",
                    value: 1,
                  }
            ],
            deviceOIDSettings: {
                  sensorName: "CPU Load",
                  oidKey: ".1.3.6.1.4.1.9.9.109.1.1.1.1.5.1",
                  priority: 4,
                  valueType: "unsigned integer",
                  unit: "",
            },
            childOID: [
                  
            ]
      },
      {
        deviceOIDValues: [
            {
                date: "2021-09-01T00:00:00.000Z",
                value: "4 minutes 2 seconds (24200)",
              }
        ],
        deviceOIDSettings: {
              sensorName: "System Up Time",
              oidKey: ".1.3.6.1.2.1.1.3.0",
              priority: 2,
              valueType: "string",
              unit: "",
        },
        childOID: [
              
        ]
  },
    ]
    
}

export const updateDeviceSettingsById = async (id, settings) => {
    try{
        const data = await httpRequest.put(`devices/${id}/settings`, settings)
        return data
    } catch(error){
        console.log(error)
    }
}

export const updateDeviceOIDsById = async (id, oids) => {
    try{
        const data = await httpRequest.put(`devices/${id}/oids`, oids)
        return data
    } catch(error){
        console.log(error)
    }
}

