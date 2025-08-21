import { lazy } from 'react'

/********************************************************************************************************************************/
const ControlPanel = lazy(() => import('@views/controlPanel'))
const Role = lazy(() => import('@views/controlPanel/role'))
const User = lazy(() => import('@views/controlPanel/user'))
const AddReportCategory = lazy(() => import('@views/controlPanel/AddReportCategory'))
const ReportList = lazy(() => import('@views/controlPanel/ReportList'))
const AddReport = lazy(() => import('@views/controlPanel/ReportList/AddReport'))
const Access = lazy(() => import('@views/controlPanel/access'))
const SetReportToRole = lazy(() => import('@views/controlPanel/SetReportToRole'))
const SetRoleToUser = lazy(() => import('@views/controlPanel/SetRoleToUser'))
const CategoryAccess = lazy(() => import('@views/controlPanel/CategoryAccess'))

const controlPanel = [
  /********************************************************************************************************************************/
  {
    path: '/controlPanel',
    element: <ControlPanel />,
    meta: {
      action: 'read',
      resource: '/controlPanel'
    }
  },
  {
    path: '/role',
    element: <Role />,
    meta: {
      action: 'read',
      resource: '/role'
    }
  },
  {
    path: '/user',
    element: <User />,
    meta: {
      action: 'read',
      resource: '/user'
    }
  },
  {
    path: '/AddReportCategory',
    element: <AddReportCategory />,
    meta: {
      action: 'read',
      resource: '/AddReportCategory'
    }
  },
  {
    path: '/ReportList',
    element: <ReportList />,
    meta: {
      action: 'read',
      resource: '/ReportList'
    }
  },
  {
    path: '/AddReport',
    element: <AddReport />,
    meta: {
      action: 'read',
      resource: '/AddReport'
    }
  },
  {
    path: '/Access',
    element: <Access />,
    meta: {
      action: 'read',
      resource: '/Access'
    }
  },
  {
    path: '/SetReportToRole',
    element: <SetReportToRole />,
    meta: {
      action: 'read',
      resource: '/SetReportToRole'
    }
  },
  {
    path: '/SetRoleToUser',
    element: <SetRoleToUser />,
    meta: {
      action: 'read',
      resource: '/SetRoleToUser'
    }
  },
  {
    path: '/CategoryAccess',
    element: <CategoryAccess />,
    meta: {
      action: 'read',
      resource: '/CategoryAccess'
    }
  }

  /********************************************************************************************************************************/
]
export default controlPanel
