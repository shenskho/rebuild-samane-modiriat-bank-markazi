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

import { Card, Col, Row } from 'reactstrap'
export default function index() {
  const categoryItems = [
    { title: 'نسبت امتیاز', icon: <FaPercent size={40} color='#04364a' />, link: '/ScoreRatio'  },
    { title: 'مجری آزمون کتبی', icon: <FaUserEdit /> },
    { title: 'مجری ارزیابی تکمیلی', icon: <FaUserCheck /> },
    { title: 'رشته تحصیلی', icon: <FaBook /> },
    { title: 'شغل', icon: <FaSuitcase /> },
    { title: 'وضعیت گزینش', icon: <FaCheckCircle /> },
    { title: 'رسته عوامل مجری', icon: <FaUsers /> },
    { title: 'فهرست دانشگاه‌ها', icon: <FaSchool /> }
  ]
  return (
    <Row>
      <Col lg={12}>
        <p className='route-base-color'>
          <span className='first-route-selected'>خانه</span> / <span className='route-caption'>اطلاعات پایه</span> /{' '}
          <span className='route-caption'>اطلاعات متغیر</span>
        </p>
      </Col>
      <div  className='base-menu-container'>
        <Row className='w-100'>
          {categoryItems.map((item) => {
            return (
              <Col lg={3} md={4}>
                <Card className='category-grid__box'>
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
