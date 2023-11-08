const { default: httpRequests } = require("utils/httpRequests")

const templateService = {
    getTemplates: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "template.get",
            "params": {
                
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTemplatesByHost: async (hostid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "template.get",
            "params": {
                "hostids": `${hostid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTemplatesByTemplateGroup: async (groupid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "template.get",
            "params": {
                "groupids": `${groupid}`
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        }) 
    },
    deleteTemplate: async (templateid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "template.delete",
            "params": [
                `${templateid}`
            ],
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    deleteTemplateGroup: async (groupid) => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "templategroup.delete",
            "params": [
                `${groupid}`
            ],
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getTemplateGroups: async () => {
        return httpRequests.post('', {
            "jsonrpc": "2.0",
            "method": "templategroup.get",
            "params": {
                
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },

}

export default templateService