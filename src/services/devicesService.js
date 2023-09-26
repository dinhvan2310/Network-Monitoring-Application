import localforage from "localforage";



export const getDevices = async () => {
    try {
        const devices = await localforage.getItem("devices");
        if (devices === null) {
            await localforage.setItem("devices", []);
            return [];
        } else {
            return devices;
        }
    } catch (error) {
        console.log(error);
    }
}

export const addDevice = async (device) => {
    try {
        const devices = await localforage.getItem("devices");
        if(devices === null) {
            await localforage.setItem("devices", []);
        }
        const newDevices = [...devices, device];
        await localforage.setItem("devices", newDevices);
        return newDevices;
    } catch (error) {
        console.log(error);
    }
}