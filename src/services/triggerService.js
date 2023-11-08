const { default: httpRequests } = require("utils/httpRequests")

const triggerService = {
    getTriggerByHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "params": {
                hostids: `${hostid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTriggerByTemplate: async (templateid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "params": {
                templateids: `${templateid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
}

export default triggerService