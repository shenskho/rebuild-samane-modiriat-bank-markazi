import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { CreateComplementEvaluationAgency, GetComplementEvaluationAgency } from '@store/slices/variableData'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import { Image } from 'react-feather'
import Select from 'react-select'
import DateObject from 'react-date-object'

const schema = yup.object({
  provinceId: yup.string().required('انتخاب استان الزامی است'),
  title: yup.string().required('شماره عنوان الزامی است'),
  licenseExpireDate: yup.string().required('تاریخ صدور الزامی است'),
  activityScopeId: yup.string().required('بارگذاری تصویر الزامی است'), // ✅ just string, since after upload we store activityScopeId
  mangerFullname: yup.string().required('تاریخ انقضاء الزامی است'),
  mobile: yup.number(),
  isEnabled: yup.string().required('تاریخ انقضاء الزامی است')
})
export default function LicenseModal({ IsAddModal, SetIsAddModal }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.variableData)
  console.log("store",store)
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const toggle = () => SetIsAddModal(!IsAddModal)

  // نمایش شمسی از میلادی ذخیره‌شده
  // const toPersianDisplay = (iso) => {
  //   if (!iso) return null
  //   return new DateObject({ date: iso, format: "YYYY-MM-DD", calendar: gregorian }).convert(persian)
  // }
  const faNumToEn = (faNum) => {
    if (!faNum) return ''
    return faNum.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
  }
  // // ذخیره میلادی به YYYY-MM-DD
  const toIsoYMD = (shamsiDate) => {
    if (!shamsiDate) return null

    // تبدیل اعداد فارسی به انگلیسی
    const enDate = faNumToEn(shamsiDate)

    return new DateObject({
      date: enDate,
      format: 'YYYY/MM/DD',
      calendar: persian
    })
      .convert(gregorian)
      .format('YYYY-MM-DD')
  }

  const onSubmit = (data) => {
    console.log('licenseData (miladi)', data)
    // 🔹 تاریخ‌ها رو به میلادی تبدیل کن
    const payload = {
      ...data,
      licenseExpireDate: toIsoYMD(data.licenseExpireDate)
    }

    console.log('licenseData (miladi)', payload)

    dispatch(CreateComplementEvaluationAgency(payload)).then(() => {
      dispatch(GetComplementEvaluationAgency()).then(() => {
        reset() // ← این فرم رو پاک می‌کنه
        toggle() // بس
      })
    })
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}> مجوز جذب</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='title'>
                  عنوان<span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => <Input id='title' invalid={!!errors.title} {...field} />}
                />
                {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
              </div>
            </Col>

            {/* عنوان  */}

            {/* تاریخ اعتبار مجوز*/}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='licenseExpireDate'>
                  تاریخ اعتبار مجوز <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='licenseExpireDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      inputClass={`form-control ${errors.licenseExpireDate ? 'is-invalid' : ''}`}
                      value={field.value}
                      // onChange={(date) => field.onChange(date?.format?.('YYYY-MM-DD'))}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.licenseExpireDate && <FormFeedback>{errors.licenseExpireDate.message}</FormFeedback>}
              </div>
            </Col>

            {/*گستره فعالیت*/}
  

                  <Col lg={6}>
              <div className='mb-1'>
                <Label for='mangerFullname'>
                  نام مدیر عامل<span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='mangerFullname'
                  control={control}
                  render={({ field }) => <Input id='mangerFullname' invalid={!!errors.mangerFullname} {...field} />}
                />
                {errors.mangerFullname && <FormFeedback>{errors.mangerFullname.message}</FormFeedback>}
              </div>
            </Col>
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='provinceId'>
                  استان <span className='text-danger'>*</span>
                </Label>

                <Controller
                  name='provinceId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.provinces?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []

                    return (
                      <Select
                        id='provinceId'
                        placeholder='انتخاب دستگاه'
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || '')}
                        className={errors.provinceId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.provinceId && <FormFeedback className='d-block'>{errors.provinceId.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='mobile'>
                  شماره همراه  <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='mobile'
                  control={control}
                  render={({ field }) => <Input type='tel'  id='mobile' invalid={!!errors.mobile} {...field} />}
                />
                {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
              </div>
            </Col>


  
                 <Col lg={6}>
              <div className='mb-1'>
                <Label for='activityScopeId'>
                  گستره فعالیت <span className='text-danger'>*</span>
                </Label>

                <Controller
                  name='activityScopeId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.activitys?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []

                    return (
                      <Select
                        id='activityScopeId'
                        placeholder='انتخاب '
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || '')}
                        className={errors.activityScopeId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.activityScopeId && <FormFeedback className='d-block'>{errors.activityScopeId.message}</FormFeedback>}
              </div>
            </Col>

                     <Col lg={6}>
              <div className='mb-1'>
                <Label for='isEnabled'>
                 وضعیت <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='isEnabled'
                  control={control}
                  render={({ field }) => <Input type='switch'  id='mobile' invalid={!!errors.mobile} {...field} />}
                />
                {errors.isEnabled && <FormFeedback>{errors.isEnabled.message}</FormFeedback>}
              </div>
            </Col>
  
 
  





            {/* دکمه ثبت */}
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
