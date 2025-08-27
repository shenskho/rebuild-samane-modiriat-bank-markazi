import { lazy } from 'react'

const Login = lazy(() => import('@views/authentication/login/index'))

const ExteraLogin = lazy(() => import('@views/authentication/login/ExteraLogin'))

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <ExteraLogin />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }, {
    path: '/ExteraLogin',
    element: <ExteraLogin />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }

  
]

export default AuthenticationRoutes
