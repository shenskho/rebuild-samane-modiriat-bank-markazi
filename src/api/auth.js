import axios from '@configs/axios'
import urls from './urls'

export async function Login(parameter) {
  return await axios.post(urls.authentication.login, parameter)
}
export async function Logout() {
  return await axios.get(urls.authentication.logout)
}
export async function signUp(data) {
  return await axios.post(urls.authentication.signUp, data)
}
export async function signInWithsso(data) {
  return await axios.post(urls.authentication.signInWithsso, data)
}






