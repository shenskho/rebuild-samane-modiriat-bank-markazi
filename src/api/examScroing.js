import axios from '@configs/axios'
import urls from './urls'


export async function saveExamScroring(param) {
  return await axios.post(urls.ExamScoringRule.saveExamScroring, param)
}
export async function getAllExamScroring() {
  return await axios.get(urls.ExamScoringRule.getAllExamScroring)
}
export async function createExamScroring(param) {
  return await axios.post(urls.ExamScoringRule.createExamScroring, param)
}
export async function updateExamScroring(param) {
  return await axios.post(urls.ExamScoringRule.updateExamScroring, param)
}
export async function removeExamScroring(param) {
  return await axios.post(urls.ExamScoringRule.removeExamScroring, param)
}
