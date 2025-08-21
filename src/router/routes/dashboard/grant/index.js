import { lazy } from 'react'

/********************************************************************************************************************************/
const Home = lazy(() => import('@views/home'))

const GrantDashboardRoutes = [
  /********************************************************************************************************************************/
  {
    path: '/home',
    element: <Home />,
    breadcrumb: null,
    meta: {
      action: 'read',
      publicRoute: false,
      restricted: true,
      resource: '/home'
    }
  }
  /********************************************************************************************************************************/
]

export default GrantDashboardRoutes
