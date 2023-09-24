import DefaultLayout from "layouts/DefaultLayout"
import Home from "pages/home"
import Settings from "pages/settings"
import config from "config"

const routes = [
    {
      path: "/",
      element: <DefaultLayout/>,
      children: [
        {
          path: config.routes.home,
          element: <Home/>,
        },
        {
          path: config.routes.settings,
          element: <Settings/>,
        }
      ]
    },
  ]

export default routes