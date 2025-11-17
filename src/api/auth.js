import axios from '@configs/axios';
import urls from './urls';

// تابع Login موجود را با منطق جدید جایگزین می‌کنیم
export async function login(credentials) {
  const response = await axios.post(urls.authentication.login, credentials);

  // فرض می‌کنیم پاسخ شامل یک فیلد توکن است
  // شما باید کلید دقیق توکن را با توجه به پاسخ واقعی API خودتان تنظیم کنید
  if (response.data && response.data.result.token) {
    localStorage.setItem('token', response.data.result.token);
  }

  return response;
}


export async function Login(parameter) {
  return await axios.post(urls.authentication.login, parameter)
}
// بقیه توابع بدون تغییر باقی می‌مانند
export async function Logout() {
  return await axios.get(urls.authentication.logout);
}
export async function signUp(data) {
  return await axios.post(urls.authentication.signUp, data);
}
export async function signInWithsso(data) {
  return await axios.post(urls.authentication.signInWithsso, data);
}
