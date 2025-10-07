import React, { useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Input } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'

import { GetUserExcel, GetAlExel } from '@store/slices/candidate'
import { useDispatch } from 'react-redux'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import AddModal from './AddModal'
import DoCorrection from './DoCorrection'

export default function Index() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [nationalCode, setNationalCode] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const handleDownloadExcel = async () => {
    if (!nationalCode) {
      alert('کد ملی را وارد کنید')
      return
    }

    try {
      const response = await dispatch(GetUserExcel(nationalCode)).unwrap()

      // assume response is a Blob (Excel file)
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `User_${nationalCode}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Excel download failed:', error)
    }
  }

  // فقط یک آیتم تستی
  const options = [{ value: 'test', label: 'بانک مرکزی' }]

  const handeleDownloadAllExel = async () => {
    try {
      // درخواست به API برای دریافت فایل Excel
      const res = await dispatch(GetAlExel()).unwrap()

      // ساخت Blob از داده‌های باینری با MIME-type اکسل
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      console.log('Excel size:', blob.size, 'bytes')

      // زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().replace(/[:.]/g, '-')

      // ساختن لینک دانلود
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `FinalResult_${timestamp}.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()

      // آزادسازی حافظه
      window.URL.revokeObjectURL(url)

      console.log('Excel Download completed')
    } catch (err) {
      console.error('Excel Download failed:', err)
    }
  }

  return (
    <Row>
      <Col lg={12}>
        <p className='route-base-color'>
          <span className='first-route-selected' onClick={() => navigate('/')}>
            خانه
          </span>{' '}
          / <span className='route-caption'>اطلاعات پایه</span> /{' '}
          <span className='route-caption' onClick={() => navigate('/fixData')}>
            تصحیح پاسخنامه ها
          </span>{' '}
        </p>
      </Col>

      <Col lg={12} className='base-data-container'>
        <Card className='mb-2 w-100'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader>
                    <h4>تصحیح پاسخنامه ها</h4>
                  </CardHeader>

                  <CardBody>
                    {/* Select */}
                    <div className='mb-2'>
                      <Select
                        className='w-100'
                        options={options}
                        value={selectedOption}
                        onChange={(opt) => setSelectedOption(opt)}
                        placeholder='یک آیتم انتخاب کنید'
                      />
                    </div>

                    <Row>
                      <Col lg={6} md={6}>
                        <Button
                          color='primary'
                          onClick={() => SetIsAddModal(!IsAddModal)}
                          className='w-100 '
                          disabled={!selectedOption} // غیر فعال تا وقتی آیتم انتخاب نشه
                        >
                          دریافت و پردازش کل نتایج آزمون
                        </Button>
                      </Col>
                      <Col lg={6} md={6}>
                        <Row>
                          <Col lg={7} md={7}>
                            <Input
                              type='text'
                              value={nationalCode}
                              onChange={(e) => setNationalCode(e.target.value)}
                              placeholder='کد ملی'
                              className=' w-100'
                              disabled={!selectedOption} // غیر فعال تا وقتی آیتم انتخاب نشه
                            />
                          </Col>
                          <Col lg={5} md={5}>
                            <Button
                              color='primary'
                              className=' w-100'
                              onClick={handleDownloadExcel}
                              disabled={!selectedOption} // غیر فعال تا وقتی آیتم انتخاب نشه
                            >
                              دریافت فایل اکسل
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      {/* <Col lg={6} md={6}>
                                   <Button
                          color='primary'
                          onClick={handeleDownloadAllExel} // پرانتز لازم نیست اینجا
                          className='w-100 mt-05'
                          disabled={!selectedOption}
                        >
                          (اکسل) دریافت و پردازش کل نتایج آزمون
                        </Button>
                         <p>پس از تصحیح سوالات آزمون اکسل نتایج پر می شود</p>

            
                      </Col> */}
                    </Row>
                  </CardBody>
                  <CardBody>
                    <DoCorrection selectedOption={!selectedOption} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <AddModal onClose={() => SetIsAddModal(!IsAddModal)} show={IsAddModal} />
    </Row>
  )
}
