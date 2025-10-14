import { lazy } from 'react'

const Home = lazy(() => import('@views/home'))
const QuickAccess = lazy(() => import('@views/quickAccess'))

const VariableData = lazy(() => import('@views/baseData/variableData'))
const FixData = lazy(() => import('@views/baseData/fixData'))

const DutyStatus = lazy(() => import('@views/baseData/fixData/dutyStatus'))
const Organization = lazy(() => import('@views/baseData/fixData/organization'))
const City = lazy(() => import('@views/baseData/fixData/City'))
const Province = lazy(() => import('@views/baseData/fixData/Province'))
const EducationLevel = lazy(() => import('@views/baseData/fixData/EducationLevel'))
const Quota = lazy(() => import('@views/baseData/fixData/Quota'))
const Religion = lazy(() => import('@views/baseData/fixData/Religion'))
const EmploymentType = lazy(() => import('@views/baseData/fixData/EmploymentType'))
const UniversityType = lazy(() => import('@views/baseData/fixData/UniversityType'))
const ScoreRatio = lazy(() => import('@views/baseData/variableData/ScoreRatio'))
const ExamAgency = lazy(() => import('@views/baseData/variableData/ExamAgency'))
const ComplementEvaluationAgency = lazy(() => import('@views/baseData/variableData/ComplementEvaluationAgency'))
const EducationField = lazy(() => import('@views/baseData/variableData/EducationField'))
const Job = lazy(() => import('@views/baseData/variableData/Job'))
const SelectionState = lazy(() => import('@views/baseData/variableData/SelectionState'))
const AgencyCategory = lazy(() => import('@views/baseData/variableData/AgencyCategory'))
const University = lazy(() => import('@views/baseData/variableData/University'))
const LicenseRequest = lazy(() => import('@views/license/licenseRequest'))
const RequestLicense = lazy(() => import('@views/license/RequestLicense'))

