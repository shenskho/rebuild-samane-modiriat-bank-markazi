import axios from '@configs/axios'
import urls from './urls'
import axiosfile from '@configs/axios/fileAxios'
/////////////////////ScoreRatio/////////////////////

export async function getTickets() {
  return await axios.get(urls.Ticket.getTickets)
}
export async function answareTicket(param) {
  return await axios.post(urls.Ticket.answareTicket, param)
}
export async function takeTicket(param) {
  return await axios.post(urls.Ticket.takeTicket, param)
}
export async function getScopeTicket(param) {
  return await axios.get(urls.Ticket.getScopeTicket + param)
}
export async function getUser(param) {
  return await axios.get(urls.Ticket.getUser + param)
}

export async function editUser(param) {
  return await axios.post(urls.Ticket.editUser, param)
}

export async function getApplicantChanges(param) {
  return await axios.get(urls.Ticket.getApplicantChanges + param)
}

export async function uploadFile(param) {
  return await axiosfile.post(urls.file.uploadFile, param)
}

export async function readFile(param) {
  return await axios.get(urls.file.readFile + param)
}

export async function getMeetingRecordReport() {
  return await axios.get(urls.MeetingRecord.getMeetingRecordReport)
}

export async function getMeetingRecord() {
  return await axios.get(urls.MeetingRecord.getMeetingRecord)
}

export async function createMeetingRecord(param) {
  return await axios.post(urls.MeetingRecord.createMeetingRecord, param)
}
export async function updateMeetingRecord(param) {
  return await axios.post(urls.MeetingRecord.updateMeetingRecord, param)
}

export async function removeMeetingRecord(param) {
  return await axios.post(urls.MeetingRecord.removeMeetingRecord, param)
}
