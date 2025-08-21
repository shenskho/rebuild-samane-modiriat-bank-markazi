import React from 'react'
import { format, parse } from 'date-fns-jalali'
import { faIR } from 'date-fns-jalali/locale'
import { toPersianDigits } from '@utility'
import { Link } from 'react-router-dom'

const SidebarSection = ({ events }) => { 
   const today = new Date()
  const todayStr = format(today, 'yyyy/MM/dd', { locale: faIR })
  const todayFormatted = toPersianDigits(format(today, 'd MMMM yyyy', { locale: faIR }))

  const todayEvents = events.filter((e) => e.date === todayStr)

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = parse(event.date, 'yyyy/MM/dd', new Date(), {
        locale: faIR
      })
      return eventDate > today
    })
    .sort((a, b) => {
      const dateA = parse(a.date, 'yyyy/MM/dd', new Date(), { locale: faIR })
      const dateB = parse(b.date, 'yyyy/MM/dd', new Date(), { locale: faIR })
      return dateA - dateB
    }).slice(0, 3)
   return (
    <div className='dashboard-sidebar'>
      <div className='reportBtnContainer'>
        <button className='reportBtn'>
          <a href='https://report.devrayan.ir/' target='_blank' rel='noopener noreferrer'>
            گزارش ساز
          </a>
        </button>
      </div>
      <div className='today-events-box'>
        <h3>امروز: {todayFormatted}</h3>
        {todayEvents.length > 0 ? (
          <ul>
            {todayEvents.map((event) => (
              <li key={event.id}>
                {event.title} {event.isDefault && <span className='default-tag'>(پیش‌فرض)</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p>رویدادی برای امروز وجود ندارد.</p>
        )}
      </div>
      <div className='upcoming-events-box'>
        <h3>رویدادهای پیش‌رو:</h3>
        {upcomingEvents.length > 0 ? (
          <ul>
            {upcomingEvents.map((event) => {
              const eventDate = parse(event.date, 'yyyy/MM/dd', new Date(), {
                locale: faIR
              })
              const formattedDate = toPersianDigits(format(eventDate, 'd MMMM yyyy', { locale: faIR }))
              return (
                <li key={event.id}>
                  <span className='event-date'>{formattedDate}: </span>
                  {event.title} {event.isDefault && <span className='default-tag'>(پیش‌فرض)</span>}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>رویداد پیش‌رو وجود ندارد.</p>
        )}
      </div>
      <div className='dashboardNotification'>
        <h3>ورود به صفحه ی مدیریت کاربران</h3>
        <div className='dashboardNotificationButton'>
          <Link to='/AccessLevel'>
            <button>ورود</button>
          </Link>
          {/* <Link to="/AccessManager">
            <button>سطح دسترسی</button>
          </Link> */}
        </div>
      </div>
    </div>
  )

}

export default SidebarSection
