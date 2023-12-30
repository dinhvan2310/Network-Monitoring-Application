const { default: httpRequests } = require("utils/httpRequests")

const problemService = {
    getProblemByTrigger: async (triggerid) => {
        return httpRequests.post('', {
            'jsonrpc': '2.0',
            'method': 'problem.get',
            'params': {
                'triggerids': triggerid,
                "selectAcknowledges": "extend",
                "recent": "true",
                "sortfield": ["eventid"],
                "sortorder": "DESC",
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getProblemByHost: async (hostid) => {
        return httpRequests.post('', {
            'jsonrpc': '2.0',
            'method': 'problem.get',
            'params': {
                'hostids': hostid,
                "selectAcknowledges": "extend",
                "recent": "true",
                "sortfield": ["eventid"],
                "sortorder": "DESC",
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
    getProblems: async () => {
        return httpRequests.post('', {
            'jsonrpc': '2.0',
            'method': 'problem.get',
            'params': {
                "output": "extend",
                "selectAcknowledges": "extend",
                "recent": "true",
                "sortfield": "eventid",
                "sortorder": "DESC",
                "limit": 10
              },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    },
}

export default problemService