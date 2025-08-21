import { lazy } from 'react'

const Notification = lazy(() => import('@views/Notification'))

const AdminRoutes = [
  {
    path: '/Notification',
    element: <Notification />,
    meta: {
      action: 'read',
      resource: '/Notification'
    }
  }
]

export default AdminRoutes
