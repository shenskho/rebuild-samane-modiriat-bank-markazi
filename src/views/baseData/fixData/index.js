import React from 'react'
import {
  FaUserShield,
  FaBuilding,
  FaMapMarkerAlt,
  FaClipboardList,
  FaTasks,
  FaGraduationCap,
  FaPercent,
  FaBook,
  FaChartBar,
  FaUserEdit,
  FaUsers,
  FaCheckCircle,
  FaBriefcase,
  FaUniversity,
  FaUserCheck,
  FaSuitcase,
  FaSchool,
  FaArrowRight,
  FaFileAlt,
  FaLink,
  FaPencilAlt,
  FaLock,
  FaSitemap,
  FaFilePdf,
  FaChartLine,
  FaUsersCog
} from 'react-icons/fa'
import {
  FaFileCircleExclamation,
  FaFileImport,
  FaFileCircleQuestion,
  FaFileCircleXmark,
  FaFileCircleCheck,
  FaFileShield,
  FaFilter
} from 'react-icons/fa6'
import { MdMosque } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { Card, Col, Row } from 'reactstrap'
export default function index() {
  const navigate = useNavigate()

  const categoryItems = [
    { title: 'وضعیت نظام وظیفه', icon: <FaUserShield size={40} color='#04364a' />, link: '/dutyStatus' },
    { title: 'دستگاه اجرایی', icon: <FaBuilding size={40} color='#04364a' />, link: '/organization' },
    { title: 'مکان جغرافیایی', icon: <FaMapMarkerAlt size={40} color='#04364a' />, link: '/Province' },
    { title: 'مقطع تحصیلی', icon: <FaGraduationCap size={40} color='#04364a' />, link: '/EducationLevel' },
    { title: 'سهمیه', icon: <FaFilter size={40} color='#04364a' />, link: '/Quota' },
    { title: 'مذاهب', icon: <MdMosque size={40} color='#04364a' />, link: '/Religion' },
    { title: 'نوع استخدام', icon: <FaBriefcase size={40} color='#04364a' />, link: '/EmploymentType' },
    { title: 'نوع دانشگاه', icon: <FaUniversity size={40} color='#04364a' />, link: '/UniversityType' }
  ]
  return (
    <Row>
      <Col lg={12}>
        <p className='route-base-color'> 
          <span className='first-route-selected'>خانه</span> / <span className='route-caption'>اطلاعات پایه</span> /{' '}
          <span className='route-caption'>اطلاعات ثابت</span>
        </p>
      </Col>
    <div className='base-menu-container'>
            <Row className='w-100'>
              {categoryItems.map((item) => {
                return (
                  <Col lg={3} md={4}>
                    <Card className='category-grid__box' onClick={() => navigate(item.link)}>
                      <div class='category-grid__icon'>{item.icon}</div>
                      <p class='category-grid__title'>{item.title}</p>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
    </Row>
  )
}
