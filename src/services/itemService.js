import httpRequests from "utils/httpRequests"

const itemService = {
    getItems: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "filter": {
                    // "type": [20, 5],
                }
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getItemByName: async (name) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "search": {
                    "name": `${name}`,
                },
                "filter": {
                    // "type": [20, 5],
                }
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getItem: async (itemid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "itemids": `${itemid}`,
                "filter": {
                    // "type": [20, 5],
                }
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getItemsByHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "hostids": Array.isArray(hostid)? [...hostid] :`${hostid}`,
                "filter": {
                    // "type": [20, 5],
                }
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getItemByTemplate: async (templateid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "templateids": `${templateid}`,
                "filter": {
                    // "type": [20, 5],
                }
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    createItem: async (item) => {
        if(item.value_type == '0' || item.value_type == '3'){
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "item.create",
                "params": {
                    "name": `${item.host}`,
                    "key_": `${item.key_}`,
                    "interfaceid": `${item.interfaceid}`,
                    "hostid": `${item.hostid}`,
                    "type": 20,
                    "value_type": `${item.value_type}`,
                    "delay": `${item.delay}`,
                    "history": `${item.history}`,
                    "trends": `${item.trends}`,
                    "snmp_oid": `${item.snmp_oid}`,
                    "units": `${item.units}`,
                    "description": `${item.description}`,
                },
                "auth": `${localStorage.getItem("token")}`,
                "id": 1
            })
        }else{
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "item.create",
                "params": {
                    "hostid": `${item.hostid}`,
                    "name": `${item.host}`,
                    "key_": `${item.key_}`,
                    "interfaceid": `${item.interfaceid}`,
                    "type": 20,
                    "value_type": `${item.value_type}`,
                    "delay": `${item.delay}`,
                    "history": `${item.history}`,
                    "trends": `${item.trends}`,
                    "snmp_oid": `${item.snmp_oid}`,
                    "description": `${item.description}`,
                },
                "auth": `${localStorage.getItem("token")}`,
                "id": 1
            })
        }
        
    },
    createItemWithoutInterfaceid: async (item) => {
        if(item.value_type == '0' || item.value_type == '3'){
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "item.create",
                "params": {
                    "name": `${item.host}`,
                    "key_": `${item.key_}`,
                    "hostid": `${item.hostid}`,
                    "type": 20,
                    "value_type": `${item.value_type}`,
                    "delay": `${item.delay}`,
                    "history": `${item.history}`,
                    "trends": `${item.trends}`,
                    "snmp_oid": `${item.snmp_oid}`,
                    "units": `${item.units}`,
                    "description": `${item.description}`,
                },
                "auth": `${localStorage.getItem("token")}`,
                "id": 1
            })
        }else{
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "item.create",
                "params": {
                    "hostid": `${item.hostid}`,
                    "name": `${item.host}`,
                    "key_": `${item.key_}`,
                    "type": 20,
                    "value_type": `${item.value_type}`,
                    "delay": `${item.delay}`,
                    "history": `${item.history}`,
                    "trends": `${item.trends}`,
                    "snmp_oid": `${item.snmp_oid}`,
                    "description": `${item.description}`,
                },
                "auth": `${localStorage.getItem("token")}`,
                "id": 1
            })
        }
        
    },
    updateItem: async (item) => {
        if(item.value_type == '0' || item.value_type == '3'){
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "item.update",
                "params": {
                    "itemid": `${item.itemid}`,
                    "name": `${item.name}`,
                    "key_": `${item.key_}`,
                    "value_type": `${item.value_type}`,
                    "delay": `${item.delay}`,
                    "history": `${item.history}`,
                    "trends": `${item.trends}`,
                    "snmp_oid": `${item.snmp_oid}`,
                    "units": `${item.units}`,
                    "description": `${item.description}`,
                },
                "auth": `${localStorage.getItem("token")}`,
                "id": 1
            })
        }
        else{
            return httpRequests.post('', {
                "jsonrpc": "2.0",
                "method": "item.update",
                "params": {
                    "itemid": `${item.itemid}`,
                    "name": `${item.name}`,
                    "key_": `${item.key_}`,
                    "value_type": `${item.value_type}`,
                    "delay": `${item.delay}`,
                    "history": `${item.history}`,
                    "trends": `${item.trends}`,
                    "snmp_oid": `${item.snmp_oid}`,
                    "description": `${item.description}`,
                },
                "auth": `${localStorage.getItem("token")}`,
                "id": 1
            })
        }
    },
    disableItem: async (itemid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.update",
            "params": {
                "itemid": `${itemid}`,
                "status": 1
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    enableItem: async (itemid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.update",
            "params": {
                "itemid": `${itemid}`,
                "status": 0
            },
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    deleteItem: async (itemid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.delete",
            "params": [
                `${itemid}`,
            ],
            auth: `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    clearHistoryAndTrends: async (itemid) => {
        return httpRequests.post('', {
            'jsonrpc': '2.0',
            'method': 'history.clear',
            'params': [itemid],
            'auth': `${localStorage.getItem("token")}`,
            'id': 1,
        })
    },
    getHistory: async (item, time_from, time_till) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "history.get",
            "params": {
                "output": "extend",
                "history": item.value_type,
                "itemids": `${item.itemid}`,
                "sortfield": "clock",
                "sortorder": "ASC",
                "time_from": time_from,
                "time_till": time_till,
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTrends: async (item, time_from, time_till) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trend.get",
            "params": {
                "output": "extend",
                "itemids": `${item.itemid}`,
                "sortfield": "clock",
                "sortorder": "ASC",
                "time_from": time_from,
                "time_till": time_till,
                "limit": 1
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    }
}

export default itemService