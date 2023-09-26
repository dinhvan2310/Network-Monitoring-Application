import DefaultLayout from "layouts/DefaultLayout"
import Home from "pages/home"
import Settings from "pages/settings"
import config from "config"
import Device from "pages/device"
import DeviceInfo, { deviceInfoLoader } from "pages/device/deviceInfo"
import { defaultLayoutLoader } from "layouts/DefaultLayout/DefaultLayout"
import DeviceHome from "pages/device/deviceHome"

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
              path: config.routes.deviceHome,
              element: <DeviceHome/>,
            },
            {
              path: config.routes.deviceInfo,
              loader: deviceInfoLoader,
              element: <DeviceInfo/>,
            },
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