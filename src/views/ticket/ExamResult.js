import React, { useState, useRef } from 'react'
import { Card, CardBody, Row, Col, Button, Input, Label, Spinner, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AnswareTicket, GetResultExam } from '@store/slices/operator'
import { Download, Image } from 'react-feather'
import { FaFileExcel, FaFilePdf } from 'react-icons/fa'

import pdfMake from 'pdfmake/build/pdfmake'

import loadFonts from './pdfFontsCustom' // مسیر فایل بالا
export default function ExamResult() {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.operator)
  const [nationalCode, setNationalCode] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const componentRef = useRef()

  const [loading, setLoading] = useState(false)

  const handleExecute = async () => {
    if (!nationalCode) {
      alert('لطفاً  کد ملی را وارد کنید')
      return
    }
    setLoading(true)
    try {
      await dispatch(GetResultExam(`nationalCode=${nationalCode}`))
    } catch (error) {
      console.error('خطا در اجرای درخواست:', error)
    } finally {
      setLoading(false)
    }
  }
  // const handleDownloadPDF = useReactToPrint({
  //   content: () => componentRef.current
  // })
const handleDownloadPDF = async () => {
  const result = store?.resultExam
  if (!result) return alert('نتیجه‌ای موجود نیست')

  setPdfLoading(true)
  try {
    await loadFonts()

    let applicantImageDataUrl = ''
    if (result?.applicantInfo?.personalImage) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/File/get-file-as-link?DocumentId=${result.applicantInfo.personalImage}`
        )
        const blob = await res.blob()
        applicantImageDataUrl = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(blob)
        })
      } catch (err) {
        console.warn('تصویر داوطلب قابل بارگذاری نیست:', err)
      }
    }

    const createCourseTable = (courses) => [
      ['درس', 'درست', 'نادرست', 'بی‌پاسخ', 'نمره ۱۰۰'],
      ...(courses || []).map((c) => [
        { text: c.courseName, noWrap: false, alignment: 'right' },
        { text: c.correctAnswers, noWrap: false, alignment: 'right' },
        { text: c.incorrectAnswers, noWrap: false, alignment: 'right' },
        { text: c.emptyAnswers, noWrap: false, alignment: 'right' },
        { text: c.courseScoreFrom100, noWrap: false, alignment: 'right' }
      ])
    ]

    const docDefinition = {
       pageSize: 'A4',
  pageOrientation: 'portrait',
  content: [
    applicantImageDataUrl
      ? { image: applicantImageDataUrl, width: 130, alignment: 'center', margin: [0, 0, 0, 10] }
      : {},
    { text: '🧾 اطلاعات داوطلب', style: 'header' },
    {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [
          [
            { text: 'شناسه داوطلب', alignment: 'right' },
            { text: result.applicantInfo.applicantId, alignment: 'right' },
            { text: 'شناسه متقاضی', alignment: 'right' },
            { text: result.applicantInfo.candidateId, alignment: 'right' }
          ],
          [
            { text: 'نام', alignment: 'right' },
            { text: result.applicantInfo.firstName, alignment: 'right' },
            { text: 'نام خانوادگی', alignment: 'right' },
            { text: result.applicantInfo.lastName, alignment: 'right' }
          ],
          [
            { text: 'نام پدر', alignment: 'right' },
            { text: result.applicantInfo.fatherName, alignment: 'right' },
            { text: 'کد ملی', alignment: 'right' },
            { text: result.applicantInfo.nationalCode, alignment: 'right' }
          ],
          [
            { text: 'جنسیت', alignment: 'right' },
            { text: result.applicantInfo.gender === 1 ? 'مرد' : 'زن', alignment: 'right' },
            { text: 'تاریخ تولد', alignment: 'right' },
            { text: new Date(result.applicantInfo.birthDate).toLocaleDateString('fa-IR'), alignment: 'right' }
          ],
          [
            { text: 'مقطع تحصیلی', alignment: 'right' },
            { text: result.applicantInfo.educationLevel, alignment: 'right' },
            { text: 'رشته تحصیلی', alignment: 'right' },
            { text: result.applicantInfo.educationField, alignment: 'right' }
          ],
          [
            { text: 'میانگین کل', alignment: 'right' },
            { text: result.applicantInfo.graduationAverage, alignment: 'right' },
            { text: 'عنوان شغل انتخابی', alignment: 'right' },
            { text: result.applicantInfo.selectedJobTitle, alignment: 'right' }
          ],
          [
            { text: 'شرایط سهمیه', alignment: 'right' },
            { text: result.applicantInfo.licenseQuotaCondition, alignment: 'right' },
            { text: 'استان انتخابی', alignment: 'right' },
            { text: result.applicantInfo.selectedProvinceTitle, alignment: 'right' }
          ]
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 5, 0, 15]
    },

    { text: '📘 درس عمومی', style: 'subheaderGreen' },
    {
      table: { headerRows: 1, widths: ['*', '*', '*', '*', '*'], body: createCourseTable(result.generalCourses) },
      layout: 'lightHorizontalLines',
      margin: [0, 5, 0, 15]
    },

    { text: '📙 درس تخصصی', style: 'subheaderRed' },
    {
      table: { headerRows: 1, widths: ['*', '*', '*', '*', '*'], body: createCourseTable(result.specializedCourses) },
      layout: 'lightHorizontalLines',
      margin: [0, 5, 0, 15]
    },

    { text: '📊 عملکرد کلی', style: 'subheaderBlue' },
    {
      table: {
        headerRows: 1,
        widths: ['*', '*'],
        body: [
          ['مورد', 'مقدار'],
          ...(result.overalPerformance || []).map((item) => [
            { text: item.item1, alignment: 'right' },
            { text: item.item2, alignment: 'right' }
          ])
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 5, 0, 15]
    },

    { text: '🏁 نتیجه نهایی', style: 'subheaderOrange' },
    { text: result.finalDestinationResult || '', margin: [0, 0, 0, 5], alignment: 'right' },
    { text: `وضعیت نهایی: ${result.finalSumData?.finalDecision || ''}`, margin: [0, 0, 0, 2], alignment: 'right' },
    { text: `رتبه در سهمیه آزاد: ${result.finalSumData?.freeRank || ''}`, alignment: 'right' }
  ],
  styles: {
    header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'right' },
    subheaderGreen: { fontSize: 14, bold: true, color: '#198754', margin: [0, 10, 0, 5], alignment: 'right' },
    subheaderRed: { fontSize: 14, bold: true, color: '#dc3545', margin: [0, 10, 0, 5], alignment: 'right' },
    subheaderBlue: { fontSize: 14, bold: true, color: '#0dcaf0', margin: [0, 10, 0, 5], alignment: 'right' },
    subheaderOrange: { fontSize: 14, bold: true, color: '#fd7e14', margin: [0, 10, 0, 5], alignment: 'right' }
  },
  defaultStyle: { font: 'Vazirmatn', alignment: 'right', direction: 'ltr' }
}
    pdfMake.createPdf(docDefinition).download(`نتیجه_${result.applicantInfo.nationalCode}.pdf`)
  } finally {
    setPdfLoading(false)
  }
}


  const result = store?.resultExam || {}

  return (
    <Row className='mt-2 rtl'>
      <Col lg={12}>
        <Card>
          <CardBody>
            {/* 🔸 فیلدهای ورودی */}
            <Row className='mb-3'>
              <Col md={5}>
                <Label for='nationalCode'>کد ملی</Label>
                <Input
                  id='nationalCode'
                  value={nationalCode}
                  onChange={(e) => setNationalCode(e.target.value)}
                  placeholder='کد ملی را وارد کنید'
                />
              </Col>

              <Col md={2} className='d-flex align-items-end'>
                <Button color='primary' onClick={handleExecute} disabled={loading} className='w-100 mt-05'>
                  {loading ? <Spinner size='sm' /> : 'اجرا'}
                </Button>
              </Col>
            </Row>

            {/* 🔹 نمایش نتیجه */}
            {result?.applicantInfo && (
              <>
                <Row>
                  <Col md={4} className='d-flex align-items-center'>
                    <Button color='danger' className='w-100' onClick={handleDownloadPDF} disabled={pdfLoading}>
                      {pdfLoading ? (
                        <>
                          <Spinner size='sm' /> در حال ساخت PDF...
                        </>
                      ) : (
                        <>
                          خروجی PDF <FaFilePdf size={18} className='ms-1' />
                        </>
                      )}
                    </Button>
                  </Col>
                  <Col md={4} className='d-flex  align-items-center'>
                    <Button
                      className='w-100 mt-05'
                      color='info'
                      onClick={() => {
                        const url = `${
                          import.meta.env.VITE_API_BASE_URL
                        }/api/v1/Report/get-applicant-image-by-national-code?nationalCode=${
                          result.applicantInfo.nationalCode
                        }`
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', `پاسخنامه_${result.applicantInfo.nationalCode}.jpg`)
                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                      }}
                    >
                      <span>تصویر پاسخنامه داوطلب (jpg)</span>
                      <Download />
                    </Button>
                  </Col>
                  <Col md={4} className='d-flex  align-items-center'>
                    <Button
                      color='success'
                      className='w-100 mt-05'
                      onClick={() => {
                        const url = `${
                          import.meta.env.VITE_API_BASE_URL
                        }/api/v1/Report/get-applicant-excel-report?nationalCode=${result.applicantInfo.nationalCode}`
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', `خروجی اکسل${result.applicantInfo.nationalCode}.xlsx`)
                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                      }}
                    >
                      <span> خروجی اکسل داوطلب </span>
                      <FaFileExcel size={20} />
                    </Button>
                  </Col>
                </Row>
                <></>
                {/* id='exam-result-content' */}
                <div ref={componentRef}>
                  {/* 🔸 اطلاعات داوطلب */}
                  <Card className=' shadow-sm'>
                    <CardBody>
                      <strong className=' text-primary fw-bold'>🧾 اطلاعات داوطلب</strong>
                      <Row>
                        <Col md={12} className='d-flex justify-content-center align-items-center'>
                          <img
                            className='rounded shadow   mt-3'
                            src={`${import.meta.env.VITE_API_BASE_URL}/api/v1/File/get-file-as-link?DocumentId=${
                              result?.applicantInfo.personalImage
                            }`}
                            width={130}
                          />
                        </Col>
                      </Row>

                      <Table bordered responsive className='mb-0 mt-3'>
                        <tbody>
                          <tr>
                            <td className='fw-bold'>شناسه داوطلب</td>
                            <td>{result.applicantInfo.applicantId}</td>
                            <td className='fw-bold'>شناسه متقاضی</td>
                            <td>{result.applicantInfo.candidateId}</td>
                          </tr>
                          <tr>
                            <td className='fw-bold'>نام</td>
                            <td>{result.applicantInfo.firstName}</td>
                            <td className='fw-bold'>نام خانوادگی</td>
                            <td>{result.applicantInfo.lastName}</td>
                          </tr>
                          <tr>
                            <td className='fw-bold'>نام پدر</td>
                            <td>{result.applicantInfo.fatherName}</td>
                            <td className='fw-bold'>کد ملی</td>
                            <td>{result.applicantInfo.nationalCode}</td>
                          </tr>
                          <tr>
                            <td className='fw-bold'>جنسیت</td>
                            <td>{result.applicantInfo.gender === 1 ? 'مرد' : 'زن'}</td>
                            <td className='fw-bold'>تاریخ تولد</td>
                            <td>{new Date(result.applicantInfo.birthDate).toLocaleDateString('fa-IR')}</td>
                          </tr>
                          <tr>
                            <td className='fw-bold'>مقطع تحصیلی</td>
                            <td>{result.applicantInfo.educationLevel}</td>
                            <td className='fw-bold'>رشته تحصیلی</td>
                            <td>{result.applicantInfo.educationField}</td>
                          </tr>
                          <tr>
                            <td className='fw-bold'>میانگین کل</td>
                            <td>{result.applicantInfo.graduationAverage}</td>
                            <td className='fw-bold'>عنوان شغل انتخابی</td>
                            <td>{result.applicantInfo.selectedJobTitle}</td>
                          </tr>
                          <tr>
                            <td className='fw-bold'>شرایط سهمیه</td>
                            <td>{result.applicantInfo.licenseQuotaCondition}</td>
                            <td className='fw-bold'>استان انتخابی</td>
                            <td>{result.applicantInfo.selectedProvinceTitle}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  {/* 🔸 دروس عمومی */}
                  <Card className=' shadow-sm'>
                    <CardBody>
                      <h5 className=' text-success fw-bold'>📘 دروس عمومی</h5>
                      <Table bordered responsive>
                        <thead>
                          <tr className='text-center'>
                            <th>درس</th>
                            <th>درست</th>
                            <th>نادرست</th>
                            <th>بی‌پاسخ</th>
                            <th>نمره ۱۰۰</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.generalCourses?.map((c, i) => (
                            <tr key={i} className='text-center'>
                              <td>{c.courseName}</td>
                              <td>{c.correctAnswers}</td>
                              <td>{c.incorrectAnswers}</td>
                              <td>{c.emptyAnswers}</td>
                              <td>{c.courseScoreFrom100}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  {/* 🔸 دروس تخصصی */}
                  <Card className=' shadow-sm'>
                    <CardBody>
                      <h5 className=' text-danger fw-bold'>📙 دروس تخصصی</h5>
                      <Table bordered responsive>
                        <thead>
                          <tr className='text-center'>
                            <th>درس</th>
                            <th>درست</th>
                            <th>نادرست</th>
                            <th>بی‌پاسخ</th>
                            <th>نمره ۱۰۰</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.specializedCourses?.map((c, i) => (
                            <tr key={i} className='text-center'>
                              <td>{c.courseName}</td>
                              <td>{c.correctAnswers}</td>
                              <td>{c.incorrectAnswers}</td>
                              <td>{c.emptyAnswers}</td>
                              <td>{c.courseScoreFrom100}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  {/* 🔸 عملکرد کلی */}
                  <Card className=' shadow-sm'>
                    <CardBody>
                      <h5 className=' text-info fw-bold'>📊 عملکرد کلی</h5>
                      <Table bordered>
                        <tbody>
                          {result.overalPerformance?.map((item, i) => (
                            <tr key={i}>
                              <td>{item.item1}</td>
                              <td className='text-center fw-bold'>{item.item2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  {/* 🔸 نتیجه نهایی */}
                  <Card className='mt-3 shadow-sm'>
                    <CardBody>
                      <h5 className='mb-2 text-warning fw-bold'>🏁 نتیجه نهایی</h5>
                      <p className='fs-6'>{result.finalDestinationResult}</p>
                      <p className='mb-0 fw-bold'>
                        وضعیت نهایی: <span className='text-danger'>{result.finalSumData?.finalDecision}</span>
                      </p>
                      <p>رتبه در سهمیه آزاد: {result.finalSumData?.freeRank}</p>
                    </CardBody>
                  </Card>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
