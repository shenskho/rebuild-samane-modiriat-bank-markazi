import axios from '@configs/axios'
import urls from './urls'
import axiosfile from '@configs/axios/fileAxios'
/////////////////////ScoreRatio/////////////////////

export async function getTickets(page, pageSize) {
  return await axios.get(`${urls.Ticket.getTickets}?PageSize=${pageSize}&Page=${page}`)
}
export async function answareTicket(param) {
  return await axios.post(urls.Ticket.answareTicket, param)
}
export async function takeTicket(param) {
  return await axios.post(urls.Ticket.takeTicket, param)
}

export async function getTicket(param) {
  return await axios.get(urls.Ticket.getTicket + param)
}

export async function getUser(param) {
  return await axios.get(urls.Ticket.getUser + param)
}

export async function editUser(param) {
  return await axios.post(urls.Ticket.editUser, param)
}
export async function uploadFile(param) {
  return await axiosfile.post(urls.file.uploadFile, param)
}

export async function readFile(param) {
  return await axios.get(urls.file.readFile + param)
}
