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
const ExamAgency =lazy (()=>import("@views/baseData/variableData/ExamAgency"))
const ComplementEvaluationAgency =lazy (()=>import("@views/baseData/variableData/ComplementEvaluationAgency"))
const EducationField =lazy (()=>import("@views/baseData/variableData/EducationField"))
const Job =lazy (()=>import("@views/baseData/variableData/Job"))
const SelectionState =lazy (()=>import("@views/baseData/variableData/SelectionState"))
const AgencyCategory =lazy (()=>import("@views/baseData/variableData/AgencyCategory"))
const University =lazy (()=>import("@views/baseData/variableData/University"))
/////////////////
const LicenseRequest = lazy(() => import('@views/license/licenseRequest'))
const RequestLicense = lazy(() => import('@views/license/RequestLicense'))




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
      resource: '/variableData'
    }
  }
  ,
  {
    path: '/University',
    element: <University />,
    meta: {
      action: 'read',
      resource: '/University'
    }
  }
  ,
  {
    path: '/SelectionState',
    element: <SelectionState />,
    meta: {
      action: 'read',
      resource: '/SelectionState'
    }
  }
  ,
  {
    path: '/AgencyCategory',
    element: <AgencyCategory />,
    meta: {
      action: 'read',
      resource: '/AgencyCategory'
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
    path: '/EducationField',
    element: <EducationField />,
    meta: {
      action: 'read',
      resource: '/EducationField'
    }
  }
    ,
  {
    path: '/ExamAgency',
    element: <ExamAgency />,
    meta: {
      action: 'read',
      resource: '/ExamAgency'
    }
  }
   ,
  {
    path: '/Job',
    element: <Job />,
    meta: {
      action: 'read',
      resource: '/Job'
    }
  }
  ,
  {
    path: '/ComplementEvaluationAgency',
    element: <ComplementEvaluationAgency />,
    meta: {
      action: 'read',
      resource: '/ComplementEvaluationAgency'
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
  ,
  {
    path: '/licenseRequest',
    element: <LicenseRequest />,
    meta: {
      action: 'read',
      resource: '/licenseRequest'
    }
  },
  {
    path: '/requestLicense',
    element: <RequestLicense />,
    meta: {
      action: 'read',
      resource: '/requestLicense'
    }
  }
]

export default AdminRoutes
