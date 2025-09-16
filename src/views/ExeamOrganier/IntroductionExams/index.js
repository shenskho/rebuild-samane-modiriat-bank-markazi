import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, Label } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'

import { useDispatch, useSelector } from 'react-redux'
import { GetIntroductionExams } from '@store/slices/examScope'

import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { Download } from 'react-feather'

export default function index() {
  //   const [IntroductionExams, SetIntroductionExams] = useState(0)
  const store = useSelector((state) => state.examScope)
  console.log(store)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetIntroductionExams())
  }, [])

  return (
    <Row style={{ paddingLeft: '100px' }}>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption' onClick={()=>navigate('/IntroductionExams')}>  معرفی آزمون </span>
          </p>
        </Row>
        <div>
          <Card className='mb-1'>
            <CardBody>
              <Col lg={12}>
                <Label for='IntroductionExams' className='header-font'>
                  آزمون
                </Label>
                <Select
                  id='IntroductionExams'
                  placeholder='آزمون مورد نظر را انتخاب کنید'
                  options={
                    store.IntroductionExams?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []
                  }
                  // onChange={(item) => SetIntroductionExams(item.value)}
                />
              </Col>
              <div
            className='IntroductionExams-container'

          >
            <textarea
              placeholder='توضیحات مربوط به آزمون را اینجا وارد کنید...'
              className='IntroductionExams-textarea'
            />
            <button
              className='IntroductionExams-PublishBtn'
              style={{
                alignSelf: 'flex-start',
                marginLeft: '0',
                marginRight: 'auto',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              انتشار
            </button>
          </div>
            </CardBody>
          </Card>
          
        </div>
      </Col>
    </Row>
  )
}
