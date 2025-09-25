import axios from '@configs/axios'
import urls from './urls'
import axiosfile from '@configs/axios/fileAxios'

export async function uploadAnswerKeys(param,examId) {
  console.log(param + "|"+ examId)
  return await axiosfile.post(urls.Booklet.uploadAnswerKeys(examId), param)
}

export async function getAnswareKeyStatus(param) {
  return await axios.get(urls.Booklet.getAnswareKeyStatus + param)
}
export async function processAnswerKeys(param) {
  return await axios.post(urls.Booklet.processAnswerKeys, param)
}
export async function processAnswerKeysStatus(param) {
  return await axios.get(urls.Booklet.processAnswerKeysStatus + param)
}

////////////////////////BookletAnswerKey//////////////////
export async function getallBookletKeys(param) {
  return await axiosfile.post(urls.BookletKeys.getallBookletKeys, param)
}

export async function getBookletAnswareKeys(param) {
  return await axios.get(urls.BookletKeys.getBookletAnswareKeys + param)
}
export async function getBookletKeys(param) {
  return await axios.get(urls.BookletKeys.getBookletKeys + param)
}
export async function createBookKetAnswareKey(param) {
  return await axios.get(urls.BookletKeys.createBookKetAnswareKey + param)
}
export async function removerAnswareKey(param) {
  return await axios.get(urls.BookletKeys.removerAnswareKey + param)
}
export async function updateAnswareKey(param) {
  return await axios.get(urls.BookletKeys.updateAnswareKey + param)
}
/////////////////////BookletJob////////////////////
export async function getAllBookletJobs(param) {
  return await axios.get(urls.BookletJob.getAllBookletJobs , param)
}
export async function getAllBookletJobsPagination(param) {
  return await axios.get(urls.BookletJob.getAllBookletJobsPagination + param)
}
export async function getBookletJobId(param) {
  return await axios.get(urls.BookletJob.getBookletJobId + param)
}
export async function createBookletJob(param) {
  return await axios.post(urls.BookletJob.createBookletJob , param)
}
export async function updateBookletJob(param) {
  return await axios.post(urls.BookletJob.updateBookletJob , param)
}
export async function deleteBookletJob(param) {
  return await axios.post(urls.BookletJob.deleteBookletJob , param)
}
////////////////////////BookletQuestion/////////////////////
export async function getAllBookletQuestions(param) {
  return await axios.get(urls.BookletQuestion.getAllBookletQuestions , param)
}
export async function getAllBookletQuestionsPagination(param) {
  return await axios.get(urls.BookletQuestion.getAllBookletQuestionsPagination + param)
}
export async function getBookletQuestionId(param) {
  return await axios.get(urls.BookletQuestion.getBookletQuestionId + param)
}
export async function createBookletQuestion(param) {
  return await axios.post(urls.BookletQuestion.createBookletQuestion , param)
}
export async function updateBookletQuestion(param) {
  return await axios.post(urls.BookletQuestion.updateBookletQuestion , param)
}
export async function deleteBookletQuestion(param) {
  return await axios.post(urls.BookletQuestion.deleteBookletQuestion , param)
}
/////////////////////BookletQuestionSection/////////////////////
export async function getAllBookletQuestionsSection(param) {
  return await axios.get(urls.BookletQuestionSection.getAllBookletQuestionsSection , param)
}
export async function getAllBookletQuestionSectionPagination(param) {
  return await axios.get(urls.BookletQuestionSection.getAllBookletQuestionSectionPagination + param)
}
export async function getAllBookletQuestionSectionId(param) {
  return await axios.get(urls.BookletQuestionSection.getAllBookletQuestionSectionId + param)
}
export async function createBookletQuestionSection(param) {
  return await axios.post(urls.BookletQuestionSection.createBookletQuestionSection , param)
}
export async function updateBookletQuestionSection(param) {
  return await axios.post(urls.BookletQuestionSection.updateBookletQuestionSection , param)
}
export async function deleteBookletQuestionSection(param) {
  return await axios.post(urls.BookletQuestionSection.deleteBookletQuestionSection , param)
}
// export async function deleteBookletQuestionSection(param) {
//   return await axios.post(urls.BookletQuestionSection.deleteBookletQuestionSection , param)
// }
/////////////////////
