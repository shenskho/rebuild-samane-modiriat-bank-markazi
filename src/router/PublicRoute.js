import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { getHomeRouteForLoggedInUser } from '@utility'

const PublicRoute = ({ children, route }) => {
  const { isLoggedIn, role } = useAuth()

  if (route) {
    const restrictedRoute = route.meta && route.meta.restricted

    if (isLoggedIn && restrictedRoute) {
      return <Navigate to={'/'} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
