import { lazy } from 'react'

const NotAuthorized = lazy(() => import('@views/misc/NotAuthorized'))
const ComingSoon = lazy(() => import('@views/misc/ComingSoon'))
const Maintenance = lazy(() => import('@views/misc/Maintenance'))
const Error = lazy(() => import('@views/misc/Error'))

const MiscRoutes = [
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  // {
  //   path: '/coming-soon',
  //   element: <ComingSoon />,
  //   meta: {
  //     layout: 'blank',
  //     publicRoute: true
  //   }
  // },
  {
    path: '/maintenance',
    element: <Maintenance />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '*',
    element: <Error />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  }
]

export default MiscRoutes
