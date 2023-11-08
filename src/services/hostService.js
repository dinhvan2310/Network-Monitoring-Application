const { default: httpRequests } = require("utils/httpRequests")

const hostService = {
    getHosts: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "hostids": `${hostid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getHostName: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "output": ["host"],
                "hostids": `${hostid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    disableHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.update",
            "params": {
                "hostid": `${hostid}`,
                "status": 1
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    enableHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.update",
            "params": {
                "hostid": `${hostid}`,
                "status": 0
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    deleteHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.delete",
            "params": [
                `${hostid}`,
            ],
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getHostInterfaces: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "hostinterface.get",
            "params": {
                "output": "extend",
                "hostids": `${hostid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    createHostGroup: async (name) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "hostgroup.create",
            "params": {
                "name": `${name}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    updateHostTemplates: async (hostid, template) => {
        console.log(template)
        console.log(hostid)
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.update",
            "params": {
                "hostid": `${hostid}`,
                "templates": [...template]
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    updateHostGroup: async (groupid, name) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "hostgroup.update",
            "params": {
                "groupid": `${groupid}`,
                "name": `${name}`
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    deleteHostGroup: async (groupid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "hostgroup.delete",
            "params": [
                `${groupid}`
            ],
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getHostsByGroup: async (groupid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "groupids": `${groupid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getHostGroups: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "hostgroup.get",
            "params": {
                
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
}

export default hostService