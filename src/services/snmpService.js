import httpRequest from "utils/httpRequests"


export const getSnmpData = async (ip, oid, community) => {
    const data = await httpRequest.get(`snmp/${ip}/${oid}/${community}`)
    return data
}

