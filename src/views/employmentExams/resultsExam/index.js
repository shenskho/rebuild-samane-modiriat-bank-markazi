import React, { useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import FilterScope from './filterScope'
import { FaDownload, FaBuilding } from 'react-icons/fa'
import { IoWoman } from 'react-icons/io5'
import { status } from 'nprogress'

export default function Index() {
  const navigate = useNavigate()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12

  const handeleEditRole = (data) => {
    SetUserItem(data)
    SetIsEditModal(!IsEditModal)
  }

  const handeleDeleteRole = (data) => {
    SetUserItem(data)
    SetIsDeleteModal(!IsDeleteModal)
  }

  const mockLicenses = [
    {
      id: 1,
      name: '  استخدامی کادر اداری قوه قضاییه',
      status: 'در حال بررسی',
      presenter: 'مرکز آموزشی پژوهشی رایانگان',
      dateOfExam: '1403/09/25',
      participants: '56000',
      organization: 'سازمان برنامه و بودجه کشور',
      dateOfPublic: '1403/09/25'
    }
  ]

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = mockLicenses.slice(indexOfFirstCard, indexOfLastCard)
  const totalPages = Math.ceil(mockLicenses.length / cardsPerPage)
const nav = useNavigate()
  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption' onClick={()=> nav('/resultsExam')}>نتایج آزمون </span>
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
                        <h4 className='pt-1'> نتایج آزمون </h4>
                      </div>
                      <FilterScope />
                    </CardHeader>
                    <Row >
                      {currentCards.map((item) => (
                        <Col lg={4} md={6} sm={12} key={item.id} className='d-flex justify-content-center'>
                          <div className='exam-panel'>
                            <div className='exam-panel-grid'>
                              <div className='exam-panel-cell align-items-center'>
                                <div className='text-bold'>{item.name}</div>
                                <div className='exam-card__pill'>{item.status}</div>
                              </div>
                                 <div className='exam-panel-divider'></div>
                              <div className='exam-panel-cell'>
                                <div className='exam-panel-label'> مجری:</div>
                                <div className='scope-value'>{item.presenter}</div>
                              </div>
                              <div className='exam-panel-cell'>
                                <div className='exam-panel-label'>تاریخ آزمون:</div>
                                <div className='scope-value'>{item.dateOfExam || '—'}</div>
                              </div>
                              <div className='exam-panel-divider'></div>
                              <div className='exam-panel-cell'>
                                <div className='exam-panel-label'>شرکت کنندگان:</div>
                                <div className='scope-value'>{item.participants || '—'}</div>
                              </div>
                              {/* <div className='exam-panel-center'>
                                <div className='exam-panel-label'>تاریخ تمدید:</div>
                                <div className='exam-panel-value'>{item.againHistory || '—'}</div>
                              </div> */}
                                <div className='exam-panel-cell'>
                                <div className='exam-panel-label'>دستگاه:</div>
                                <div className='scope-value'>{item.organization || '—'}</div>
                              </div>
                              <div className='exam-panel-divider'></div>

                              <div className='exam-panel-center'>
                                <div className='exam-panel-label'>تاریخ انتشار نتایج:</div>
                                <div className='scope-value'>{item.dateOfPublic || '—'}</div>
                              </div>

                              <div className='exam-panel-cell' style={{ gap: '5px' }}>
                             <button className='exam-panel btn-flat-primary border-primary'>
                                  فایل نتایج :{' '}
                                  <span className='scope-value'>
                                    <FaDownload size={23} color='#04364a' />
                                  </span>
                                </button>
                                <button className='exam-panel btn-flat-primary border-primary'>
                                  جزیئات نتایج :{' '}
                                  <span className='scope-value'>
                                    <FaDownload size={23} color='#04364a' />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    {mockLicenses.length > cardsPerPage && (
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
          </Card>
        </div>
      </Col>
    </Row>
  )
}

