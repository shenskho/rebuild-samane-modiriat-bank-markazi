import axios from '@configs/axios'
import urls from './urls'

////////////////////////ExternalImports////////////
export async function getProvince() {
  return await axios.get(urls.Province.getProvince)
}

export async function getactivity() {
  return await axios.get(urls.activity.getactivity)
}
export async function getEducationLevel() {
  return await axios.get(urls.EducationLevel.getEducationLevel)
}



/////////////////////ScoreRatio/////////////////////
export async function getScoreRatio() {
  return await axios.get(urls.ScoreRatio.getScoreRatio)
}
export async function createScoreRatio(param) {
  return await axios.post(urls.ScoreRatio.createScoreRatio, param)
}
export async function updateScoreRatio(param) {
  return await axios.post(urls.ScoreRatio.updateScoreRatio, param)
}
export async function removeScoreRatio(param) {
  return await axios.post(urls.ScoreRatio.removeScoreRatio, param)
}
///////////////////ExamAgency/////////////
export async function getExamAgency() {
  return await axios.get(urls.ExamAgency.getExamAgency)
}
export async function createExamAgency(param) {
  return await axios.post(urls.ExamAgency.createExamAgency, param)
}
export async function updateExamAgency(param) {
  return await axios.post(urls.ExamAgency.updateExamAgency, param)
}
export async function removeExamAgency(param) {
  return await axios.post(urls.ExamAgency.removeExamAgency, param)
}
////////////////////////////ComplementEvaluationAgency///////////////////
export async function getComplementEvaluationAgency() {
  return await axios.get(urls.ComplementEvaluationAgency.getComplementEvaluationAgency)
}
export async function createComplementEvaluationAgency(param) {
  return await axios.post(urls.ComplementEvaluationAgency.createComplementEvaluationAgency, param)
}
export async function updateComplementEvaluationAgency(param) {
  return await axios.post(urls.ComplementEvaluationAgency.updateComplementEvaluationAgency, param)
}
export async function removeComplementEvaluationAgency(param) {
  return await axios.post(urls.ComplementEvaluationAgency.removeComplementEvaluationAgency, param)
}
///////////////////////EducationField//////////////////
export async function getEducationField() {
  return await axios.get(urls.EducationField.getEducationField)
}
export async function createEducationField(param) {
  return await axios.post(urls.EducationField.createEducationField, param)
}
export async function updateEducationField(param) {
  return await axios.post(urls.EducationField.updateEducationField, param)
}
export async function removeEducationField(param) {
  return await axios.post(urls.EducationField.removeEducationField, param)
}
//////////////////Job///////////////
export async function getJob() {
  return await axios.get(urls.Job.getJob)
}
export async function createJob(param) {
  return await axios.post(urls.Job.createJob, param)
}
export async function updateJob(param) {
  return await axios.post(urls.Job.updateJob, param)
}
export async function removeJob(param) {
  return await axios.post(urls.Job.removeJob, param)
}
/////////////////////SelectionState///////////////////
export async function getSelectionState() {
  return await axios.get(urls.SelectionState.getSelectionState)
}
export async function createSelectionState(param) {
  return await axios.post(urls.SelectionState.createSelectionState, param)
}
export async function updateSelectionState(param) {
  return await axios.post(urls.SelectionState.updateSelectionState, param)
}
export async function removeSelectionState(param) {
  return await axios.post(urls.SelectionState.removeSelectionState, param)
}
////////////////AgencyCategory/////////////
export async function getAgencyCategory() {
  return await axios.get(urls.AgencyCategory.getAgencyCategory)
}
export async function createAgencyCategory(param) {
  return await axios.post(urls.AgencyCategory.createAgencyCategory, param)
}
export async function updateAgencyCategory(param) {
  return await axios.post(urls.AgencyCategory.updateAgencyCategory, param)
}
export async function removeAgencyCategory(param) {
  return await axios.post(urls.AgencyCategory.removeAgencyCategory, param)
}
//////////////////University///////////////
export async function getUniversity() {
  return await axios.get(urls.University.getUniversity)
}
export async function createUniversity(param) {
  return await axios.post(urls.University.createUniversity, param)
}
export async function updateUniversity(param) {
  return await axios.post(urls.University.updateUniversity, param)
}
export async function removeUniversity(param) {
  return await axios.post(urls.University.removeUniversity, param)
}




