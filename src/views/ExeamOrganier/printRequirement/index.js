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
  const [secoundScope, SetsecoundScope] = useState(0)
  const store = useSelector((state) => state.examScope)
  console.log(store)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAnsware, setIsLoadingAnsware] = useState(false)
  const [isLoadingfinalExam, setIsLoadingfinalExam] = useState(false)
  const handeleGetAttendance = (scope) => {
    dispatch(GetAttendance(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

      // ساختن لینک برای دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `attendance_${timestamp}.json` // اسم فایل خروجی
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
    })
  }
  const handeleGetChaireNumber = (scope) => {
    dispatch(GetChaireNumber(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

      // ساختن لینک برای دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `chaire_number_${timestamp}.json` // اسم فایل خروجی
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
    })
  }
  const handeleGetMatchImage = (scope) => {
    dispatch(GetMatchImage(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

      // ساختن لینک برای دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `match_image_${timestamp}.json` // اسم فایل خروجی
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
    })
  }
  const handeleGetPersonalAnswer = (scope) => {
    dispatch(GetPersonalAnswer(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const data = response.payload
      console.log('fileResponse', response)

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().substring(0, 10)
      // مثلا: 2025-09-05T14-22-33-123Z

      // ساختن یک blob از داده‌ها
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

      // ساختن لینک برای دانلود
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `personal_answer_${timestamp}.json` // اسم فایل خروجی
      link.click()

      // آزاد کردن URL از حافظه
      URL.revokeObjectURL(url)
    })
  }
  const handeleGetSubsiteHelp = (scope) => {
    dispatch(GetSubsiteHelp(`?ExamId=1&SubSiteId=${scope}`)).then((response) => {
      const blob = response.payload // مستقیم Blob
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const timestamp = new Date().toISOString().substring(0, 10)
      link.download = `sub_site_help_${scope}_${timestamp}.xlsx`
      link.click()
      URL.revokeObjectURL(url)
    })
  }

  const handeleGetAllScopes = () => {
    setIsLoading(true)
    dispatch(GetAllScopes(`?ExamId=1`)).then((response) => {
      // اینجا دیگه فقط Blob داری
      const blob = response.payload

      // اسم فایل رو دستی بده
      const filename = 'گزارش_آزمون استخدامی بانک مرکزی.zip'

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
      setIsLoading(false)
    })
  }
  const handeleGetAllAnware = () => {
    setIsLoadingAnsware(true)
    dispatch(GetAllAnware(`?ExamId=1`)).then((response) => {
      // اینجا دیگه فقط Blob داری
      const blob = response.payload

      // اسم فایل رو دستی بده
      const filename = 'پاسخ برگ استخدامی بانک مرکزی.zip'

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
      setIsLoadingAnsware(false)
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
  const handeleGetAllfinalExam = (scope) => {
    setIsLoadingfinalExam(true)
    dispatch(GetAllfinalExam(`?ExamId=1`)).then((response) => {
      const blob = response.payload // مستقیم Blob
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      link.download = `گزارش نهایی سازماندهی آزمون.xlsx`
      link.click()
      URL.revokeObjectURL(url)
          setIsLoadingfinalExam(false)
    })
  }
  useEffect(() => {
    dispatch(GetExamScopeSecound())
  }, [])

  return (
    <Row>
      <Col lg={12}>
        <Row className='mb-2'>
          <p className='route-base-color'>
            <span className='first-route-selected' onClick={() => navigate('/')}>
              خانه
            </span>{' '}
            /<span className='route-caption'> سازماندهی آزمون </span> /{' '}
            <span className='route-caption'> ملزومات چاپی </span>
          </p>
        </Row>
        <div>
          <Card className='mb-1'>
            <CardBody>
              <Row>
                <Col lg={12}>
                  <Button color='primary' className='w-100' onClick={() => handeleGetAllScopes()}>
                    {isLoading ? <Spinner size={22} /> : ' دانلود(zip) خروجی کل حوزه ها'}
                  </Button>
                </Col>
                <Col lg={12}>
                  <Button color='primary' className='w-100 mt-1' onClick={() => handeleGetAllAnware()}>
                    {isLoadingAnsware ? <Spinner size={22} /> : ' دانلود(zip) خروجی کل پاسخ برگ  ها'}
                  </Button>
                </Col>
                <Col lg={12}>
                  <Button color='primary' className='w-100 mt-1' onClick={() => handeleGetAllfinalExam()}>
                    {isLoadingfinalExam ? <Spinner size={22} /> : ' دانلود(zip) خروجی گزارش نهایی سازماندهی آرمون'}
                  </Button>
                </Col>

                <Col lg={12}>
                  <Label for='secoundScope' className='header-font'>
                    حوزه
                  </Label>
                  <Select
                    id='secoundScope'
                    placeholder='انتخاب حوزه فرعی'
                    options={
                      store.secoundScopes?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []
                    }
                    onChange={(item) => SetsecoundScope(item.value)}
                  />
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetMatchImage(secoundScope))}
                  >
                    <div className='w-100 d-flex justify-content-center'>
                      <Download size={25} color='#04364a' />
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-1'>
                      {' '}
                      <strong className='printRequirement-title w-100'> دانلود فایل تطبیق عکس </strong>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetAttendance(secoundScope))}
                  >
                    <div className='w-100 d-flex justify-content-center'>
                      <Download size={25} color='#04364a' />
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-1'>
                      <strong className='printRequirement-title'> دانلود فایل حضور و غیاب </strong>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetChaireNumber(secoundScope))}
                  >
                    <div className='w-100 d-flex justify-content-center'>
                      <Download size={25} color='#04364a' />
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-1'>
                      <strong className='printRequirement-title'> دانلود شماره صندلی </strong>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetPersonalAnswer(secoundScope))}
                  >
                    <div className='w-100 d-flex justify-content-center'>
                      <Download size={25} color='#04364a' />
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-1'>
                      <strong className='printRequirement-title'>دانلود پاسخنامه</strong>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className='printRequirement text-center'
                    onClick={() => (secoundScope === 0 ? handeleShowMessage() : handeleGetSubsiteHelp(secoundScope))}
                  >
                    <div className='w-100 d-flex justify-content-center'>
                      <Download size={25} color='#04364a' />
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-1'>
                      <strong className='printRequirement-title'>دانلود راهنمای حوزه ها</strong>
                    </div>
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
