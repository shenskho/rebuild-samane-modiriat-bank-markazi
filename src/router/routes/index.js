// ** React Imports
import { Fragment } from 'react'

// ** Routes Imports
import AuthenticationRoutes from './auth'
import AdminRoutes from './home'
import GrantDashboardRoutes from './dashboard/grant'
import MiscRoutes from './misc'
import ControlPanel from './controlPanel'
import Notification from './Notification'
// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Layouts
import BlankLayout from '@core/layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '../PublicRoute'
import PrivateRoute from '../PrivateRoute'

// ** Utils
import { isObjEmpty } from '@utility'

import { useAuth } from '@hooks/useAuth'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = `Discovery - ${themeConfig.app.appName}`

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const unauthenticatedRoutes = [...AuthenticationRoutes]
const authenticatedRoutes = [
  ...AuthenticationRoutes,
  ...AdminRoutes,
  ...GrantDashboardRoutes,
  ...MiscRoutes,
  ...ControlPanel,
  ...Notification
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const { isLoggedIn } = useAuth()

  const LayoutRoutes = []

  const Routes = isLoggedIn ? authenticatedRoutes : unauthenticatedRoutes
  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, authenticatedRoutes, unauthenticatedRoutes, getRoutes }