const ExamCenter = lazy(() => import('@views/ExeamOrganier/examCenter'))
const ExamScope = lazy(() => import('@views/ExeamOrganier/examScope'))
const ExamSecoundScope = lazy(() => import('@views/ExeamOrganier/examSecoundScope'))
const PrintRequirement = lazy(() => import('@views/ExeamOrganier/printRequirement'))
const ActivityScope = lazy(() => import('@views/baseData/fixData/ActivityScope'))
const Veteran = lazy(() => import('@views/baseData/fixData/Veteran'))
const IntroductionExams = lazy(() => import('@views/ExeamOrganier/IntroductionExams'))
const PrintQuarantine = lazy(() => import('@views/ExeamOrganier/PrintQuarantine'))
const ScopeManage = lazy(() => import('@views/ExeamOrganier/scopeManage'))
const OperatorScopeManage = lazy(() => import('@views/operators/operatorRecords'))
const QuestionDesigner = lazy(() => import('@views/ExeamOrganier/questionDesigner'))
const ExecutiveAgents = lazy(() => import('@views/ExeamOrganier/executiveAgents'))
const ListOfPeople = lazy(() => import('@views/ExeamOrganier/listOfPeople'))
const ScopeUsers = lazy(() => import('@views/ScopeManage/scopeUsers'))
const ScopeTicket = lazy(() => import('@views/ScopeManage/ScopeTicket'))
const ScopeprintRequirement = lazy(() => import('@views/ScopeManage/scopeprintRequirement'))
const OperatorTicket = lazy(() => import('@views/operators/operatorTicket'))
const ManagementExam = lazy(() => import('@views/employmentExams/managementExam'))
const ResultsExam = lazy(() => import('@views/employmentExams/resultsExam'))
const ChartReport = lazy(() => import('@views/operators/chartReport'))
const AnswerSheet = lazy(() => import('@views/AnswerSheetManagement'))
// const ListOFSupplementaryAssessment = lazy (() => import('@views/supplementaryAssessment/listOFSupplementaryAssessment'))
const Results = lazy (() => import('@views/supplementaryAssessment/results'))
const AnswerResultSheet = lazy(() => import('@views/AnswerResultSheetManagement'))
const ListOFSupplementaryAssessment = lazy(() => import('@views/supplementaryAssessment/listOFSupplementaryAssessment'))
const EvaluationResults = lazy(() => import('@views/supplementaryAssessment/evaluationResults'))
const SelectPresenter = lazy(() => import('@views/supplementaryAssessment/selectPresenter'))
const ExamScoring = lazy(() => import('@views/examScoring'))
const CorrectionExam = lazy(() => import('@views/CorrectionExam'))
const ComplanteRequest = lazy(() => import('@views/operators/ComplanteRequest'))
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
  },

  {
    path: '/IntroductionExams',
    element: <IntroductionExams />,
    meta: {
      action: 'read',
      resource: '/IntroductionExams'
    }
  },
  {
    path: '/ManagementExam',
    element: <ManagementExam />,
    meta: {
      action: 'read',
      resource: '/ManagementExam'
    }
  },

  {
    path: '/QuestionDesigner',
    element: <QuestionDesigner />,
    meta: {
      action: 'read',
      resource: '/QuestionDesigner'
    }
  },
  {
    path: '/ExecutiveAgents',
    element: <ExecutiveAgents />,
    meta: {
      action: 'read',
      resource: '/ExecutiveAgents'
    }
  },
  {
    path: '/ListOfPeople',
    element: <ListOfPeople />,
    meta: {
      action: 'read',
      resource: '/ListOfPeople'
    }
  },
  {
    path: '/City',
    element: <City />,
    meta: {
      action: 'read',
      resource: '/City'
    }
  },
  {
    path: '/Veteran',
    element: <Veteran />,
    meta: {
      action: 'read',
      resource: '/Veteran'
    }
  },
  {
    path: '/ActivityScope',
    element: <ActivityScope />,
    meta: {
      action: 'read',
      resource: '/ActivityScope'
    }
  },
  {
    path: '/University',
    element: <University />,
    meta: {
      action: 'read',
      resource: '/University'
    }
  },
  {
    path: '/SelectionState',
    element: <SelectionState />,
    meta: {
      action: 'read',
      resource: '/SelectionState'
    }
  },
  {
    path: '/AgencyCategory',
    element: <AgencyCategory />,
    meta: {
      action: 'read',
      resource: '/AgencyCategory'
    }
  },
  {
    path: '/ScoreRatio',
    element: <ScoreRatio />,
    meta: {
      action: 'read',
      resource: '/ScoreRatio'
    }
  },
  {
    path: '/EducationField',
    element: <EducationField />,
    meta: {
      action: 'read',
      resource: '/EducationField'
    }
  },
  {
    path: '/ExamAgency',
    element: <ExamAgency />,
    meta: {
      action: 'read',
      resource: '/ExamAgency'
    }
  },
  {
    path: '/Job',
    element: <Job />,
    meta: {
      action: 'read',
      resource: '/Job'
    }
  },
  {
    path: '/ComplementEvaluationAgency',
    element: <ComplementEvaluationAgency />,
    meta: {
      action: 'read',
      resource: '/ComplementEvaluationAgency'
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
  },
  {
    path: '/Organization',
    element: <Organization />,
    meta: {
      action: 'read',
      resource: '/Organization'
    }
  },
  {
    path: '/EducationLevel',
    element: <EducationLevel />,
    meta: {
      action: 'read',
      resource: '/EducationLevel'
    }
  },
  {
    path: '/EmploymentType',
    element: <EmploymentType />,
    meta: {
      action: 'read',
      resource: '/EmploymentType'
    }
  },
  {
    path: '/UniversityType',
    element: <UniversityType />,
    meta: {
      action: 'read',
      resource: '/UniversityType'
    }
  },
  {
    path: '/Quota',
    element: <Quota />,
    meta: {
      action: 'read',
      resource: '/Quota'
    }
  },
  {
    path: '/Religion',
    element: <Religion />,
    meta: {
      action: 'read',
      resource: '/Religion'
    }
  },
  {
    path: '/Province',
    element: <Province />,
    meta: {
      action: 'read',
      resource: '/Province'
    }
  },
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
  },
  {
    path: '/examCenter',
    element: <ExamCenter />,
    meta: {
      action: 'read',
      resource: '/examCenter'
    }
  },
  {
    path: '/examScope',
    element: <ExamScope />,
    meta: {
      action: 'read',
      resource: '/examScope'
    }
  },
  {
    path: '/examSecoundScope',
    element: <ExamSecoundScope />,
    meta: {
      action: 'read',
      resource: '/examSecoundScope'
    }
  },
  {
    path: '/printRequirement',
    element: <PrintRequirement />,
    meta: {
      action: 'read',
      resource: '/printRequirement'
    }
  },
  {
    path: '/printQuarantine',
    element: <PrintQuarantine />,
    meta: {
      action: 'read',
      resource: '/printQuarantine'
    }
  },
  {
    path: '/scopeUsers',
    element: <ScopeUsers />,
    meta: {
      action: 'read',
      resource: '/scopeUsers'
    }
  },
  {
    path: '/scopeTicket',
    element: <ScopeTicket />,
    meta: {
      action: 'read',
      resource: '/scopeTicket'
    }
  },

  {
    path: '/scopeManage',
    element: <ScopeManage />,
    meta: {
      action: 'read',
      resource: '/scopeManage'
    }
  },

  {
    path: '/operatorScopeManage',
    element: <OperatorScopeManage />,
    meta: {
      action: 'read',
      resource: '/operatorScopeManage'
    }
  },

  {
    path: '/scopePrintRequirement',
    element: <ScopeprintRequirement />,
    meta: {
      action: 'read',
      resource: '/scopePrintRequirement'
    }
  },
  {
    path: '/operatorTicket',
    element: <OperatorTicket />,
    meta: {
      action: 'read',
      resource: '/operatorTicket'
    }
  },
  {
    path: '/chartReport',
    element: <ChartReport />,
    meta: {
      action: 'read',
      resource: '/chartReport'
    }
  },
  {
    path: '/ResultsExam',
    element: <ResultsExam />,
    meta: {
      action: 'read',
      resource: '/ResultsExam'
    }
  },
  {
    path: 'answerSheet',
    element: <AnswerSheet />,
    meta: {
      action: 'read',
      resource: '/answerSheet'
    }
  },

  {
    path: 'answerResultSheet',
    element: <AnswerResultSheet />,
    meta: {
      action: 'read',
      resource: '/answerResultSheet'
    }
  },

  {
    path: '/ListOFSupplementaryAssessment',
    element: <ListOFSupplementaryAssessment />,
    meta: {
      action: 'read',
      resource: '/ListOFSupplementaryAssessment'
    }
  },
  {
    path: '/Results',
    element: <Results />,
    meta: {
      action: 'read',
      resource: '/Results'
    }
  },

  {
    path: '/examScoring',
    element: <ExamScoring />,
    meta: {
      action: 'read',
      resource: '/examScoring'
    }
  },
  {
    path: '/correctionExam',
    element: <CorrectionExam />,
    meta: {
      action: 'read',
      resource: '/correctionExam'
    }
  },

  {
    path: '/complanteRequest',
    element: <ComplanteRequest />,
    meta: {
      action: 'read',
      resource: '/complanteRequest'
    }
  }
  ,
  {
    path: 'answerSheet',
    element: <AnswerSheet />,
    meta: {
      action: 'read',
      resource: '/answerSheet'
    }
  }
,
  {
    path: 'EvaluationResults',
    element: <EvaluationResults />,
    meta: {
      action: 'read',
      resource: '/EvaluationResults'
    }
  }
,
  {
    path: 'EvaluationResults',
    element: <EvaluationResults />,
    meta: {
      action: 'read',
      resource: '/EvaluationResults'
    }
  }
,
  {
    path: 'SelectPresenter',
    element: <SelectPresenter />,
    meta: {
      action: 'read',
      resource: '/SelectPresenter'
    }
  }
]

export default AdminRoutes
