import React, { useEffect } from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { SetRecevierInfo, GetQuarantineAllSubSutes, GetRemainingReport } from '@store/slices/examOrganizer'
import DateObject from 'react-date-object'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'

const schema = yup.object({
  examId: yup.number().required(),
  subSiteId: yup.number().required(),

  receiverFirstname: yup.string().required('نام الزامی است'),
  receiverLastname: yup.string().required('نام خانوادگی الزامی است'),

  // 🔹 اعتبارسنجی کد ملی ایران (۱۰ رقم + الگوریتم ساده)
  receiverNationalCode: yup
    .string()
    .required('کد ملی الزامی است')
    .matches(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد')
    .test('isValidNationalCode', 'کد ملی معتبر نیست', (value) => {
      if (!value) return false
      if (/^(\d)\1+$/.test(value)) return false // همه ارقام یکسان نباشه
      const check = +value[9]
      const sum =
        value
          .split('')
          .slice(0, 9)
          .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11
      return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
    }),

  // 🔹 شماره موبایل ایران: 11 رقم و شروع با 09
  receiverMobile: yup
    .string()
    .required('شماره موبایل الزامی است')
    .matches(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),

  // 🔹 تاریخ و زمان معتبر
  receiverDateTime: yup.string().required('تاریخ و زمان الزامی است')
})

export default function ExamSettingsModal({ IsReciveModal, SetIsReciveModal }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.examOrganizer)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      examId: 1,
      subSiteId: localStorage.getItem("subSiteIds"),
      receiverFirstname: '',
      receiverLastname: '',
      receiverNationalCode: '',
      receiverMobile: '',
      receiverDateTime: ''
    }
  })

  const toggle = () => SetIsReciveModal(!IsReciveModal)

  useEffect(() => {
    if (store?.subSite?.item) {
      reset({})
    }
  }, [store?.subSite?.item, reset])

  const faNumToEn = (faNum) => (faNum ? faNum.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) : '')

  const toIsoDateTime = (shamsiDate) => {
    if (!shamsiDate) return ''
    const enDate = faNumToEn(shamsiDate)
    return new DateObject({ date: enDate, calendar: persian, format: 'YYYY/MM/DD' })
      .convert(gregorian)
      .format('YYYY-MM-DD')
  }

  const onSubmit = (data) => {
    const payload = {
      examId: Number(data.examId),
      subSiteId: Number(data.subSiteId),
      receiverFirstname: String(data.receiverFirstname),
      receiverLastname: String(data.receiverLastname),
      receiverNationalCode: String(data.receiverNationalCode),
      receiverMobile: String(data.receiverMobile),
      receiverDateTime: toIsoDateTime(data.receiverDateTime)
    }

    console.log('Payload:', payload)

    dispatch(SetRecevierInfo(payload)).then(() => {
      dispatch(GetQuarantineAllSubSutes('?ExamId=1'))
      dispatch(GetRemainingReport('?ExamId=1'))
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsReciveModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اطلاعات تحویل‌گیرنده</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='receiverFirstname'>
                  نام <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='receiverFirstname'
                  control={control}
                  render={({ field }) => (
                    <Input id='receiverFirstname' invalid={!!errors.receiverFirstname} {...field} />
                  )}
                />
                {errors.receiverFirstname && <FormFeedback>{errors.receiverFirstname.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='receiverLastname'>
                  نام خانوادگی <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='receiverLastname'
                  control={control}
                  render={({ field }) => <Input id='receiverLastname' invalid={!!errors.receiverLastname} {...field} />}
                />
                {errors.receiverLastname && <FormFeedback>{errors.receiverLastname.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='receiverNationalCode'>
                  کد ملی <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='receiverNationalCode'
                  control={control}
                  render={({ field }) => (
                    <Input id='receiverNationalCode' invalid={!!errors.receiverNationalCode} {...field} />
                  )}
                />
                {errors.receiverNationalCode && <FormFeedback>{errors.receiverNationalCode.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='receiverMobile'>
                  شماره موبایل <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='receiverMobile'
                  control={control}
                  render={({ field }) => <Input id='receiverMobile' invalid={!!errors.receiverMobile} {...field} />}
                />
                {errors.receiverMobile && <FormFeedback>{errors.receiverMobile.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='receiverDateTime'>
                  تاریخ و زمان <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='receiverDateTime'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      format='YYYY/MM/DD'
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      inputClass={`form-control ${errors.receiverDateTime ? 'is-invalid' : ''}`}
                      showTimePicker
                    />
                  )}
                />
                {errors.receiverDateTime && <FormFeedback>{errors.receiverDateTime.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={12}>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ثبت
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
