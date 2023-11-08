import httpRequests from "utils/httpRequests"

const itemService = {
    getItems: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
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
                "templateids": `${templateid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
}

export default itemService