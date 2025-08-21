import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useAbilityContext } from '@contexts/ability'
import { getHomeRouteForLoggedInUser } from '@utility'
import Spinner from '@core/components/spinner/Loading-spinner'

const PrivateRoute = ({ children, route }) => {
  const { isLoggedIn, role } = useAuth()
  const ability = useAbilityContext()

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!isLoggedIn) {
      return <Navigate to='/login' />
    }
    if (isLoggedIn && restrictedRoute) {
      return <Navigate to={'/'} />
    }
    if (isLoggedIn && !ability.can(action || 'read', resource)) {
      return <Navigate to='/not-authorized' replace />
      // return <Navigate to='/home' replace />
    }
  }

  return <Suspense fallback={<Spinner className='content-loader' />}>{children}</Suspense>
}

export default PrivateRoute
