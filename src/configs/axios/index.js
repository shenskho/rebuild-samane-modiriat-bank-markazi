import axios from 'axios'
import NProgress from 'nprogress'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
import EventBus from '@utility/EventBus'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    NProgress.start()
    return config
  },
  function (error) {
    // Do something with request error
    NProgress.done()
    toast((t) => <ToastContent t={t} message={error.message} />, {
      duration: 5000,
      style: {
        background: 'var(--bs-danger)',
        color: 'var(--bs-white)'
      }
    })
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done()
    const disallowedControllers = ['Emta', 'Login']
    const disallowedMethods = []
    if (
      response.config.method !== 'get' &&
      !disallowedControllers.includes(response.config.url.split('/')[3]) &&
      !disallowedMethods.includes(
        // prettier-ignore
        response.config.url.split('/')[4].includes('?') ? response.config.url.split('/')[4].slice(0, response.config.url.split('/')[4].indexOf('?')) : response.config.url.split('/')[4]
      )
    ) {
      if (response && response.data && response.data.message) {
  
        const farsiMessage = response.data.message

        toast((t) => <ToastContent t={t} message={farsiMessage || response.statusText} />, {
          duration: 5000,
          style: {
            background: 'var(--bs-success)',
            color: 'var(--bs-white)'
          }
        })
      }
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done()
    if (error.response?.status === 302) {
      EventBus.dispatch('redirectMaintenance', error.response.data.result)
    }
    if (error.response?.status === 401) {
      EventBus.dispatch('forceLogout')
    }
    if (error.response?.status === 409) {
 
      toast((t) => <ToastContent t={t} message={error.response?.data.message} />, {
        duration: 5000,
        style: {
          background: 'var(--bs-danger)',
          color: 'var(--bs-white)'
        }
      })
    }

    if (error.response?.status !== 302 && error.response?.status !== 401) {
      if (error && error.response && error.response.data && error.response.data.message) {
        const farsiMessage = error.response.data.message.find((item) => item.messageLanguage === 1)?.message
        const englishMessage = error.response.data.message.find((item) => item.messageLanguage === 0)?.message
        toast((t) => <ToastContent t={t} message={farsiMessage || englishMessage || error.message} />, {
          duration: 5000,
          style: {
            background: 'var(--bs-danger)',
            color: 'var(--bs-white)'
          }
        })
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
