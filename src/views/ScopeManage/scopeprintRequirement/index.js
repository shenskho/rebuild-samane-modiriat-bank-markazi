import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Input, Label, Spinner } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'

import { useDispatch, useSelector } from 'react-redux'
import {
  GetExamScopeSecound,
  GetAttendance,
  GetChaireNumber,
  GetMatchImage,
  GetPersonalAnswer,
  GetSubsiteHelp,
  GetAllScopes,
  GetAllAnware,
  GetAllfinalExam
} from '@store/slices/examScope'

import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { Download } from 'react-feather'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'

export default function index() {
  const store = useSelector((state) => state.examScope)
  console.log(store)
  const [secoundScope, SetsecoundScope] = useState(0)
  const [load1, Setload1] = useState(false)
  const [load2, Setload2] = useState(false)
  const [load3, Setload3] = useState(false)
  const [load4, Setload4] = useState(false)
  const [load5, Setload5] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handeleGetAttendance = (scope) => {
    Setload2(true)
    dispatch(GetAttendance(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها
      // ساختن یک blob از داده‌ها (فرض: سرور مستقیماً باینری PDF برمی‌گردونه)
      const blob = new Blob([data], { type: 'application/pdf' })

      // ساختن لینک دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Attendance_${timestamp}.pdf` // تغییر پسوند به pdf
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
      Setload2(false)
    })
  }
  const handeleGetChaireNumber = (scope) => {
    Setload3(true)
    dispatch(GetChaireNumber(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها
      // ساختن یک blob از داده‌ها (فرض: سرور مستقیماً باینری PDF برمی‌گردونه)
      const blob = new Blob([data], { type: 'application/pdf' })

      // ساختن لینک دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `seat_number_${timestamp}.pdf` // تغییر پسوند به pdf
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
      Setload3(false)
    })
  }
  const handeleGetMatchImage = (scope) => {
    Setload1(true)
    dispatch(GetMatchImage(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)

      // ساختن یک blob از داده‌ها (فرض: سرور مستقیماً باینری PDF برمی‌گردونه)
      const blob = new Blob([data], { type: 'application/pdf' })

      // ساختن لینک دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `match_image_${timestamp}.pdf` // تغییر پسوند به pdf
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
      Setload1(false)
    })
  }
  const handeleGetPersonalAnswer = (scope) => {
    Setload4(true)
    dispatch(GetPersonalAnswer(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها (فرض: سرور مستقیماً باینری PDF برمی‌گردونه)
      const blob = new Blob([data], { type: 'application/pdf' })

      // ساختن لینک دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Answer_${timestamp}.pdf` // تغییر پسوند به pdf
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
      Setload4(false)
    })
  }
  const handeleGetSubsiteHelp = (scope) => {
    Setload5(true)
    dispatch(GetSubsiteHelp(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const blob = response.payload // مستقیم Blob از سرور
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      // تاریخ برای اسم فایل
      const timestamp = new Date().toISOString().substring(0, 10)

      // تغییر پسوند به pdf
      link.download = `sub_site_help_${scope}_${timestamp}.pdf`

      link.click()
      URL.revokeObjectURL(url)
      Setload5(false)
    })
  }

  const handeleShowMessage = () => {
    toast((t) => <ToastContent t={t} message={'ابتدا حوزه مورد نظر را انتخاب کنید!'} />, {
      duration: 5000,
      style: {
        background: 'var(--bs-danger)',
        color: 'var(--bs-white)'
      }
    })
  }

  useEffect(() => {
    dispatch(GetExamScopeSecound())
    SetsecoundScope(localStorage.getItem('subSiteIds'))
  }, [])

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> ملزومات چاپی </span>
          </p>
        </Row>
        <div>
          <Card className='mb-1'>
            <CardBody>
              <Row>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetMatchImage(secoundScope))}
                  >
                    {load1 ? (
                      <div className='w-100 d-flex justify-content-center align'>
                        <Spinner size={35} color='primary' className='m-3' />
                      </div>
                    ) : (
                      <>
                        <div className='w-100 d-flex justify-content-center'>
                          <Download size={25} color='#04364a' />
                        </div>
                        <div className='w-100 d-flex justify-content-center mt-1'>
                          {' '}
                          <strong className='printRequirement-title w-100'> دانلود فایل تطبیق عکس </strong>
                        </div>
                      </>
                    )}
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetAttendance(secoundScope))}
                  >
                    {load2 ? (
                      <div className='w-100 d-flex justify-content-center align'>
                        <Spinner size={35} color='primary' className='m-3' />
                      </div>
                    ) : (
                      <>
                        {' '}
                        <div className='w-100 d-flex justify-content-center'>
                          <Download size={25} color='#04364a' />
                        </div>
                        <div className='w-100 d-flex justify-content-center mt-1'>
                          <strong className='printRequirement-title'> دانلود فایل حضور و غیاب </strong>
                        </div>
                      </>
                    )}
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetChaireNumber(secoundScope))}
                  >
                    {' '}
                    {load3 ? (
                      <div className='w-100 d-flex justify-content-center align'>
                        <Spinner size={35} color='primary' className='m-3' />
                      </div>
                    ) : (
                      <>
                        {' '}
                        <div className='w-100 d-flex justify-content-center'>
                          <Download size={25} color='#04364a' />
                        </div>
                        <div className='w-100 d-flex justify-content-center mt-1'>
                          <strong className='printRequirement-title'> دانلود شماره صندلی </strong>
                        </div>
                      </>
                    )}
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetPersonalAnswer(secoundScope))}
                  >
                    {load4 ? (
                      <div className='w-100 d-flex justify-content-center align'>
                        <Spinner size={35} color='primary' className='m-3' />
                      </div>
                    ) : (
                      <>
                        {' '}
                        <div className='w-100 d-flex justify-content-center'>
                          <Download size={25} color='#04364a' />
                        </div>
                        <div className='w-100 d-flex justify-content-center mt-1'>
                          <strong className='printRequirement-title'>دانلود پاسخنامه</strong>
                        </div>
                      </>
                    )}
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetSubsiteHelp(secoundScope))}
                  >
                    {load5 ? (
                      <div className='w-100 d-flex justify-content-center align'>
                        <Spinner size={35} color='primary' className='m-3' />
                      </div>
                    ) : (
                      <>
                        <div className='w-100 d-flex justify-content-center'>
                          <Download size={25} color='#04364a' />
                        </div>
                        <div className='w-100 d-flex justify-content-center mt-1'>
                          {' '}
                          <strong className='printRequirement-title'>دانلود راهنمای حوزه ها</strong>
                        </div>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Col>
    </Row>
  )
}
