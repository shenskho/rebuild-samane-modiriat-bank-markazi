import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { GetExamScopeSecound, GetProvince, GetExamScope } from '@store/slices/examScope'
import { useDispatch, useSelector } from 'react-redux'

import AddModal from './AddModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
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
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  // pagination states
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
  // useEffect(() => {
  //   dispatch(GetExamScopeSecound()).then(() => dispatch(GetProvince()).then(() => dispatch(GetExamScope())))
  // }, [dispatch])

  // const licenses = store.secoundScopes?.items || []
  const listOFSupplementaryAssessment = [
    {
      id: 1,
      name: 'آزمون استخدامی کادر قوه قضاییه',
      status: 'برگزار شده',
      organization: 'قوه قضاییه',
      capacity: '3 برابر '
    }
  ]

  // محاسبه آیتم‌های صفحه فعلی
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  // const currentCards = licenses.slice(indexOfFirstCard, indexOfLastCard)

  // const totalPages = Math.ceil(licenses.length / cardsPerPage)
  const currentCards = listOFSupplementaryAssessment.slice(indexOfFirstCard, indexOfLastCard)

  const totalPages = Math.ceil(listOFSupplementaryAssessment.length / cardsPerPage)

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
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
                    <CardHeader>
                      <div className='d-flex justify-content-between w-100'>
                        <h4 className='pt-1'> حوزه فرعی آزمون </h4>
                        <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                          افزودن <Plus size={20} color='white' />
                        </Button>
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
                            <p className='scope-title'>
                              {' '}
                              دستگاه : <span className='scope-value'>{item.organization} </span>
                            </p>
                            <p className='scope-title'>
                              {' '}
                              چند برابر ظرفیت : <span className='scope-value'>{item.capacity} </span>
                            </p>
                            <span className='scope-divider-line'></span>
                            <button className='exam-panel btn-flat-primary border-primary'>
                              دریافت لیست نفرات :{' '}
                              <span className='scope-value'>
                                <FaDownload size={23} color='#04364a' />
                              </span>
                            </button>
                            <div className='d-flex justify-content-end'>
                              <Button color='primary' onClick={() => handeleEditRole(item)}>
                                {' '}
                                ویرایش
                              </Button>
                              <Button className='delete-button  ml-1' onClick={() => handeleDeleteRole(item)}>
                                {' '}
                                حذف
                              </Button>
                            </div>
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
