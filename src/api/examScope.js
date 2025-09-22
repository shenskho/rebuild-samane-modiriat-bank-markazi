import axios from '@configs/axios'
import axiosBlob from '@configs/axios/getBlob'
import urls from './urls'

/////////////////////ExamScopeMain/////////////////////
export async function getExamScope() {
  return await axios.get(urls.ExamScopeMain.getExamScope)
}
export async function createExamScope(param) {
  return await axios.post(urls.ExamScopeMain.createExamScope, param)
}
export async function updateExamScope(param) {
  return await axios.post(urls.ExamScopeMain.updateExamScope, param)
}
export async function removeExamScope(param) {
  return await axios.post(urls.ExamScopeMain.removeExamScope, param)
}
/////////////////////////extra/////////////////////////////

export async function getProvince() {
  return await axios.get(urls.Province.getProvince)
}
export async function getCity(param) {
  return await axios.get(urls.City.getCity + param)
}

/////////////////////////secound/////////////////////////////

export async function getExamScopeSecound() {
  return await axios.get(urls.ExamScopeSecound.getExamScopeSecound)
}

export async function getExamScopeSecoundList() {
  return await axios.get(urls.ExamScopeSecound.getExamScopeSecoundList)
}



export async function createExamScopeSecound(param) {
  return await axios.post(urls.ExamScopeSecound.createExamScopeSecound, param)
}

export async function updateExamScopeSecound(param) {
  return await axios.post(urls.ExamScopeSecound.updateExamScopeSecound, param)
}

export async function removeExamScopeSecound(param) {
  return await axios.post(urls.ExamScopeSecound.removeExamScopeSecound, param)
}

///////////////////////ExamAllocation///////////////////////

export async function setExamAllocation(param) {
  return await axios.post(urls.ExamAllocation.setExamAllocation, param)
}

/////////////////////Reports///////////////////

export async function getPersonalAnswer(param) {
  return await axios.get(urls.Report.getPersonalAnswer + param)
}

export async function getMatchImage(param) {
  return await axios.get(urls.Report.getMatchImage + param)
}

export async function getChaireNumber(param) {
  return await axios.get(urls.Report.getChaireNumber + param)
}

export async function getAttendance(param) {
  return await axios.get(urls.Report.getAttendance + param)
}

export async function getSubsiteHelp(param) {
  return await axiosBlob.get(urls.Report.getSubsiteHelp + param)
}
export async function getAllScopes(param) {
  return await axiosBlob.get(urls.Report.getAllScopes + param)
}

export async function getAllAnware(param) {
  return await axiosBlob.get(urls.Report.getAllAnware + param)
}

export async function getAllfinalExam(param) {
  return await axiosBlob.get(urls.Report.getAllfinalExam + param)
}
///////////////////////IntroductionExams//////////////
export async function getIntroductionExams() {
  return await axios.get(urls.IntroductionExams.getIntroductionExams)
}

export async function createIntroductionExams(param) {
  return await axios.post(urls.IntroductionExams.createIntroductionExams, param)
}

export async function updateIntroductionExams(param) {
  return await axios.post(urls.IntroductionExams.updateIntroductionExams, param)
}

export async function removeIntroductionExams(param) {
  return await axios.post(urls.IntroductionExams.removeIntroductionExams, param)
}

