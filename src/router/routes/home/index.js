import { lazy } from 'react'

const Home = lazy(() => import('@views/home'))
const QuickAccess = lazy(() => import('@views/quickAccess'))

const VariableData = lazy(() => import('@views/baseData/variableData'))
const FixData = lazy(() => import('@views/baseData/fixData'))
const DutyStatus = lazy(() => import('@views/baseData/fixData/dutyStatus'))
const AdminRoutes = [
  {
    path: '/home',
    element: <Home />,
    meta: {
      action: 'read',
      resource: '/home'
    }
  },
  {
    path: '/quickAccess',
    element: <QuickAccess />,
    meta: {
      action: 'read',
      resource: '/home'
    }
  },
  {
    path: '/variableData',
    element: <VariableData />,
    meta: {
      action: 'read',
      resource: '/VariableData'
    }
  },
  {
    path: '/fixData',
    element: <FixData />,
    meta: {
      action: 'read',
      resource: '/fixData'
    }
  },
  {
    path: '/dutyStatus',
    element: <DutyStatus />,
    meta: {
      action: 'read',
      resource: '/DutyStatus'
    }
  }
]

export default AdminRoutes
