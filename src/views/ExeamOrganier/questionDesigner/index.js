import React, { useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import AddModal from './AddModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import FilterScope from './filterScope'
import { FaDownload, FaUser } from 'react-icons/fa'

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
      name: 'علی محمدی',
      province: 'تهران',
      phone: '09123456789',
      nationalId: '1234567890',
      shenasname: '987654',
      rank: 'عالی',
      opinion: 'دارد',
      contract: '50000000 ریال'
    },
    {
      id: 2,
      name: 'زهرا کریمی',
      province: 'اصفهان',
      phone: '09351234567',
      nationalId: '1122334455',
      shenasname: '123456',
      rank: 'خوب',
      opinion: 'ندارد',
      contract: '30000000 ریال'
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
            <span className='route-caption'> طراح سوال </span>
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
                        <h4 className='pt-1'>طراح سوال</h4>
                        <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                          افزودن <Plus size={20} color='white' />
                        </Button>
                      </div>
                      <FilterScope />
                    </CardHeader>

                    <Row>
                      {currentCards.map((item) => (
                        <Col lg={3} md={4} sm={6} key={item.id} className='d-flex justify-content-center'>
                          <div className='scope-card'>
                            <div className='d-flex justify-content-between'>
                              <FaUser size={23} color='#04364a' />
                              <h4>{item.name}</h4>
                              <span className='scope-active'>درحال بررسی</span>
                            </div>
                            <p className='scope-title'>
                              استان محل سکونت : <span className='scope-value'>{item.province}</span>
                            </p>
                            <p className='scope-title'>
                              شماره همراه : <span className='scope-value'>{item.phone}</span>
                            </p>
                            <p className='scope-title'>
                              کدملی : <span className='scope-value'>{item.nationalId}</span>
                            </p>
                            <p className='scope-title'>
                              شماره شناسنامه : <span className='scope-value'>{item.shenasname}</span>
                            </p>
                            <span className='scope-divider-line'></span>
                            <p className='scope-title'>
                              رتبه عملکرد : <span className='scope-value'>{item.rank}</span>
                            </p>
                            <p className='scope-title'>
                              نظر مجری : <span className='scope-value'>{item.opinion}</span>
                            </p>
                            <p className='scope-title'>
                              مبلغ قرارداد : <span className='scope-value'>{item.contract}</span>
                            </p>
                            <p className='scope-title'>
                              تصویر قرارداد :{' '}
                              <span className='scope-value'>
                                <FaDownload size={23} color='#04364a' />
                              </span>
                            </p>
                            <div className='d-flex justify-content-end'>
                              <Button color='primary' onClick={() => handeleEditRole(item)}>
                                ویرایش
                              </Button>
                              <Button className='delete-button ml-1' onClick={() => handeleDeleteRole(item)}>
                                حذف
                              </Button>
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
            <EditModal IsEditModal={IsEditModal} SetIsEditModal={SetIsEditModal} item={userItem} />
            <DeleteModal IsDeleteModal={IsDeleteModal} SetIsDeleteModal={SetIsDeleteModal} item={userItem} />
          </Card>
        </div>
      </Col>
    </Row>
  )
}
