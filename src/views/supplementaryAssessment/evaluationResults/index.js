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

export default function Index() {
  // const store = useSelector((state) => state.examScope)
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const [userItem, SetUserItem] = useState([])
  // const [IsAddModal, SetIsAddModal] = useState(false)
  // const [IsEditModal, SetIsEditModal] = useState(false)
  // const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12
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
  const listOFSupplementaryAssessment = [
    {
      id: 1,
      name: 'آزمون استخدامی کادر قوه قضاییه',
      status: 'تایید نهایی',
      organization: 'قوه قضاییه',
      history: ' 1404/02/23 ',
      province:'تهران',
      date:'1404/01/24',
      job:'متصدی امور دفتری',
      presenter:'سازمان سنجش و آموزش کشور',
    }
  ]

  // محاسبه آیتم‌های صفحه فعلی
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  // const currentCards = licenses.slice(indexOfFirstCard, indexOfLastCard)

  // const totalPages = Math.ceil(licenses.length / cardsPerPage)
  const currentCards = listOFSupplementaryAssessment.slice(indexOfFirstCard, indexOfLastCard)

  const totalPages = Math.ceil(listOFSupplementaryAssessment.length / cardsPerPage)
  const nav = useNavigate()
  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => nav('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> ارزیابی تکمیلی </span> /{' '}
            <span className='route-caption' onClick={()=>nav('/evaluationResults')}> نتایج ارزیابی </span>
          </p>
        </Row>
        <div>
          <Card className='mb-1 card-back-none'>
            <CardBody>
              <Row>
                <Col lg={12}>
                  <Card id='Home' className='card-back-none'>
                    <CardHeader>
                      <div className='d-flex justify-content-between w-100'>
                        <h4 className='pt-1'> نتایج ارزیابی تکمیلی </h4>
                      </div>
                      <FilterScope />
                    </CardHeader>

                    <Row>
                      {currentCards.map((item) => (
                        <Col lg={3} md={4} sm={6} key={item?.id} className='d-flex justify-content-center'>
                          <div className='scope-card '>
                            <h4 className='exam-card__title'>{item.name}</h4>
                            <div className='text-center'>
                              <span className='exam-card__pill'>{item.status}</span>
                            </div>
                            <span className='scope-divider-line'></span>
                            <p className='scope-title exam-card__row'>
                              {' '}
                              مجری : <span className='scope-value '>{item.presenter} </span>
                            </p>
                            <p className='scope-title exam-card__row'>
                              {' '}
                              شغل : <span className='scope-value'>{item.job} </span>
                            </p>
                            <p className='scope-title exam-card__row'>
                              {' '}
                              دستگاه : <span className='scope-value'>{item.organization} </span>
                            </p>
                            <p className='scope-title exam-card__row'>
                              {' '}
                              تاریخ برگزاری : <span className='scope-value'>{item.date} </span>
                            </p>
                            <p className='scope-title exam-card__row'>
                              {' '}
                              استان برگزاری ارزیابی تکمیلی : <span className='scope-value'>{item.province} </span>
                            </p>
                            <p className='scope-title exam-card__row'>
                              {' '}
                              تاریخ انتشار نتایج : <span className='scope-value'>{item.history} </span>
                            </p>
                            <span className='scope-divider-line'></span>
                            <button className='exam-panel btn-flat-primary border-primary'>
                              فایل نتایج:{' '}
                              <span className='scope-value'>
                                <FaDownload size={23} color='#04364a' />
                              </span>
                            </button>
                          
                          </div>
                        </Col>
                      ))}
                    </Row>
                    {/* pagination controls */}
                    {listOFSupplementaryAssessment.length > cardsPerPage && (
                      <div className='d-flex justify-content-center mt-3'>
                        <Pagination aria-label='Page navigation' className='flex-wrap'>
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={() => setCurrentPage((prev) => prev - 1)} />
                          </PaginationItem>

                          {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i} active={currentPage === i + 1}>
                              <PaginationLink onClick={() => setCurrentPage(i + 1)}>{i + 1}</PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink next onClick={() => setCurrentPage((prev) => prev + 1)} />
                          </PaginationItem>
                        </Pagination>
                      </div>
                    )}
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
