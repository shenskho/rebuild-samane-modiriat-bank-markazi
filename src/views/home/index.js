import ChartsSection from './ChartsSection/ChartsSection'
import CalendarSection from './CalendarSection/CalendarSection'
import SidebarSection from './SidebarSection/SidebarSection'
import { useEffect, useState } from 'react'
import { recruitmentData } from './data'
import { Col, Row } from 'reactstrap'
import Operators from '../operators'
import Scope from '../ScopeManage'
import Organ from '../organ/ComplanteRequest'
import Ticket from '../ticket/ComplanteRequest'
export default function index() {
  // useAuth().panelTypeTitle
  // const navigate = useNavigate()

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events')
    const defaultEvents = [
      ...recruitmentData,
      {
        id: 6,
        title: 'ثبت‌نام آزمون استخدامی برنامه‌نویسی',
        date: '1404/01/05',
        status: 'در انتظار',
        isDefault: true
      },
      {
        id: 7,
        title: 'دریافت کارت آزمون برنامه‌نویسی',
        date: '1404/01/15',
        status: 'در انتظار',
        isDefault: true
      },
      {
        id: 8,
        title: 'روز برگزاری آزمون برنامه‌نویسی',
        date: '1404/01/20',
        status: 'در انتظار',
        isDefault: true
      }
    ]
    return savedEvents ? JSON.parse(savedEvents) : defaultEvents
  })

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleAddEvent = (newEvent, dateStr, menuData) => {
    setEvents([
      ...events,
      {
        id: events.length + 1,
        title: newEvent,
        date: dateStr,
        isDefault: false,
        menuItem: menuData.menuItem,
        subMenu: menuData.subMenu
      }
    ])
  }

  const handleUpdateEvent = (newEvent, editingEvent) => {
    setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, title: newEvent } : event)))
  }

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  if (localStorage.getItem('role') === 'SuperAdmin') {
    return (
      <div className='dashboard'>
        <>
          {' '}
          <ChartsSection />
          <Row className='text-right'>
            <Col lg={9}>
              <CalendarSection
                events={events}
                onAddEvent={handleAddEvent}
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            </Col>
            <Col lg={3}>
              <SidebarSection events={events} />
            </Col>
          </Row>
        </>
      </div>
    )
  } else if (localStorage.getItem('role') === 'operator') {
    return (
      <div className='dashboard'>
        <Operators />
      </div>
    )
  } else if (localStorage.getItem('role') === 'scope') {
    return (
      <div className='dashboard'>
        <Scope />
      </div>
    )
  } else if (localStorage.getItem('role') === 'organ') {
    return (
      <div className='dashboard'>
        <Organ />
      </div>
    )
  } else if (localStorage.getItem('role') === 'ticket') {
    return (
      <div className='dashboard'>
        <Ticket />
      </div>
    )
  }
}
