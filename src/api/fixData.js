import axios from '@configs/axios'
import urls from './urls'

export async function getDutystatus() {
  return await axios.get(urls.dustyStatus.getDutystatus)
}
export async function createDutystatus(param) {
  return await axios.post(urls.dustyStatus.createDutystatus, param)
}
export async function updateDutystatus(param) {
  return await axios.post(urls.dustyStatus.updateDutystatus, param)
}
export async function removeDutystatus(param) {
  return await axios.post(urls.dustyStatus.removeDutystatus, param)
}
