import axios from '@configs/axios'
import urls from './urls'



export async function readTypes() {
  return await axios.get(urls.panelType.readTypes)
}


////////////UseMannager
export async function readUsers(data) {
  return await axios.post(urls.userManager.readUsers,data)
}
export async function setUserPanelType(data) {
  return await axios.post(urls.userManager.setUserPanelType, data)
}

///////////////controlPanel
export async function createRole(data) {
  return await axios.post(urls.roleManager.createRole, data)
}
export async function readRoles() {
  return await axios.get(urls.roleManager.readRoles)
}
export async function deleteRole(data) {
  return await axios.post(urls.roleManager.deleteRole, data)
}
export async function updateRole(data) {
  return await axios.post(urls.roleManager.updateRole, data)
}

export async function getReportPermissionsOfRole(data) {
  return await axios.get(urls.ReportPermission.getReportPermissionsOfRole + data)
}

export async function setReportPermissionsToRole(data) {
  return await axios.post(urls.ReportPermission.setReportPermissionsToRole , data)
}

export async function addRoleToUser(data) {
  return await axios.post(urls.userManager.addRoleToUser , data)
}

export async function readUserRole(data) {
  return await axios.post(urls.userManager.readUserRole , data)
}

export async function getReportPermissionsToCategory(data) {
  return await axios.get(urls.ReportPermission.getReportPermissionsToCategory + data)
}

export async function setReportPermissionsToCategory(data) {
  return await axios.post(urls.ReportPermission.setReportPermissionsToCategory,data )
}

export async function getAllCategory() {
  return await axios.get(urls.category.getAllCategory )
}






