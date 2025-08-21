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
 dustyStatus:{
  getDutystatus: `${PREFIX}/MilitaryState/get-all-military-states`,
    createDutystatus: `${PREFIX}/MilitaryState/create-military-state`,
      updateDutystatus: `${PREFIX}/MilitaryState/update-military-state`,
       removeDutystatus: `${PREFIX}/MilitaryState/delete-military-state`
 }/*************************************************************smaple*******************************************************************/,
  report: {
    createReport: `${PREFIX}/Report/create-report`,
    updateReport: `${PREFIX}/Report/update-report`,
    removeReport: `${PREFIX}/Report/delete-report`,
    getAllReports: `${PREFIX}/Report/get-all-reports`,
    executeReports: `${PREFIX}/Report/execute-report`,
    exportExcel: `${PREFIX}/Report/export-excel`,
    stramExport:`${PREFIX}/Report/export-excel-stram`
  },
  controlPanel: {

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
    getReportPermissionsOfRole:`${PREFIX}/ReportPermission/get-report-permissions-of-role`,
    setReportPermissionsToRole :`${PREFIX}/ReportPermission/set-report-permissions-to-role`,
    getReportPermissionsToCategory:`${PREFIX}/ReportPermission/get-category-permissions-of-user`,
    setReportPermissionsToCategory :`${PREFIX}/ReportPermission/set-category-permissions-to-user`
  }
}
