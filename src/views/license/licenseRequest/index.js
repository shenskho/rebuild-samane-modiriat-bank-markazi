import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Input, Label } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { getOrganizations } from '@store/slices/fixData'
import { useDispatch, useSelector } from 'react-redux'
import { Getlicenses } from '@store/slices/license'
import AddModal from './AddModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa'

export default function index() {
  const store = useSelector((state) => state.License)
  console.log(store)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  useEffect(() => {
    dispatch(Getlicenses()).then(() => dispatch(getOrganizations()))
  }, [])
  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> مجوز استخدام</span> /{' '}
            <span className='route-caption'>مدیریت مجوز ها </span>
          </p>
        </Row>
        <div>
          <Card className='mb-1'>
            <CardBody>
              <Row>
                <Col lg={12}>
                  <Card id='Home'>
                    <CardHeader>
                      <div className='d-flex justify-content-between w-100'>
                        <h4 className='pt-1'> درخواست مجوز </h4>
                        <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                          افزودن <Plus size={20} color='white' />
                        </Button>
                      </div>
                    </CardHeader>
                    <Row className='mt-3'>
                      <Col lg={3} md={3}>
                        <Input className='form-input text-search-form mt-1' placeholder='جستجو در مجوزها...' />
                      </Col>
                      <Col lg={6} md={6}>
                        <></>
                      </Col>

                      <Col lg={3} md={3}>
                        <div className='d-flex align-items-center'>
                          <div className='w-100'>
                            <Label for='Organization-filter' className='text-bold font-color'>
                              دستگاه
                            </Label>
                            <Select id='Organization-filter' placeholder='همه' options={[]} isClearable={true} />
                          </div>
                          <FaFilter color='#04364a' size={24} className='mt-1 ml-1' />
                        </div>
                        <div className='d-flex justify-content-between  w-100'>
                          <strong className='sub-sort-filter'>جدیدترین مجوز</strong>
                          <strong className='sub-sort-filter'>قدیمی‌ترین مجوز </strong>
                          <strong className='sub-sort-filter'> پیش‌فرض </strong>
                          <FaSortAmountUpAlt color='#04364a' size={24} className='mt-2 ml-1' />
                        </div>
                      </Col>
                    </Row>
                    <CardBody>
                      <Row className='license-container'>
                        {store.licenses?.items?.map((item) => (
                          <Col lg={4}>
                            <Card className='license-card'>
                              <CardHeader>
                                <h4 className='w-100 text-center font-color pb-1 pt-05'>{item.licenseNumber}</h4>
                                <span className='license-card-line'></span>
                              </CardHeader>
                              <CardBody>
                                <div className='d-flex justify-content-between '>
                                  <strong className='font-color'>دستگاه : </strong>{' '}
                                  <strong className='gray-color'> {item.organizationName}</strong>
                                </div>
                                <div className='d-flex justify-content-between mt-1'>
                                  <strong className='font-color'>تاریخ صدور : </strong>{' '}
                                  <strong className='gray-color'> {item.issuanceDateShamsi.substring(0, 10)}</strong>
                                </div>
                                <div className='d-flex justify-content-between mt-1'>
                                  <strong className='font-color'>تاریخ انقضاء : </strong>{' '}
                                  <strong className='gray-color'> {item.expireDateShamsi.substring(0, 10)}</strong>
                                </div>      <div className='d-flex justify-content-between mt-1'>
                                  <strong className='font-color'>تعداد استخدام  : </strong>{' '}
                                  <strong className='gray-color'> {item.employmentCount}</strong>
                                </div>
                                <div className='d-flex justify-content-center mt-1' >
                                  <Button 
                                    className='p-1 w-100 custom-download-btn' 
                                    color="primary"
                                  >
                                    دانلود فایل 
                                  </Button>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </CardBody>
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
