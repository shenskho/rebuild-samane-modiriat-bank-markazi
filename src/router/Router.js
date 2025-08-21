import { useRoutes, Navigate } from 'react-router-dom'
import { useLayout } from '@hooks/useLayout'
import { useAuth } from '@hooks/useAuth'
import { getHomeRouteForLoggedInUser } from '@utility'
import { getRoutes } from './routes'

const Router = () => {
  const { layout } = useLayout()
  const allRoutes = getRoutes(layout)
  const { isLoggedIn, role } = useAuth()

  const getHomeRoute = () => {
    if (isLoggedIn) {
      return getHomeRouteForLoggedInUser(role)
    } else {
      return '/Login'
    }
  }

  const unauthenticatedRoutes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    ...allRoutes,
    {
      path: '*',
      element: <Navigate replace to='/Login' />
    }
  ])

  const authenticatedRoutes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    ...allRoutes
  ])

  return isLoggedIn ? authenticatedRoutes : unauthenticatedRoutes
}

export default Router
