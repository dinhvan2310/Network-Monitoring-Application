import DefaultLayout from "layouts/DefaultLayout"
import Home from "pages/home"
import Settings from "pages/settings"
import config from "config"
import Device from "pages/device"
import DeviceInfo, { deviceInfoLoader } from "pages/device/deviceInfo"
import { defaultLayoutLoader } from "layouts/DefaultLayout/DefaultLayout"
import DeviceHome from "pages/device/deviceOverview"
import DeviceSettings from "pages/device/deviceSettings"
import DeviceOverview from "pages/device/deviceOverview"
import DeviceStatistic from "pages/device/deviceStatistic"
import DeviceAlarms from "pages/device/deviceAlarms"
import DeviceLog from "pages/device/deviceLog"
import AddSensor from "pages/device/addSensor"

const routes = [
    {
      path: "/",
      loader: defaultLayoutLoader,
      element: <DefaultLayout/>,
      children: [
        {
          path: config.routes.home,
          element: <Home/>,
        },
        {
          path: config.routes.devices,
          element: <Device/>,
          children: [
            {
              path: config.routes.deviceOverview,
              element: <DeviceOverview/>,
            },
            {
              path: config.routes.deviceStatistic,
              element: <DeviceStatistic/>,
            },
            {
              path: config.routes.deviceAlarms,
              element: <DeviceAlarms/>,
            },
            {
              path: config.routes.deviceLog,
              element: <DeviceLog/>,
            },
            {
              path: config.routes.deviceInfo,
              loader: deviceInfoLoader,
              element: <DeviceInfo/>,
            },
            {
              path: config.routes.deviceSettings,
              element: <DeviceSettings/>,
            },
            {
              path: config.routes.addSensor,
              element: <AddSensor/>,
            }
          ]
        },
        {
          path: config.routes.settings,
          element: <Settings/>,
        },
      ]
    },
  ]

export default routes