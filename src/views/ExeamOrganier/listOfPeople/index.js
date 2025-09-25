import React, { useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import AddModal from './AddModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import FilterScope from './filterScope'
import { FaDownload ,FaBuilding } from 'react-icons/fa'
import { IoWoman } from 'react-icons/io5'

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
      name: 'آزمون استخدامی بانک مرکزی',
      history: '1403/09/25',
      allNumbers: '900',
      woman: '400',
      man: '500',
    }
  ]

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = mockLicenses.slice(indexOfFirstCard, indexOfLastCard)
  const totalPages = Math.ceil(mockLicenses.length / cardsPerPage)

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption'>لیست نفرات </span>
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
                        <h4 className='pt-1'> لیست نفرات </h4>
                        <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                          افزودن <Plus size={20} color='white' />
                        </Button>
                      </div>
                      <FilterScope />
                    </CardHeader>

                    <Row>
                      {currentCards.map((item) => (
                        <Col lg={3} md={4} sm={6} key={item.id} className='d-flex justify-content-center'>
                          <div className='exam-card'>
                            <h4 className='exam-card__title'>{item.name}</h4>
                            <div className='text-center'>
                              <span className='exam-card__pill'>پایان آزمون</span>
                            </div>
                            <span className='exam-card__divider'></span>
                            <div className='exam-card__date'>تاریخ آزمون: {item.history}</div>
                            <span className='exam-card__divider'></span>
                            <div className='exam-card__row'>
                              <span className='label'>تعداد کل:</span>
                              <span className='value'>{item.allNumbers} نفر</span>
                            </div>
                            <div className='exam-card__row'>
                              <span className='label'>تعداد زن:</span>
                              <span className='value'>{item.woman} نفر</span>
                            </div>
                            <div className='exam-card__row'>
                              <span className='label'>تعداد مرد:</span>
                              <span className='value'>{item.man} نفر</span>
                            </div>
                            <span className='exam-card__divider'></span>
                            <div className='exam-card__download'>
                              <div className='icon'><FaDownload size={18} color='#04364a' /></div>
                              دریافت لیست نفرات
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

            <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} />
          </Card>
        </div>
      </Col>
    </Row>
  )
}
