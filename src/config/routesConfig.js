const routes = {
    home: '/',
    settings: '/settings',
    devices: '/devices/:id',
    deviceOverview: '/devices/:id',
    deviceInfo: '/devices/:id/info',
    deviceSettings: '/devices/:id/settings',
    deviceStatistic: '/devices/:id/statistic/:days',
    deviceAlarms: '/devices/:id/alarms',
    deviceLog: '/devices/:id/log',
    addSensor: '/devices/:id/addSensor',
};

export default routes;
