const routes = {
    home: '/',
    settings: '/settings',
    devices: '/devices/:ip',
    deviceOverview: '/devices/:ip/overview',
    deviceInfo: '/devices/:ip/info',
    deviceSettings: '/devices/:ip/settings',
    deviceStatistic: '/devices/:ip/statistic/:days',
    deviceAlarms: '/devices/:ip/alarms',
    deviceLog: '/devices/:ip/log',
    addSensor: '/devices/:ip/addSensor',
};

export default routes;
