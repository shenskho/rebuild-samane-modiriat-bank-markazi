import axios from '@configs/axios'
import urls from './urls'
/////////////////////DutyStatus/////////////////////
export async function getDutystatus() {
  return await axios.get(urls.dustyStatus.getDutystatus)
}
export async function createDutystatus(param) {
  return await axios.post(urls.dustyStatus.createDutystatus, param)
}
export async function updateDutystatus(param) {
  return await axios.post(urls.dustyStatus.updateDutystatus, param)
}
export async function removeDutystatus(param) {
  return await axios.post(urls.dustyStatus.removeDutystatus, param)
}
/////////////////////Organizations/////////////////////
export async function getOrganizations() {
  return await axios.get(urls.Organization.getOrganizations)
}
export async function createOrganizations(param) {
  return await axios.post(urls.Organization.createOrganizations, param)
}
export async function updateOrganizations(param) {
  return await axios.post(urls.Organization.updateOrganizations, param)
}
export async function removeOrganizations(param) {
  return await axios.post(urls.Organization.removeOrganizations, param)
}
/////////////////////Province/////////////////////
export async function getProvince() {
  return await axios.get(urls.Province.getProvince)
}
export async function createProvince(param) {
  return await axios.post(urls.Province.createProvince, param)
}
export async function updateProvince(param) {
  return await axios.post(urls.Province.updateProvince, param)
}
export async function removeProvince(param) {
  return await axios.post(urls.Province.removeProvince, param)}
/////////////////////EducationLevel///////////
export async function getEducationLevel() {
  return await axios.get(urls.EducationLevel.getEducationLevel)
}
export async function createEducationLevel(param) {
  return await axios.post(urls.EducationLevel.createEducationLevel, param)
}
export async function updateEducationLevel(param) {
  return await axios.post(urls.EducationLevel.updateEducationLevel, param)
}
export async function removeEducationLevel(param) {
  return await axios.post(urls.EducationLevel.removeEducationLevel, param)
}
///////////ًQuota/////////////
export async function getQuota() {
  return await axios.get(urls.Quota.getQuota)
}
export async function createQuota(param) {
  return await axios.post(urls.Quota.createQuota, param)
}
export async function updateQuota(param) {
  return await axios.post(urls.Quota.updateQuota, param)
}
export async function removeQuota(param) {
  return await axios.post(urls.Quota.removeQuota, param)
}
/////////////Religion//////////////////
export async function getReligion() {
  return await axios.get(urls.Religion.getReligion)
}
export async function createReligion(param) {
  return await axios.post(urls.Religion.createReligion, param)
}
export async function updateReligion(param) {
  return await axios.post(urls.Religion.updateReligion, param)
}
export async function removeReligion(param) {
  return await axios.post(urls.Religion.removeReligion, param)
}
///////////EmploymentType////////////////
export async function getEmploymentType() {
  return await axios.get(urls.EmploymentType.getEmploymentType)
}
export async function createEmploymentType(param) {
  return await axios.post(urls.EmploymentType.createEmploymentType, param)
}
export async function updateEmploymentType(param) {
  return await axios.post(urls.EmploymentType.updateEmploymentType, param)
}
export async function removeEmploymentType(param) {
  return await axios.post(urls.EmploymentType.removeEmploymentType, param)
}
////////////UniversityType////////////////
export async function getUniversityType() {
  return await axios.get(urls.UniversityType.getUniversityType)
}
export async function createUniversityType(param) {
  return await axios.post(urls.UniversityType.createUniversityType, param)
}
export async function updateUniversityType(param) {
  return await axios.post(urls.UniversityType.updateUniversityType, param)
}
export async function removeUniversityType(param) {
  return await axios.post(urls.UniversityType.removeUniversityType, param)
}


