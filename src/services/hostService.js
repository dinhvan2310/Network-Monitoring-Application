const { default: httpRequests } = require("utils/httpRequests")

const hostService = {
    getHosts: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "selectHostGroups": "extend",
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
                "hostids": `${hostid}`,
                "selectHostGroups": "extend",
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getHostByName: async (host) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "filter": {
                    "host": [
                        `${host}`
                    ]
                },
                "selectHostGroups": "extend",
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    createHost: async (host) => {
        console.log(host)
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "host.create",
            "params": {
                "host": `${host.host}`,
                "interfaces": host.interfaces,
                "groups": host.groups,
                "templates": host.templates
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    updateHost: async (host) => {
    //     interfaces: [
    //   {
    //     type: 2,
    //     main: 1,
    //     useip: 1,
    //     ip: '192.168.1.123',
    //     dns: '',
    //     port: '161',
    //     details: { version: '2', bulk: 1, community: 'public' }
    //   }
    // ],
        // console.log({
        //     "jsonrpc": "2.0",
        //     "method": "host.update",
        //     "params": {
        //         "hostid": `${host.hostid}`,
        //         "host": `${host.host}`,
        //         "groups": host.groups,
        //         "templates": host.templates,
        //         "interfaces": host.interfaces,
        //     },
        //     auth: `${localStorage.getItem("token")}`,
        //     "id": 1
        // })
        let updateHost = {
            "jsonrpc": "2.0",
            "method": "host.update",
            "params": {
                "hostid": `${host.hostid}`,
                "host": `${host.host}`,
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        }
        if(host.groups){
            updateHost.params.groups = host.groups
        }
        if(host.templates){
            updateHost.params.templates = host.templates
        }
        console.log(updateHost)
        return httpRequests.post('', updateHost)
    },
    updateHostInterface: async (hostid, interfaceid, interfaceDetails) => {
        console.log(interfaceDetails)
        if(interfaceDetails.version === "2"){
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "hostinterface.update",
                "params": {
                    "interfaceid": `${interfaceid}`,
                    "hostid": `${hostid}`,
                    "ip": `${interfaceDetails.ip}`,
                    "port": `${interfaceDetails.port}`,
                    "details": {
                        "version": `${interfaceDetails.version}`,
                        "bulk": `${interfaceDetails.bulk}`,
                        "community": `${interfaceDetails.community}`
                    }
                },
                auth: `${localStorage.getItem("token")}`,
                "id": 1
            })
        }
        if(interfaceDetails.version === "3"){
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "hostinterface.update",
                "params": {
                    "interfaceid": `${interfaceid}`,
                    "hostid": `${hostid}`,
                    "ip": `${interfaceDetails.ip}`,
                    "port": `${interfaceDetails.port}`,
                    "details": {
                        "version": `${interfaceDetails.version}`,
                        "bulk": `${interfaceDetails.bulk}`,
                        "contextname": `${interfaceDetails.contextname}`,
                        "securityname": `${interfaceDetails.securityname}`,
                        "securitylevel": `${interfaceDetails.securitylevel}`,
                        "authprotocol": `${interfaceDetails.authprotocol}`,
                        "authpassphrase": `${interfaceDetails.authpassphrase}`,
                        "privprotocol": `${interfaceDetails.privprotocol}`,
                        "privpassphrase": `${interfaceDetails.privpassphrase}`
                    }
                },
                auth: `${localStorage.getItem("token")}`,
                "id": 1
            })
        }
        
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
    // host: 
    // interface: 
    
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
    getMacro: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "usermacro.get",
            "params": {
                "output": "extend",
                "hostids": `${hostid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    deleteMacro: async (macroId) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "usermacro.delete",
            "params": [
                `${macroId}`
            ],
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    addMacro: async (hostid, macro) => {
        console.log(macro)
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "usermacro.create",
            "params": {
                "hostid": `${hostid}`,
                "macro": `${macro.macro}`,
                "value": `${macro.value}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    }
}

export default hostService