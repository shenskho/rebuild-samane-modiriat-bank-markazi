import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns-jalali'
import { MdModeEdit, MdDelete } from 'react-icons/md'

import { IoIosSave } from 'react-icons/io'
import { faIR } from 'date-fns-jalali/locale'
import { toPersianDigits } from '@utility'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
// import { menuItems } from '../../../SideBar/menuConfig.js/menuConfig'

// const toJalaliDate = (gregorianDate) => {
//   const jalaliDateStr = format(gregorianDate, 'yyyy/MM/dd', { locale: faIR })
//   const [year, month, day] = jalaliDateStr.split('/').map(Number)
//   return { year, month, day }
// }

const CalendarSection = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent, setSelectedTitle, setSelectedChild }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [newEvent, setNewEvent] = useState('')
  const [selectedMenuItem, setSelectedMenuItem] = useState('')
  const [selectedSubMenu, setSelectedSubMenu] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [editingEvent, setEditingEvent] = useState(null)

  const today = new Date()
  const todayStr = format(today, 'yyyy/MM/dd', { locale: faIR })

  const jalaliMonth = format(currentDate, 'MMMM yyyy', { locale: faIR })
  const start = startOfMonth(currentDate)
  const end = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start, end })

  const firstDayOfMonth = (getDay(start) + 1) % 7

  // const filteredMenuItems = menuItems.filter((item) => item.title !== 'خانه' && item.title !== 'دسترسی سریع')

  console.log(
    `Today (22/02/1404): ${format(today, 'EEEE', { locale: faIR })}`,
    `getDay(today): ${(getDay(today) + 1) % 7}`
  )

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleOpenAddModal = (day) => {
    setSelectedDay(day)
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setNewEvent('')
    setSelectedMenuItem('')
    setSelectedSubMenu('')
    setSelectedDay(null)
  }

  const handleOpenEventModal = (day) => {
    setSelectedDay(day)
    setIsEventModalOpen(true)
  }

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false)
    setEditingEvent(null)
    setNewEvent('')
    setSelectedMenuItem('')
    setSelectedSubMenu('')
    setSelectedDay(null)
  }

  const handleAddEvent = () => {
    if (newEvent && selectedDay && selectedMenuItem) {
      const dateStr = format(selectedDay, 'yyyy/MM/dd', { locale: faIR })
      const menuItemObj = filteredMenuItems.find((item) => item.title === selectedMenuItem)
      onAddEvent(newEvent, dateStr, {
        menuItem: selectedMenuItem,
        subMenu: selectedSubMenu || null
      })
      handleCloseAddModal()
    }
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setNewEvent(event.title)
    setSelectedMenuItem(event.menuItem || '')
    setSelectedSubMenu(event.subMenu || '')
  }

  const handleUpdateEvent = () => {
    if (newEvent && editingEvent) {
      onUpdateEvent(newEvent, {
        ...editingEvent,
        menuItem: selectedMenuItem,
        subMenu: selectedSubMenu || null
      })
      setEditingEvent(null)
      setNewEvent('')
      setSelectedMenuItem('')
      setSelectedSubMenu('')
    }
  }

  const handleDeleteEvent = (eventId) => {
    onDeleteEvent(eventId)
  }

  const handleEventLabelClick = (event) => {
    const menuItemObj = filteredMenuItems.find((item) => item.title === event.menuItem)
    setSelectedTitle(menuItemObj)
    if (event.subMenu) {
      setSelectedChild(event.subMenu)
      window.location.hash = event.subMenu.replaceAll(' ', '_').replace(/\u200C/g, '')
    } else {
      setSelectedChild(null)
      window.location.hash = event.menuItem.replaceAll(' ', '_').replace(/\u200C/g, '')
    }
  }

  return (
    <div className='calendar'>
      <div className='calendar-header-controls'>
        <button onClick={handlePrevMonth} className='month-nav-btn'>
          {toPersianDigits(format(subMonths(currentDate, 1), 'MMMM', { locale: faIR }))}
        </button>
        <h2>{jalaliMonth}</h2>
        <button onClick={handleNextMonth} className='month-nav-btn'>
          {toPersianDigits(format(addMonths(currentDate, 1), 'MMMM', { locale: faIR }))}
        </button>
      </div>
      <div className='calendar-grid'>
        {['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, index) => (
          <div key={index} className='calendar-header'>
            {day}
          </div>
        ))}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className='calendar-day empty'></div>
          ))}
        {days.map((day, index) => {
          const dateStr = format(day, 'yyyy/MM/dd', { locale: faIR })
          const dayEvents = events.filter((e) => e.date === dateStr)
          const isToday = dateStr === todayStr
          return (
            <div
              key={index}
              className={`calendar-day ${dayEvents.length ? 'has-events' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => dayEvents.length && handleOpenEventModal(day)}
            >
              <span>{toPersianDigits(format(day, 'd', { locale: faIR }))}</span>
              {dayEvents.map((event) => (
                <div key={event.id} className={`event ${event.isDefault ? 'default' : 'active'}`}>
                  {event.title}
                </div>
              ))}
              <button
                className='add-event-btn'
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenAddModal(day)
                }}
              >
                +
              </button>
            </div>
          )
        })}
      </div>

      {isAddModalOpen && (
        <div className='calendar-modal-overlay'>
          <div className='calendar-modal'>
            <h3>افزودن رویداد جدید</h3>
            <input
              type='text'
              placeholder='رویداد جدید'
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              autoFocus
            />

            <div className='menuItemSelectionContainer'>
              <select
                className='menuItemSelection'
                value={selectedMenuItem}
                onChange={(e) => {
                  setSelectedMenuItem(e.target.value)
                  setSelectedSubMenu('')
                }}
              >
                <option value=''>انتخاب بخش</option>
                {filteredMenuItems.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              {selectedMenuItem && (
                <select
                  className='subMenuItemSelection'
                  value={selectedSubMenu}
                  onChange={(e) => setSelectedSubMenu(e.target.value)}
                  disabled={!filteredMenuItems.find((item) => item.title === selectedMenuItem)?.children.length}
                >
                  <option value=''>انتخاب زیربخش</option>
                  {filteredMenuItems
                    .find((item) => item.title === selectedMenuItem)
                    ?.children.map((child) => (
                      <option
                        key={typeof child === 'string' ? child : child.title}
                        value={typeof child === 'string' ? child : child.title}
                      >
                        {typeof child === 'string' ? child : child.title}
                      </option>
                    ))}
                </select>
              )}
            </div>

            <div className='calendar-modal-buttons'>
              <button onClick={handleAddEvent}>ثبت</button>
              <button onClick={handleCloseAddModal}>لغو</button>
            </div>
          </div>
        </div>
      )}

      {isEventModalOpen && selectedDay && (
        <div className='calendar-modal-overlay'>
          <div className='calendar-modal'>
            <h3>رویدادهای روز {toPersianDigits(format(selectedDay, 'd MMMM yyyy', { locale: faIR }))}</h3>
            <div className='event-list'>
              {events
                .filter((e) => e.date === format(selectedDay, 'yyyy/MM/dd', { locale: faIR }))
                .map((event) => (
                  <div key={event.id} className='event-item'>
                    <div className='event-content'>
                      {editingEvent && editingEvent.id === event.id ? (
                        <>
                          <input
                            type='text'
                            value={newEvent}
                            onChange={(e) => setNewEvent(e.target.value)}
                            autoFocus
                            placeholder='عنوان رویداد'
                          />
                          <div className='menuItemSelectionContainer'>
                            <select
                              className='menuItemSelection'
                              value={selectedMenuItem}
                              onChange={(e) => {
                                setSelectedMenuItem(e.target.value)
                                setSelectedSubMenu('')
                              }}
                            >
                              <option value=''>انتخاب بخش</option>
                              {filteredMenuItems.map((item) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                            {selectedMenuItem && (
                              <select
                                className='subMenuItemSelection'
                                value={selectedSubMenu}
                                onChange={(e) => setSelectedSubMenu(e.target.value)}
                                disabled={
                                  !filteredMenuItems.find((item) => item.title === selectedMenuItem)?.children.length
                                }
                              >
                                <option value=''>انتخاب زیربخش</option>
                                {filteredMenuItems
                                  .find((item) => item.title === selectedMenuItem)
                                  ?.children.map((child) => (
                                    <option
                                      key={typeof child === 'string' ? child : child.title}
                                      value={typeof child === 'string' ? child : child.title}
                                    >
                                      {typeof child === 'string' ? child : child.title}
                                    </option>
                                  ))}
                              </select>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <span className='eventTitle'>{event.title}</span>
                          {(event.menuItem || event.subMenu) && (
                            <span className='event-label' onClick={() => handleEventLabelClick(event)}>
                              {event.subMenu || event.menuItem}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div className='event-actions'>
                      {!event.isDefault && editingEvent && editingEvent.id === event.id ? (
                        <button
                          className='save-action'
                          onClick={handleUpdateEvent}
                          data-tooltip-id='calendar-tooltip'
                          data-tooltip-content='ذخیره'
                        >
                          <IoIosSave />
                        </button>
                      ) : (
                        !event.isDefault && (
                          <button
                            className='edit-icon'
                            onClick={() => handleEditEvent(event)}
                            data-tooltip-id='calendar-tooltip'
                            data-tooltip-content='ویرایش'
                          >
                            <MdModeEdit />
                          </button>
                        )
                      )}
                      {!event.isDefault && (
                        <button
                          className='delete-icon'
                          onClick={() => handleDeleteEvent(event.id)}
                          data-tooltip-id='calendar-tooltip'
                          data-tooltip-content='حذف'
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className='calendar-modal-buttons'>
              <button onClick={handleCloseEventModal}>بستن</button>
            </div>
          </div>
        </div>
      )}

      <Tooltip
        id='calendar-tooltip'
        style={{
          zIndex: 1001,
          direction: 'rtl'
        }}
      />
    </div>
  )
}

export default CalendarSection
