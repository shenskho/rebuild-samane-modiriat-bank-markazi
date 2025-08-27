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
  
  file: {
    uploadFile: `${PREFIX}/File/upload-base64-doc`,
    readFile: `${PREFIX}/File/get-base64-doc?`
  },
  license: {
    getlicenses: `${PREFIX}/License/get-all-Licenses`,
    createlicense: `${PREFIX}/License/create-License`,
    updatelicense: `${PREFIX}/License/update-License`,
    removelicense: `${PREFIX}/License/delete-License`
  },
  dustyStatus: {
    getDutystatus: `${PREFIX}/MilitaryState/get-all-military-states`,
    createDutystatus: `${PREFIX}/MilitaryState/create-military-state`,
    updateDutystatus: `${PREFIX}/MilitaryState/update-military-state`,
    removeDutystatus: `${PREFIX}/MilitaryState/delete-military-state`
  },

  Province: {
    getProvince: `${PREFIX}/Province/get-all-provinces`,
    createProvince: `${PREFIX}/Province/create-province`,
    updateProvince: `${PREFIX}/Province/update-province`,
    removeProvince: `${PREFIX}/Province/delete-province`
  },
  Quota: {
    getQuota: `${PREFIX}/Quota/get-all-quotas`,
    createQuota: `${PREFIX}/Quota/create-quota`,
    updateQuota: `${PREFIX}/Quota/update-quota`,
    removeQuota: `${PREFIX}/Quota/delete-quota`
  },
  EducationLevel: {
    getEducationLevel: `${PREFIX}/EducationLevel/get-all-employment-types`,
    createEducationLevel: `${PREFIX}/EducationLevel/create-employment-type`,
    updateEducationLevel: `${PREFIX}/EducationLevel/update-employment-type`,
    removeEducationLevel: `${PREFIX}/EducationLevel/delete-employment-type`
  },
  EmploymentType: {
    getEmploymentType: `${PREFIX}/EmploymentType/get-all-employment-types`,
    createEmploymentType: `${PREFIX}/EmploymentType/create-employment-type`,
    updateEmploymentType: `${PREFIX}/EmploymentType/update-employment-type`,
    removeEmploymentType: `${PREFIX}/EmploymentType/delete-employment-type`
  },
  UniversityType: {
    getUniversityType: `${PREFIX}/UniversityType/get-all-university-types`,
    createUniversityType: `${PREFIX}/UniversityType/create-university-type`,
    updateUniversityType: `${PREFIX}/UniversityType/update-university-type`,
    removeUniversityType: `${PREFIX}/UniversityType/delete-university-type`
  },
  University:{
    getUniversity: `${PREFIX}/University/get-all-universities`,
    createUniversity: `${PREFIX}/University/create-university`,
    updateUniversity: `${PREFIX}/University/update-university`,
    removeUniversity: `${PREFIX}/University/delete-university`
  },
  Religion: {
    getReligion: `${PREFIX}/Religion/get-all-religions`,
    createReligion: `${PREFIX}/Religion/create-religion`,
    updateReligion: `${PREFIX}/Religion/update-religion`,
    removeReligion: `${PREFIX}/Religion/delete-religion`
  },

  organization: {
    getOrganizations: `${PREFIX}/Organization/get-all-organizations`,
    createOrganizations: `${PREFIX}/Organization/create-organization`,
    updateOrganizations: `${PREFIX}/Organization/update-organization`,
    removeOrganizations: `${PREFIX}/Organization/delete-organization`
  },
  ///////////////////////////variableData//////////////////////////
  ScoreRatio: {
    getScoreRatio: `${PREFIX}/ScoreRatio/get-all-score-ratios`,
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
    getComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/get-all-complement-evaluation-agencies`,
    createComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/create-complement-evaluation-agency`,
    updateComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/update-complement-evaluation-agency`,
    removeComplementEvaluationAgency: `${PREFIX}/ComplementEvaluationAgency/delete-complement-evaluation-agency`
  },
  EducationField: {
    getEducationField: `${PREFIX}/EducationField/get-all-education-fields`,
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
  AgencyCategory:{
    getAgencyCategory: `${PREFIX}/AgencyCategory/get-all-agency-categories`,
    createAgencyCategory: `${PREFIX}/AgencyCategory/create-agency-category`,
    updateAgencyCategory: `${PREFIX}/AgencyCategory/update-agency-category`,
    removeAgencyCategory: `${PREFIX}/AgencyCategory/delete-agency-category`
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
    addRoleToUser: `${PREFIX}/UserManager/add-role-to-user`,
    readUserRole: `${PREFIX}/UserManager/read-user-role`
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
