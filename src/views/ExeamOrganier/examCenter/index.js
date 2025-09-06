import React, { useState } from 'react'
import {
  Card, CardBody, Row, Col, CardHeader, Button, Input, Label, Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'

import { useDispatch, useSelector } from 'react-redux'
import { SetExamAllocation } from '@store/slices/examScope'
import AddModal from './AddModal'
import MapView from './MapView'

import { useNavigate } from 'react-router-dom'


export default function index() {
  const store = useSelector((state) => state.License)
  console.log(store)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [StateName, SetStateName] = useState('')
  const [IsAddModal, SetIsAddModal] = useState(false)

  const [organizeMessage, SetorganizeMessage] = useState("")


  const handeleOrganizeExam = () => {
    const param = {
      examId: 1
    }
    dispatch(SetExamAllocation(param)).then((response) => {
      console.log(response)
      if (response.payload) {
 SetorganizeMessage("سازماندهی با موفقیت انجام شد")
      }
    })
   

  }

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption'> مدیریت حوزه آزمون </span>
          </p>
        </Row>
        <div>
          <Card className='mb-1'>
            <CardBody>
              <Row>
                <Row >
                  <Col lg={6}>
                    <Button color='primary' onClick={() => handeleOrganizeExam()}>سازماندهی</Button>
                  </Col>
                  <Col lg={6}>
                    <h5 className='mt-1' color='green'>{organizeMessage}</h5>
                  </Col>
                </Row>
                <Col lg={12}>
                  <Card id='Home'>


                    <CardBody>
                      <Row className='map-view-container'>
                        <Col lg={8} >
                          <div className='map-view-container-width'>
                            <MapView
                              IsAddModal={IsAddModal}
                              SetIsAddModal={SetIsAddModal}
                              SetStateName={SetStateName}
                            />
                          </div>
                        </Col>
                        <Col lg={4} className='d-grid '>
                          <div className='d-flex justify-content-center '>
                            <div className='details-container mt-5'>
                              <strong className='mt-1'>تعداد کل داوطلبان:</strong>
                              <strong>123123 نفر</strong>
                              <span className='line-divider'></span>
                              <div className='details-down-container'>
                                <strong> تعداد داوطلبان ساماندهی‌نشده:</strong>
                                <strong>123111223 نفر</strong>
                              </div>
                            </div>
                          </div>

                          <div className='d-flex justify-content-center align-items-center map-info-container'>
                            <div className='legend'>
                              <div className='legend-item'>
                                <span className='legend-color' style={{ backgroundColor: '#04364aff' }}></span>
                                <span className='legend-text'>ساماندهی ‌نشده</span>
                              </div>
                              <div className='legend-item'>
                                <span className='legend-color' style={{ backgroundColor: '#e55604ff' }}></span>
                                <span className='legend-text'>ساماندهی ناقص</span>
                              </div>
                              <div className='legend-item'>
                                <span className='legend-color' style={{ backgroundColor: '#578e7eff' }}></span>
                                <span className='legend-text'>ساماندهی ‌شده</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>

            <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} StateName={StateName} />
          </Card>
        </div>
      </Col>
    </Row>
  )
}
