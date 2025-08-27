import axios from '@configs/axios'
import urls from './urls'
import axiosfile from '@configs/axios/fileAxios'
/////////////////////ScoreRatio/////////////////////
export async function getlicenses() {
  return await axios.get(urls.license.getlicenses)
}
export async function createlicense(param) {
  return await axios.post(urls.license.createlicense, param)
}
export async function updatelicense(param) {
  return await axios.post(urls.license.updatelicense, param)
}
export async function removelicense(param) {
  return await axios.post(urls.license.removelicense, param)
}

export async function uploadFile(param) {
  return await axiosfile.post(urls.file.uploadFile, param)
}

export async function readFile(param) {
  return await axiosfile.get(urls.file.readFile + param)
}
