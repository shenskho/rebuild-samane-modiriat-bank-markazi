import axios from '@configs/axios'
import urls from './urls'
import axiosfile from '@configs/axios/fileAxios'

//////////////////////////////////////////////

export async function getScopeusers() {
  return await axios.get(urls.Ticket.getScopeusers)
}
export async function createScopeTicket(param) {
  return await axios.post(urls.Ticket.createScopeTicket, param)
}
export async function getScopeTicket(param) {
  return await axios.get(urls.Ticket.getScopeTicket + param)
}
export async function getUser(param) {
  return await axios.get(urls.Ticket.getUser + param)
}
/////////////////////ScoreRatio/////////////////////

export async function getMeetingRecordType() {
  return await axios.get(urls.MeetingRecordType.getMeetingRecordType)
}
export async function createMeetingRecordType(param) {
  return await axios.post(urls.MeetingRecordType.createMeetingRecordType, param)
}
export async function updateMeetingRecordType(param) {
  return await axios.post(urls.MeetingRecordType.updateMeetingRecordType, param)
}
export async function removeMeetingRecordType(param) {
  return await axios.post(urls.MeetingRecordType.removeMeetingRecordType, param)
}

export async function createMeetingRecord(param) {
  return await axios.post(urls.MeetingRecord.createMeetingRecord, param)
}

export async function getMeetingRecord(param) {
  return await axios.get(urls.MeetingRecord.getMeetingRecord + param)
}

export async function updateMeetingRecord(param) {
  return await axios.post(urls.MeetingRecord.updateMeetingRecord, param)
}

export async function removeMeetingRecord(param) {
  return await axios.post(urls.MeetingRecord.removeMeetingRecord, param)
}

export async function uploadFile(param) {
  return await axiosfile.post(urls.file.uploadFile, param)
}
export async function uploadLargeFile(param) {
  return await axiosfile.post(urls.file.uploadLargeFile, param)
}

export async function readFile(param) {
  return await axios.get(urls.file.readFile + param)
}
