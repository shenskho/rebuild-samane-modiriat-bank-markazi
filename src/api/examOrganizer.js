import axios from '@configs/axios'
import urls from './urls'
// import axiosfile from '@configs/axios/fileAxios'

/////////////////////ScoreRatio/////////////////////

export async function getQuarantineAllSubSutes(param) {
  return await axios.get(urls.PrintQuarantine.getQuarantineAllSubSutes + param)
}

export async function setPrintQuarantineOfSubSite(param) {
  return await axios.post(urls.PrintQuarantine.setPrintQuarantineOfSubSite, param)
}

export async function getQuarantineOfSubSite(param) {
  return await axios.get(urls.PrintQuarantine.getQuarantineOfSubSite + param)
}

export async function setRecevierInfo(param) {
  return await axios.post(urls.PrintQuarantine.setRecevierInfo, param)
}
export async function getRemainingReport(param) {
  return await axios.get(urls.PrintQuarantine.getRemainingReport + param)
}
// export async function uploadFile(param) {
//   return await axiosfile.post(urls.file.uploadFile, param)
// }

// export async function readFile(param) {
//   return await axiosfile.get(urls.file.readFile + param)
// }
