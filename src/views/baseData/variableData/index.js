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
  const navigate = useNavigate();
  const categoryItems = [
    { title: 'نسبت امتیاز', icon: <FaPercent size={40} color='#04364a' />, link: '/ScoreRatio'  },
    { title: 'مجری آزمون کتبی', icon: <FaUserEdit size={40} color='#04364a' />, link: '/ExamAgency' },
    { title: 'مجری ارزیابی تکمیلی', icon: <FaUserCheck size={40} color='#04364a' />, link: '/ComplementEvaluationAgency'  },
    { title: 'رشته تحصیلی', icon: <FaBook size={40} color='#04364a' />, link: '/EducationField'  },
    { title: 'شغل', icon: <FaSuitcase size={40} color='#04364a' />, link: '/Job'  },
    { title: 'وضعیت گزینش', icon: <FaCheckCircle size={40} color='#04364a' />, link: '/SelectionState'  },
    { title: 'رسته عوامل مجری', icon: <FaUsers size={40} color='#04364a' />, link: '/AgencyCategory'  },
    { title: 'فهرست دانشگاه‌ها', icon: <FaSchool /> }
  ]
  return (
    <Row>
      <Col lg={12}>
        <p className='route-base-color'>
          <span className='first-route-selected' onClick={()=>navigate('/')}>خانه</span> / <span className='route-caption'>اطلاعات پایه</span> /{' '}
          <span className='route-caption' onClick={()=>navigate('/variableData')}>اطلاعات متغیر</span>
        </p>
      </Col>
      <div  className='base-menu-container'>
        <Row className='w-100'>
          {categoryItems.map((item) => {
            return (
              <Col lg={3} md={4}>
                <Card className='category-grid__box' onClick={() => navigate(item.link)} >
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
