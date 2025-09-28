const PREFIX = '/api/v1'

export default {
  /********************************************************************************************************************************/
  //احراز هویت
  authentication: {
    login: `${PREFIX}/Authentication/sign-in`,
    logout: `${PREFIX}/Authentication/sign-out`,
    signUp: `${PREFIX}/Authentication/sign-up`,
    signInWithsso: `${PREFIX}/Authentication/sign-in-with-sso`
  },
  activity: {
    getactivity: `${PREFIX}/ActivityScope/get-all-activity-scopes`
  },
  file: {
    uploadFile: `${PREFIX}/File/upload-base64-doc`,
    uploadLargeFile: `${PREFIX}/File/upload-large-base64-doc`,
    readFile: `${PREFIX}/File/get-base64-doc?DocumentId=`
  },
  license: {
    getlicenses: `${PREFIX}/License/get-all-Licenses`,
    createlicense: `${PREFIX}/License/create-License`,
    updatelicense: `${PREFIX}/License/update-License`,
    removelicense: `${PREFIX}/License/delete-License`
  },
  dustyStatus: {
    getDutystatus: `${PREFIX}/MilitaryState/get-all-military-states-pagination?PageSize=999999`,
    createDutystatus: `${PREFIX}/MilitaryState/create-military-state`,
    updateDutystatus: `${PREFIX}/MilitaryState/update-military-state`,
    removeDutystatus: `${PREFIX}/MilitaryState/delete-military-state`
  },

  Province: {
    getProvince: `${PREFIX}/Province/get-all-provinces-pagination?Page=1&PageSize=999999`,
    createProvince: `${PREFIX}/Province/create-province`,
    updateProvince: `${PREFIX}/Province/update-province`,
    removeProvince: `${PREFIX}/Province/delete-province`
  },
  City: {
    getCity: `${PREFIX}/City/get-all-cities-pagination?Page=1&PageSize=9999`,
    createCity: `${PREFIX}/City/create-city`,
    updateCity: `${PREFIX}/City/update-city`,
    removeCity: `${PREFIX}/City/delete-city`
  },
  Veteran: {
    getVeteran: `${PREFIX}/Veteran/get-all-veterans-pagination?PageSize=9999`,
    createVeteran: `${PREFIX}/Veteran/create-veteran`,
    updateVeteran: `${PREFIX}/Veteran/update-veteran`,
    removeVeteran: `${PREFIX}/Veteran/delete-veteran`
  },

  ActivityScope: {
    getActivityScope: `${PREFIX}/ActivityScope/get-all-activity-scopes-pagination?PageSize=999999`,
    createActivityScope: `${PREFIX}/ActivityScope/create-activity-scope`,
    updateActivityScope: `${PREFIX}/ActivityScope/update-activity-scope`,
    removeActivityScope: `${PREFIX}/ActivityScope/delete-activity-scope`
  },
  Quota: {
    getQuota: `${PREFIX}/Quota/get-all-quotas-pagination?PageSize=999999`,
    createQuota: `${PREFIX}/Quota/create-quota`,
    updateQuota: `${PREFIX}/Quota/update-quota`,
    removeQuota: `${PREFIX}/Quota/delete-quota`
  },
  EducationLevel: {
    getEducationLevel: `${PREFIX}/EducationLevel/get-all-education-levels-pagination?PageSize=999999`,
    createEducationLevel: `${PREFIX}/EducationLevel/create-education-level`,
    updateEducationLevel: `${PREFIX}/EducationLevel/update-education-level`,
    removeEducationLevel: `${PREFIX}/EducationLevel/delete-education-level`
  },
  EmploymentType: {
    getEmploymentType: `${PREFIX}/EmploymentType/get-all-employment-types-pagination?PageSize=999999`,
    createEmploymentType: `${PREFIX}/EmploymentType/create-employment-type`,
    updateEmploymentType: `${PREFIX}/EmploymentType/update-employment-type`,
    removeEmploymentType: `${PREFIX}/EmploymentType/delete-employment-type`
  },
  UniversityType: {
    getUniversityType: `${PREFIX}/UniversityType/get-all-university-types-pagination?PageSize=999999`,
    createUniversityType: `${PREFIX}/UniversityType/create-university-type`,
    updateUniversityType: `${PREFIX}/UniversityType/update-university-type`,
    removeUniversityType: `${PREFIX}/UniversityType/delete-university-type`
  },
  University: {
    getUniversity: `${PREFIX}/University/get-all-universities`,
    createUniversity: `${PREFIX}/University/create-university`,
    updateUniversity: `${PREFIX}/University/update-university`,
    removeUniversity: `${PREFIX}/University/delete-university`
  },
  Religion: {
    getReligion: `${PREFIX}/Religion/get-all-religions-pagination?PageSize=999999`,
    createReligion: `${PREFIX}/Religion/create-religion`,
    updateReligion: `${PREFIX}/Religion/update-religion`,
    removeReligion: `${PREFIX}/Religion/delete-religion`
  },

  Organization: {
    getOrganizations: `${PREFIX}/Organization/get-all-organizations-pagination?PageSize=999999`,
    createOrganizations: `${PREFIX}/Organization/create-Organization`,
    updateOrganizations: `${PREFIX}/Organization/update-Organization`,
    removeOrganizations: `${PREFIX}/Organization/delete-Organization`
  },

  Ticket: {
    getTickets: `${PREFIX}/Ticket/get-all-tickets-pagination?PageSize=999999`,
    answareTicket: `${PREFIX}/Ticket/answer-ticket`,
    takeTicket: `${PREFIX}/Ticket/assign-ticket-operator`,
    getUser: `${PREFIX}/Applicant/get-total-applicant-info?ApplicantId=`,
    editUser: `${PREFIX}/Applicant/edit-total-applicant-info`,
    getTicket: `${PREFIX}/Ticket/get-ticket?Id=`,
    createScopeTicket: `${PREFIX}/Ticket/create-hoze-ticket`,
    getScopeTicket: `${PREFIX}/Ticket/get-all-hoze-tickets-pagination`,
    getScopeusers: `${PREFIX}/Applicant/get-applicants-of-hoze-panel?ExamId=1&PageSize=99999999`,
    getApplicantChanges: `${PREFIX}/Applicant/get-applicant-changed-Fields`
  },

  PrintQuarantine: {
    getQuarantineAllSubSutes: `${PREFIX}/PrintQuarantine/get-quarantine-of-all-sub-sites`,
    getQuarantineOfSubSite: `${PREFIX}/PrintQuarantine/get-quarantine-of-sub-site`,
    setPrintQuarantineOfSubSite: `${PREFIX}/PrintQuarantine/set-print-quarantine-of-sub-site`,
    setRecevierInfo: `${PREFIX}/PrintQuarantine/set-receiver-info`,
    getRemainingReport: `${PREFIX}/PrintQuarantine/get-remaining-report`
  },
  MeetingRecordType: {
    getMeetingRecordType: `${PREFIX}/MeetingRecordType/get-all-meeting-record-types`,
    createMeetingRecordType: `${PREFIX}/MeetingRecordType/create-meeting-record-type`,
    updateMeetingRecordType: `${PREFIX}/MeetingRecordType/update-meeting-record-type`,
    removeMeetingRecordType: `${PREFIX}/MeetingRecordType/delete-meeting-record-type`
  },
  MeetingRecord: {
    getMeetingRecord: `${PREFIX}/MeetingRecord/get-all-meeting-records-pagination`,
    createMeetingRecord: `${PREFIX}/MeetingRecord/create-meeting-record`,
    updateMeetingRecord: `${PREFIX}/MeetingRecord/update-meeting-record`,
    removeMeetingRecord: `${PREFIX}/MeetingRecord/delete-meeting-record`,
    getMeetingRecordReport: `${PREFIX}/MeetingRecord/get-meeting-record-report?ExamId=1`
  },

  ///////////////////////////variableData//////////////////////////
  ScoreRatio: {
    getScoreRatio: `${PREFIX}/ScoreRatio/get-all-score-ratios-pagination?PageSize=999999`,
    createScoreRatio: `${PREFIX}/ScoreRatio/create-score-ratio`,
    updateScoreRatio: `${PREFIX}/ScoreRatio/update-score-ratio`,
    removeScoreRatio: `${PREFIX}/ScoreRatio/delete-score-ratio`
  },
  ExamAgency: {
    getExamAgency: `${PREFIX}/ExamAgency/get-all-exam-agencies`,
    createExamAgency: `${PREFIX}/ExamAgency/create-exam-agency`,
    updateExamAgency: `${PREFIX}/ExamAgency/update-exam-agency`,
    removeExamAgency: `${PREFIX}/ExamAgency/delete-exam-agency`
  },
  ComplementEvaluationAgency: {
    getComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/get-all-complement-evaluation-agencies-pagination`,
    createComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/create-complement-evaluation-agency`,
    updateComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/update-complement-evaluation-agency`,
    removeComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/delete-complement-evaluation-agency`
  },
  EducationField: {
    getEducationField: `${PREFIX}/EducationField/get-all-education-fields-pagination?PageSize=999999&EducationLevelId=`,
    createEducationField: `${PREFIX}/EducationField/create-education-field`,
    updateEducationField: `${PREFIX}/EducationField/update-education-field`,
    removeEducationField: `${PREFIX}/EducationField/delete-education-field`
  },
  Job: {
    getJob: `${PREFIX}/Job/get-all-jobs`,
    createJob: `${PREFIX}/Job/create-job`,
    updateJob: `${PREFIX}/Job/update-job`,
    removeJob: `${PREFIX}/Job/delete-job`
  },
  SelectionState: {
    getSelectionState: `${PREFIX}/SelectionState/get-all-selection-states`,
    createSelectionState: `${PREFIX}/SelectionState/create-selection-state`,
    updateSelectionState: `${PREFIX}/SelectionState/update-selection-state`,
    removeSelectionState: `${PREFIX}/SelectionState/delete-selection-state`
  },
  AgencyCategory: {
    getAgencyCategory: `${PREFIX}/AgencyCategory/get-all-agency-categories`,
    createAgencyCategory: `${PREFIX}/AgencyCategory/create-agency-category`,
    updateAgencyCategory: `${PREFIX}/AgencyCategory/update-agency-category`,
    removeAgencyCategory: `${PREFIX}/AgencyCategory/delete-agency-category`
  },
  IntroductionExams: {
    getIntroductionExams: `${PREFIX}/Exam/get-all-exams`,
    createIntroductionExams: `${PREFIX}/Exam/create-exam`,
    updateIntroductionExams: `${PREFIX}/Exam/update-exam`,
    removeIntroductionExams: `${PREFIX}/Exam/delete-exam`
  },

  ExamScopeMain: {
    getExamScope: `${PREFIX}/MainSite/get-all-MainSites-pagination?Page=1&PageSize=999999`,
    createExamScope: `${PREFIX}/MainSite/create-MainSite`,
    updateExamScope: `${PREFIX}/MainSite/update-MainSite`,
    removeExamScope: `${PREFIX}/MainSite/delete-MainSite`
  },
  ExamScopeSecound: {
    getExamScopeSecound: `${PREFIX}/SubSite/get-all-sub-sites-pagination?Page=1&PageSize=999999`,
    getExamScopeSecoundList: `${PREFIX}/SubSite/get-all-sub-sites`,
    createExamScopeSecound: `${PREFIX}/SubSite/create-sub-site`,
    updateExamScopeSecound: `${PREFIX}/SubSite/update-sub-site`,
    removeExamScopeSecound: `${PREFIX}/SubSite/delete-sub-site`
  },

  ExamAllocation: {
    setExamAllocation: `${PREFIX}/ExamAllocation/start_exam_allocation`
  },
  Report: {
    getPersonalAnswer: `${PREFIX}/Report/get-personal-answer`,
    getMatchImage: `${PREFIX}/Report/get-matching-album`,
    getChaireNumber: `${PREFIX}/Report/get-seating-number`,
    getAttendance: `${PREFIX}/Report/get-attendance`,
    getSubsiteHelp: `${PREFIX}/Report/get-subsite-help`,
    getAllScopes: `${PREFIX}/Report/get-exam-export`,
    getAllAnware: `${PREFIX}/Report/get-total-personal-answers`,
    getAllfinalExam: `${PREFIX}/Report/get-final-excel`
  },

  Booklet: {
     getAllBooklet: `${PREFIX}/Booklet/get-all-booklets-pagination?ExamId=1&PageSize=99999999`,
   uploadAnswerKeys: (examId) => `${PREFIX}/Booklet/${examId}/upload-answer-keys`,
    getAnswareKeyStatus: `${PREFIX}/Booklet/upload-answer-keys-status/`,
    processAnswerKeys: `${PREFIX}/Booklet/process-answer-keys?id=`,
    processAnswerKeysStatus: `${PREFIX}/   Booklet/process-answer-keys-status?trackingId=`
  },
  BookletKeys: {
    getallBookletKeys: `${PREFIX}/BookletAnswerKey/get-all-booklet-answer-keys-pagination?ExamId=1&PageSize=999999`,
    getBookletAnswareKeys: `${PREFIX}/BookletAnswerKey/get-booklet-answer-key?Id=`,
    getBookletKeys: `${PREFIX}/BookletAnswerKey/get-booklet-answer-key?Id=`,
    createBookKetAnswareKey: `${PREFIX}/BookletAnswerKey/create-booklet-answer-key`,
    removerAnswareKey: `${PREFIX}/BookletAnswerKey/delete-booklet-answer-key`,
    updateAnswareKey: `${PREFIX}/BookletAnswerKey/update-booklet-answer-key`
  },
  BookletJob: {
    getAllBookletJobs: `${PREFIX}/BookletJob/get-all-booklet-jobs`,
    getAllBookletJobsPagination: `${PREFIX}/BookletJob/get-all-booklet-jobs-pagination?PageSize=999999`,
    getBookletJobId: `${PREFIX}/BookletJob/get-booklet-job?Id=`,
    createBookletJob: `${PREFIX}/BookletJob/create-booklet-job`,
    updateBookletJob: `${PREFIX}/BookletJob/update-booklet-job`,
    deleteBookletJob: `${PREFIX}/BookletJob/delete-booklet-job`
  },
  BookletQuestion: {
    getAllBookletQuestions: `${PREFIX}/BookletQuestion/get-all-booklet-questions`,
    getAllBookletQuestionsPagination: `${PREFIX}/BookletQuestion/get-all-booklet-questions-pagination?PageSize=999999999999`,
    getBookletQuestionId: `${PREFIX}/BookletQuestion/get-booklet-question?Id=`,
    createBookletQuestion: `${PREFIX}/BookletQuestion/create-booklet-question`,
    updateBookletQuestion: `${PREFIX}/BookletQuestion/update-booklet-question`,
    deleteBookletQuestion: `${PREFIX}/BookletQuestion/delete-booklet-question`
  },
  BookletQuestionSection: {
    getAllBookletQuestionsSection: `${PREFIX}/BookletQuestionSection/get-all-booklet-question-sections`,
    getAllBookletQuestionSectionPagination: `${PREFIX}/BookletQuestionSection/get-all-booklet-question-sections-pagination?PageSize=9999999999`,
    getAllBookletQuestionSectionId: `${PREFIX}/BookletQuestionSection/get-booklet-question-section?Id=`,
    createBookletQuestionSection: `${PREFIX}/BookletQuestionSection/create-booklet-question-section`,
    updateBookletQuestionSection: `${PREFIX}/BookletQuestionSection/update-booklet-question-section`,
    deleteBookletQuestionSection: `${PREFIX}/BookletQuestionSection/delete-booklet-question-section`
  },
  /*************************************************************smaple*******************************************************************/ report:
    {
      createReport: `${PREFIX}/Report/create-report`,
      updateReport: `${PREFIX}/Report/update-report`,
      removeReport: `${PREFIX}/Report/delete-report`,
      getAllReports: `${PREFIX}/Report/get-all-reports`,
      executeReports: `${PREFIX}/Report/execute-report`,
      exportExcel: `${PREFIX}/Report/export-excel`,
      stramExport: `${PREFIX}/Report/export-excel-stram`
    },

  category: {
    getAllCategory: `${PREFIX}/Category/get-all-categories`,
    createCategory: `${PREFIX}/Category/create-category`,
    removeCategory: `${PREFIX}/Category/delete-category`,
    updateCategory: `${PREFIX}/Category/update-category`
  },
  userManager: {
    readUsers: `${PREFIX}/UserManager/read-user`,
    setUserPanelType: `${PREFIX}/UserManager/set-user-panel-type`,
    updateUserPanel: `${PREFIX}/UserManager/update-user`,
    addRoleToUser: `${PREFIX}/UserManager/add-role-to-user`,
    readUserRole: `${PREFIX}/UserManager/read-user-role`,
    createUser: `${PREFIX}/UserManager/create-user`,
    removeUser: `${PREFIX}/UserManager/delete-user`
  },
  panelType: {
    readTypes: `${PREFIX}/PanelType/get-all-panel-types`
  },
  roleManager: {
    createRole: `${PREFIX}/RoleManager/create-role`,
    readRoles: `${PREFIX}/RoleManager/read-role`,
    deleteRole: `${PREFIX}/RoleManager/delete-role`,
    updateRole: `${PREFIX}/RoleManager/update-role`
  },
  ReportPermission: {
    getReportPermissionsOfRole: `${PREFIX}/ReportPermission/get-report-permissions-of-role`,
    setReportPermissionsToRole: `${PREFIX}/ReportPermission/set-report-permissions-to-role`,
    getReportPermissionsToCategory: `${PREFIX}/ReportPermission/get-category-permissions-of-user`,
    setReportPermissionsToCategory: `${PREFIX}/ReportPermission/set-category-permissions-to-user`
  }
}
