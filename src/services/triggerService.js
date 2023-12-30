const { default: httpRequests } = require("utils/httpRequests")

const triggerService = {
    getTriggerByHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "params": {
                hostids: `${hostid}`,
                "selectFunctions": "extend"
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTriggers: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "params": {
                "output": "extend",
                "selectFunctions": "extend"
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
                templateids: `${templateid}`,
                "selectFunctions": "extend"
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTrigger: async (id) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "params": {
                "output": "extend",
                "triggerids": `${id}`,
                "selectFunctions": "extend"
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    addTrigger: async (trigger) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.create",
            "params": {
                "description": `${trigger.description}`,
                "expression": `${trigger.expression}`,
                "priority": `${trigger.priority}`,
                // "dependencies": [
                //     {
                //         // "triggerid": "17367"
                //     }
                // ]
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    updateTrigger: async (trigger) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.update",
            "params": {
                "triggerid": `${trigger.triggerid}`,
                "description": `${trigger.description}`,
                "expression": `${trigger.expression}`,
                "priority": `${trigger.priority}`,
                // "dependencies": [
                //     {
                //         // "triggerid": "17367"
                //     }
                // ]
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    deleteTrigger: async (id) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.delete",
            "params": [
                `${id}`
            ],
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    disableTrigger: async (id) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.update",
            "params": {
                "triggerid": `${id}`,
                "status": 1
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    enableTrigger: async (id) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "trigger.update",
            "params": {
                "triggerid": `${id}`,
                "status": 0
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },

}

export default triggerService