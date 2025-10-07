import axios from '@configs/axios'
import urls from './urls'
import axiosfile from '@configs/axios/fileAxios'

export async function uploadAnswerCandidate(param, examId) {
  return await axiosfile.post(urls.CandidateAnswer.uploadAnswerCandidate(examId), param)
}

export async function getAnswareCandidateStatus(param) {
  return await axios.get(urls.CandidateAnswer.getAnswareCandidateStatus + param)
}
export async function processAnswerCandidate(param) {
  return await axios.post(urls.CandidateAnswer.processAnswerCandidate + param)
}
export async function processAnswerCandidateStatus(param) {
  return await axios.get(urls.CandidateAnswer.processAnswerCandidateStatus + param)
}
export async function getAllCandidate(param) {
  return await axios.get(`${urls.CandidateAnswer.getAllCandidate}Page=${param.page}&PageSize=${param.pageSize}&CandidateId=${param.search}`)
}

export async function getAlExel() {
  return await axiosfile.get(urls.CandidateAnswer.getAlExel, {
    headers: {
      Authorization: localStorage.getItem('token'),
      language: 1
    },
    responseType: 'blob' // مهم: دریافت باینری واقعی
  })
}

export async function getUserExcel(param) {
  return await axiosfile.get(urls.CandidateAnswer.getUserExcel + param, {
    headers: {
      Authorization: token,
      language: 1
    },
    responseType: 'blob' // مهم: دریافت باینری واقعی
  })
}
export async function processFinalResultStart() {
  return await axios.post(urls.CandidateAnswer.processFinalResultStart)
}
export async function processFinalResultStartStatus(param) {
  return await axios.get(urls.CandidateAnswer.processFinalResultStartStatus + param)
}
export async function downloadCandidateAnsware(param) {
  const token = localStorage.getItem('token')
  return await axiosfile.get(urls.CandidateAnswer.downloadCandidateAnsware + param, {
    headers: {
      Authorization: token,
      language: 1
    },
    responseType: 'blob' // مهم: دریافت باینری واقعی
  })
}

// getUserExcel: `${PREFIX}/CandidateAnswerResult/initial-correction-excel?ExamId=1&NationalCode=`,
//   processFinalResultStart: `${PREFIX}/CandidateAnswerResult/all-initial-corrections-zip?examId=1`,
//     processFinalResultStartStatus: `${PREFIX}/CandidateAnswerResult/all-initial-corrections-zip-status?trackingId=`,
//       downloadCandidateAnsware: `${PREFIX}/CandidateAnswerResult/all-initial-corrections-zip-download?trackingId=`
