import axios from '@configs/axios'
import urls from './urls'


export async function getTestReport(data) {
  return await axios.post(urls.report.getTestReport, data)
}
export async function getAllReports() {
  return await axios.get(urls.report.getAllReports)
}
export async function executeReports(data) {
  return await axios.post(urls.report.executeReports, data)
}


export async function createReport(data) {
  return await axios.post(urls.report.createReport, data)
}
export async function updateReport(data) {
  return await axios.post(urls.report.updateReport, data)
}
export async function removeReport(data) {
  return await axios.post(urls.report.removeReport, data)
}

export async function exportExcel(data) {
  return await axios.post(urls.report.exportExcel, data)
}
export async function stramExport(data) {
  return await axios.post(urls.report.stramExport, data, {
    responseType: 'blob'
  })
}
