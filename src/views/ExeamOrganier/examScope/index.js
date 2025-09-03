import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { getOrganizations } from '@store/slices/fixData'
import { useDispatch, useSelector } from 'react-redux'
import { Getlicenses } from '@store/slices/license'
import AddModal from './AddModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import FilterScope from './filterScope'
import { FaBuilding } from 'react-icons/fa'

export default function Index() {
  const store = useSelector((state) => state.License)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 4

  useEffect(() => {
    dispatch(Getlicenses()).then(() => dispatch(getOrganizations()))
  }, [dispatch])

  const licenses = store.licenses?.items || []

  // محاسبه آیتم‌های صفحه فعلی
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = licenses.slice(indexOfFirstCard, indexOfLastCard)

  const totalPages = Math.ceil(licenses.length / cardsPerPage)

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption'> حوزه آزمون </span>
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
                        <h4 className='pt-1'> حوزه آزمون </h4>
                        <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                          افزودن <Plus size={20} color='white' />
                        </Button>
                      </div>
                      <FilterScope />
                    </CardHeader>

                    <Row>
                      {currentCards.map((item) => (
                        <Col lg={3} md={4} sm={6} key={item.id} className='d-flex justify-content-center'>
                          <div className='scope-card '>
                            <div className='d-flex justify-content-between'>
                              <FaBuilding size={23} color='#e0e0e0' />
                              <h4>حوزه تهران</h4>
                              <span className='scope-active'> فعال</span>
                            </div>
                            <p className='scope-title'>
                              {' '}
                              ظرفیت : <span className='scope-value'>500 نفر</span>
                            </p>
                                <p className='scope-title'>
                              {' '}
                              نام و نام خانوادگی مدیر حوزه : <span className='scope-value'>زهرا احمدی </span>
                            </p>
                            <span className='scope-divider-line'></span>
                                                    <p className='scope-title'>
                              {' '}
                              تاریخ قرارداد : <span className='scope-value'>1403/01/15 </span>
                            </p>
                                                    <p className='scope-title'>
                              {' '}
                              مبلغ قرارداد : <span className='scope-value'> 50,000,000 ریال </span>
                            </p>
                                                    <p className='scope-title'>
                              {' '}
                              آدرس : <span className='scope-value'>تهران، خیابان انقلاب، کوچه بهار </span>
                            </p>
                                                    <p className='scope-title'>
                              {' '}
                              تلفن : <span className='scope-value'>12345678-021 </span>
                            </p>
                            <div className='d-flex justify-content-end'>
                              <Button color='primary'> ویرایش</Button>
                               <Button className='delete-button  ml-1'> حذف</Button>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    {/* pagination controls */}
                    {licenses.length > cardsPerPage && (
                      <div className='d-flex justify-content-center mt-3'>
                        <Button
                          className='mx-1'
                          color='primary'
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                          قبلی
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Button
                            key={i}
                            color='primary'
                            className={`mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
                        <Button
                          className='mx-1'
                          color='primary'
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                          بعدی
                        </Button>
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
