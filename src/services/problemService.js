import httpRequests from "utils/httpRequests"

const problemService = {
    getProblem: async (triggerid) => {
        return httpRequests.post('', {
            'jsonrpc': '2.0',
            'method': 'problem.get',
            'params': {
                'triggerids': triggerid,
                "selectAcknowledges": "extend",
                "recent": "true",
        "sortfield": ["eventid"],
        "sortorder": "DESC"
            },
            "auth": `${localStorage.getItem("token")}`,
            "id": 1
        })
    }
}

export default problemService