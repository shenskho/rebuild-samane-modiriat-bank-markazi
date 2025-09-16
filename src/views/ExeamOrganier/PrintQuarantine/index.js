import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { GetQuarantineAllSubSutes, GetQuarantineOfSubSite, GetRemainingReport } from '@store/slices/examOrganizer'
import { useDispatch, useSelector } from 'react-redux'

import AddModal from './AddModal'
import ReciveModal from './ResiveModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import FilterScope from './filterScope'
import { FaBuilding } from 'react-icons/fa'

export default function Index() {
  const store = useSelector((state) => state.examOrganizer)
  console.log('storee', store)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsReciveModal, SetIsReciveModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 8


  const handeleEditRole = (data) => {
    dispatch(GetQuarantineOfSubSite(`?ExamId=1&SubSiteId=${data.subSiteId}`)).then((response) => {
      if (response.payload) {
        SetIsAddModal(!IsAddModal)
      }
    })
  }

  const handeleSerReciver = (data) => {
    dispatch(GetQuarantineOfSubSite(`?ExamId=1&SubSiteId=${data.subSiteId}`)).then((response) => {
      if (response.payload) {
        SetIsReciveModal(!IsReciveModal)
      }
    })
  }


  
  useEffect(() => {
    dispatch(GetQuarantineAllSubSutes('?ExamId=1'))
    dispatch(GetRemainingReport('?ExamId=1'))
  }, [dispatch])

  const licenses = store.allSubsites?.items || []

  const filteredLicenses = licenses.filter((item) => {
    const term = searchTerm.toLowerCase()
    return (
      item?.subSiteTitle?.toLowerCase().includes(term) ||
      item?.mainSiteTitle?.toLowerCase().includes(term) ||
      item?.provicneTitle?.toLowerCase().includes(term)
    )
  })

  // محاسبه آیتم‌های صفحه فعلی
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = filteredLicenses.slice(indexOfFirstCard, indexOfLastCard)

  const totalPages = Math.ceil(filteredLicenses.length / cardsPerPage)

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption'> قرنطینه چاپ </span>
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
                        <h4 className='pt-1'> قرنطینه چاپ </h4>
                      </div>
                      <FilterScope searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </CardHeader>

                    <Row>
                      {currentCards?.map((item) => (
                        <Col lg={3} md={6} sm={6} key={item?.examId} className='d-flex justify-content-center'>
                          <div className='scope-card'>
                            <div className='d-flex justify-content-between'>
                              <FaBuilding size={23} color='#e0e0e0' />
                              <h5>{item?.subSiteTitle}</h5>
                              <span className='scope-active'>
                                {item?.receiverIsCompleted ? 'تحویل شده' : 'در حال انجام'}
                              </span>
                            </div>

                            <p className='scope-title'>
                              محل برگزاری : <span className='scope-value'>{item?.mainSiteTitle}</span>
                            </p>

                            <p className='scope-title'>
                              استان : <span className='scope-value'>{item?.provicneTitle}</span>
                            </p>

                            <span className='scope-divider-line'></span>

                            <div className='progress-steps mt-1'>
                              <div className={`step ${item?.printIsCompleted ? 'done' : ''}`}>چاپ</div>
                              <div className={`step ${item?.packIsCompleted ? 'done' : ''}`}>بسته‌بندی</div>
                              <div className={`step ${item?.printAndPackIsCompleted ? 'done' : ''}`}>
                                چاپ و بسته‌بندی
                              </div>
                              <div className={`step ${item?.receiverIsCompleted ? 'done' : ''}`}>تحویل</div>
                            </div>
                            {(() => {
                              const steps = [
                                { key: 'printIsCompleted', label: 'چاپ' },
                                { key: 'packIsCompleted', label: 'بسته‌بندی' },
                                { key: 'printAndPackIsCompleted', label: 'چاپ و بسته‌بندی' },
                                { key: 'receiverIsCompleted', label: 'تحویل' }
                              ]

                              const completedSteps = steps.filter((s) => item?.[s.key]).length
                              const percent = Math.round((completedSteps / steps.length) * 100)

                              // مرحله جاری
                              const currentStep = steps[completedSteps] ? steps[completedSteps].label : 'شروع نشده'

                              return (
                                <div className='mt-05'>
                                  <div className='progress' style={{ height: '10px', borderRadius: '8px' }}>
                                    <div
                                      className='progress-bar bg-success'
                                      role='progressbar'
                                      style={{ width: `${percent}%`, borderRadius: '8px' }}
                                      aria-valuenow={percent}
                                      aria-valuemin='0'
                                      aria-valuemax='100'
                                    ></div>
                                  </div>
                                  <p className='text-center mt-2' style={{ fontSize: '13px' }}>
                                    {percent === 100 ? '✅ کامل شد' : `مرحله جاری: ${currentStep} ( ${percent}% )`}
                                  </p>
                                  <div className='d-flex justify-content-end mt-1'>
                                    <Button className='w-100' color='primary' onClick={() => handeleEditRole(item)}>
                                      تعیین وضعیت
                                    </Button>
                                    {item?.printIsCompleted &&
                                    item?.printAndPackIsCompleted &&
                                    item?.packIsCompleted ? (
                                      <Button
                                        className='w-100 ml-05'
                                        color='success'
                                        onClick={() => handeleSerReciver(item)}
                                      >
                                        تحویل
                                      </Button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              )
                            })()}
                          </div>
                        </Col>
                      ))}
                    </Row>

                    {/* pagination controls */}
                    {filteredLicenses.length > cardsPerPage && (
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

            <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} />

            <ReciveModal IsReciveModal={IsReciveModal} SetIsReciveModal={SetIsReciveModal} />
          </Card>
        </div>
      </Col>
    </Row>
  )
}
