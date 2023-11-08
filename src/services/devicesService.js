import localforage from "localforage";
import httpRequest from "utils/httpRequests";

const devicesService = {
    getAllDevices: async () => {
        try {
            return httpRequest.get("/devices")
        }
        catch (error) {
            console.log(error)
        }
    },
    addDevice: async (data) => {
        const device = {
            deviceSettings: {
                deviceName: data.deviceName,
                deviceType: data.deviceType,
                deviceIpv4: data.deviceIpv4,
                deviceIcon: data.deviceIcon,
                monitorStatus: true,
                priority: 5,
                snmpVersion: "v2c",
                snmpCommunity: data.snmpCommunity,
                snmpPort: data.snmpPort,
            },
            deviceOIDs: [

            ]
        }
        return httpRequest.post("/devices", device)
    },
    deleteDeviceById: async (id) => {
        try {
            return httpRequest.delete(`/devices/${id}`)
        }
        catch (error) {
            console.log(error)
        }
    },
    addDeviceOIDById: async (id, deviceOID) => {
        try{
            return httpRequest.post(`/devices/${id}/oids`, deviceOID)
        } catch(error){
            console.log(error)
        }
        
    },
    getDeviceOIDValueById: async (id, oidId) => {
        try{
            return httpRequest.get(`/devices/${id}/oids/${oidId}/values`)
        } catch(error){
            console.log(error)
        }
    },
    getDeviceSettingsById: async (id) => {
        try {
            return httpRequest.get(`/devices/${id}/settings`)
        }
        catch (error) {
            console.log(error)
        }
    },
    updateDeviceSettingsById: async (id, settings) => {
        try {
            return httpRequest.post(`/devices/${id}/settings`, settings)
        }
        catch (error) {
            console.log(error)
        }
    },
    getDeviceInfoById: async (id) => {
        try {
            return httpRequest.get(`/devices/${id}/info`)
        }
        catch (error) {
            console.log(error)
        }
    },
    setMonitorStatusById: async (id, status) => {
        try {
            const settings = await httpRequest.get(`/devices/${id}/settings`)
            settings.monitorStatus = status
            httpRequest.post(`/devices/${id}/settings`, settings)
        }
        catch (error) {
            console.log(error)
        }
    },
    getAllDeviceOIDById: async (id) => {
        try{
            return httpRequest.get(`/devices/${id}/oids`)
        } catch(error){
            console.log(error)
        }
    },
    deleteDeviceOIDById: async (id, oidId) => {
        try{
            return httpRequest.delete(`/devices/${id}/oids/${oidId}/values`)
        } catch(error){
            console.log(error)
        }
    }

}

export default devicesService;
