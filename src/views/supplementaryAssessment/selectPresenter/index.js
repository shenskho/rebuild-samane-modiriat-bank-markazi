import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { GetExamScopeSecound, GetProvince, GetExamScope } from '@store/slices/examScope'
import { useDispatch, useSelector } from 'react-redux'

import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import FilterScope from './filterScope'
import { FaDownload,FaBuilding } from 'react-icons/fa'
import { status } from 'nprogress'

// CSS جدا
// import '@assets/scss/variables/assign-executor.scss'

export default function Index() {
  // const store = useSelector((state) => state.examScope)
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const [userItem, SetUserItem] = useState([])
  // const [IsAddModal, SetIsAddModal] = useState(false)
  // const [IsEditModal, SetIsEditModal] = useState(false)
  // const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  // pagination states
  // const [currentPage, setCurrentPage] = useState(1)
  // const cardsPerPage = 12

  // const handeleEditRole = (data) => {
  //   SetUserItem(data)
  //   SetIsEditModal(!IsEditModal)
  // }

  // const handeleDeleteRole = (data) => {
  //   SetUserItem(data)
  //   SetIsDeleteModal(!IsDeleteModal)
  // }

  // useEffect(() => {
  //   dispatch(GetExamScopeSecound()).then(() => dispatch(GetProvince()).then(() => dispatch(GetExamScope())))
  // }, [dispatch])

  // const licenses = store.secoundScopes?.items || []

  // ====== داده‌های نمایشی مطابق تصویر (دارای مجری / فاقد مجری) ======
  const withExecutor = [
    { id: 1, title: 'دوازدهمین آزمون مشترک', date: '1403/12/25' },
    { id: 2, title: 'آزمون حفاظت فیزیکی(نگهبانی) شرکت کار و تامین', date: '1404/01/12' },
    { id: 3, title: 'چهاردهمین', date: '1404/01/19' }
  ]

  const withoutExecutor = [
    { id: 101, title: 'یازدهمین آزمون مشترک وزارت نفت' }
  ]
  // ===============================================================

  // ====== کد قبلی کارت‌های «نتایج ارزیابی تکمیلی» (فقط کامنت شد؛ حذف نشده) ======
  // const listOFSupplementaryAssessment = [
  //   {
  //     id: 1,
  //     name: 'آزمون استخدامی کادر قوه قضاییه',
  //     status: 'تایید نهایی',
  //     organization: 'قوه قضاییه',
  //     history: ' 1404/02/23 ',
  //     province:'تهران',
  //     date:'1404/01/24',
  //     job:'متصدی امور دفتری',
  //     presenter:'سازمان سنجش و آموزش کشور',
  //   }
  // ]
  // const indexOfLastCard = currentPage * cardsPerPage
  // const indexOfFirstCard = indexOfLastCard - cardsPerPage
  // const currentCards = listOFSupplementaryAssessment.slice(indexOfFirstCard, indexOfLastCard)
  // const totalPages = Math.ceil(listOFSupplementaryAssessment.length / cardsPerPage)
  // ===============================================================

  const nav = useNavigate()

  return (
 <Row>
       <Col lg={12}>
         <Row className='mb-2 '>
           <p className=' mb-1 card-back-none'>
             <span className='first-route-selected' onClick={() => navigate('/')}>
               خانه
             </span>{' '}
             /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
             <span className='route-caption'> حوزه فرعی آزمون </span>
           </p>
         </Row>
          <div>
             <Card className='mb-1 card-back-none'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home' className='card-back-none'>
                  <CardHeader className='assign-header'>
                    <div className='d-flex flex-column text-center'>
                      <h4 className='page-title'>تعیین مجری</h4>
                      <h5 className='page-subtitle'>در این صفحه می‌توان برای برگزاری ارزیابی تکمیلی آزمون‌ها، مجری برگزارکننده را تعیین نمود.</h5>
                    </div>
                    {/* <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                      افزودن <Plus size={20} color='white' />
                    </Button> */}
                    {/* <FilterScope /> */}
                  </CardHeader>

                  <CardBody >
                    <Row className='gx-4'>
                      {/* ستون چپ: آزمون‌های دارای مجری */}
                      <Col lg={6} md={12}>
                        <div className='list-card'>
                          <div className='list-card__header '>آزمون‌های دارای مجری</div>

                          {withExecutor.map(it => (
                            <div key={it.id} className='list-item'>
                              <div className='list-item__actions'>{it.title}</div>
                              <div className='list-item__meta '>
                                <span className='list-item__date'>{it.date}</span>
                              </div>
                              <div className=' list-item__title'>
                                <Button className='btn-show'>نمایش</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Col>

                      {/* ستون راست: آزمون‌های فاقد مجری */}
                      <Col lg={6} md={12}>
                        <div className='list-card'>
                          <div className='list-card__header'>آزمون‌های فاقد مجری</div>

                          {withoutExecutor.map(it => (
                            <div key={it.id} className='list-item'>
                              <div className=' list-item__actions'>{it.title}</div>
                              <div className='list-item__title'>
                                <Button className='btn-assign'>تعیین</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                  </Col>
                </Row>
              </CardBody>
              {/* 
              <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} />
              <EditModal IsEditModal={IsEditModal} SetIsEditModal={SetIsEditModal} item={userItem} />
              <DeleteModal IsDeleteModal={IsDeleteModal} SetIsDeleteModal={SetIsDeleteModal} item={userItem} /> */}
            </Card>
          </div>
        </Col>
      </Row>
  )
}

