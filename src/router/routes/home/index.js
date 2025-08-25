import { lazy } from 'react'

const Home = lazy(() => import('@views/home'))
const QuickAccess = lazy(() => import('@views/quickAccess'))

const VariableData = lazy(() => import('@views/baseData/variableData'))
const FixData = lazy(() => import('@views/baseData/fixData'))

const DutyStatus = lazy(() => import('@views/baseData/fixData/dutyStatus'))
const Organization = lazy (()=> import('@views/baseData/fixData/organization'))
const Province = lazy(()=> import("@views/baseData/fixData/Province"))
const EducationLevel = lazy(()=> import("@views/baseData/fixData/EducationLevel"))
const Quota = lazy(()=>import("@views/baseData/fixData/Quota"))
const Religion = lazy(()=>import("@views/baseData/fixData/Religion"))
const EmploymentType = lazy(()=>import("@views/baseData/fixData/EmploymentType"))
const UniversityType = lazy(()=>import("@views/baseData/fixData/UniversityType"))
const ScoreRatio = lazy(()=>import("@views/baseData/variableData/ScoreRatio"))


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
  }
  ,
  {
    path: '/ScoreRatio',
    element: <ScoreRatio />,
    meta: {
      action: 'read',
      resource: '/ScoreRatio'
    }
  }
  ,
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
  ,
  {
    path: '/organization',
    element: <Organization />,
    meta: {
      action: 'read',
      resource: '/organization'
    }
  }
    ,
  {
    path: '/EducationLevel',
    element: <EducationLevel />,
    meta: {
      action: 'read',
      resource: '/EducationLevel'
    }
  }
  ,
  {
    path: '/EmploymentType',
    element: <EmploymentType />,
    meta: {
      action: 'read',
      resource: '/EmploymentType'
    }
  }
  ,
  {
    path: '/UniversityType',
    element: <UniversityType />,
    meta: {
      action: 'read',
      resource: '/UniversityType'
    }
  }
  ,
  {
    path: '/Quota',
    element: <Quota />,
    meta: {
      action: 'read',
      resource: '/Quota'
    }
  }
  ,
  {
    path: '/Religion',
    element: <Religion />,
    meta: {
      action: 'read',
      resource: '/Religion'
    }
  }
   ,
  {
    path: '/Province',
    element: <Province />,
    meta: {
      action: 'read',
      resource: '/Province'
    }
  }
]

export default AdminRoutes
