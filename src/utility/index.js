import { format, formatDistance } from 'date-fns-jalali'
import { faIR } from 'date-fns-jalali/locale'
import { DateObject } from 'react-multi-date-picker'
import { DefaultRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('token')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = () => {
  // if (['Admin', 'Test'].includes(userRole)) return DefaultRoute
  // else if (['Applicant', 'Employer'].includes(userRole)) return '/grant/home'
  // //  else if (['Outer-Inspector', 'Central-Inspector', 'Central-Inspector-Secretariat', 'Central-Inspector-Violation-Reviewer', 'Central-Inspector-Call-Center'].includes(userRole)) return '/inspection/home'
  // else if (userRole === 'Outer-Inspector') return '/inspection/periodic-inspection'
  // else 
  return '/home'
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#04364a', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const NotEmpty = (value) => value && value !== ''
export const simpleDomain = (value) => {
  return value.match(
    new RegExp(
      /(?!(^[^a-vx-zA-VX-Z0-9-][^a-vx-zA-VX-Z0-9-][^a-vx-zA-VX-Z0-9-]\..*))(?=^[\u0622-\u06f9\w\d\-\.]{2,63}\.[\w]{2,63}$)/
    )
  )
}
export const persianString = (value) => value.match(new RegExp(/^[\u0600-\u06FF\s\d]+$/))
export const englishString = (value) => value.match(new RegExp(/^[a-zA-Z0-9-\s]*$/))
export const irPostalCode = (value) => value.match(new RegExp(/^[0-9]{10}$/))
export const email = (value) => value.match(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))

export function removeUndifinedValues(data) {
  for (const key in data) {
    if (data[key] === '' || data[key] === undefined || data[key] === null) {
      delete data[key]
    }
  }
  return data
}

export const convertTimestampToJalaliDate = (date, dataFormat = 'yyyy/MM/dd-HH:mm:ss') => {
  return format(new Date(date), dataFormat)
}
export const getformatDistanceToFutureDate = (date, futureDate) => {
  // prettier-ignore
  return date < futureDate ? formatDistance(new Date(date), new Date(futureDate), { locale: faIR, includeSeconds: true }) : 0
}
export const convertDatePickerDateObjectToISOString = (value) => {
  return value instanceof DateObject ? new Date(parseInt(JSON.stringify(value))).toISOString() : value
}
export const toPersianDigits = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}
