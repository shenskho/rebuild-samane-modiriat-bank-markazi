import React, { useEffect } from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateExamScope, GetExamScope, GetCity } from '@store/slices/examScope'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import Select from 'react-select'
import DateObject from 'react-date-object'

const schema = yup.object({
  title: yup.string().required('عنوان الزامی است'),
  provinceId: yup.number().typeError('استان الزامی است').required('استان الزامی است'),
  cityId: yup.number().typeError('شهر الزامی است').required('شهر الزامی است'),
  managerFirstname: yup.string().required('نام مدیر الزامی است'),
  managerLastname: yup.string().required('نام خانوادگی مدیر الزامی است'),
  contractDate: yup.mixed().required('تاریخ قرارداد الزامی است'),
  contractPrice: yup.number().typeError('مبلغ قرارداد باید عدد باشد').required('مبلغ قرارداد الزامی است'),
  address: yup.string().required('آدرس الزامی است'),
  telephone: yup
    .string()
    .matches(/^0\d{9,10}$/, 'شماره تلفن معتبر نیست')
    .required('تلفن الزامی است')
})

export default function LicenseModal({ IsEditModal, SetIsEditModal, item }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.examScope)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {} // اینجا خالیه ولی پایین تو useEffect مقدار می‌دیم
  })

  const toggle = () => SetIsEditModal(!IsEditModal)

  const faNumToEn = (faNum) => {
    if (!faNum) return ''
    return faNum.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
  }
  const toIsoYMD = (shamsiDate) => {
    if (!shamsiDate) return null
    const enDate = faNumToEn(shamsiDate)
    return new DateObject({
      date: enDate,
      format: 'YYYY/MM/DD',
      calendar: persian
    })
      .convert(gregorian)
      .format('YYYY-MM-DD')
  }

  // 👉 وقتی item تغییر کنه، فرم مقدار پیش‌فرض می‌گیره
  useEffect(() => {
    if (item) {
      reset({
        title: item.title || '',
        provinceId: item.provinceId || 0,
        cityId: item.cityId || 0,
        managerFirstname: item.managerFirstname || '',
        managerLastname: item.managerLastname || '',
        contractDate: item.contractDate
          ? new DateObject({ date: item.contractDate, calendar: gregorian }).convert(persian)
          : null,
        contractPrice: item.contractPrice || '',
        address: item.address || '',
        telephone: item.telephone || ''
      })

      // گرفتن شهرهای مربوط به استان
      if (item.provinceId) {
        dispatch(GetCity(item.provinceId))
      }
    }
  }, [item, reset, dispatch])

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id:item.id,
      provinceId: Number(data.provinceId),
      cityId: Number(data.cityId),
      contractPrice: Number(data.contractPrice),
      contractDate: toIsoYMD(data.contractDate?.format?.('YYYY/MM/DD')) // ✅ تاریخ به میلادی
    }

    console.log('ExamScope', payload)

    dispatch(UpdateExamScope(payload)).then(() => {
      dispatch(GetExamScope()).then(() => {
        reset()
        toggle()
      })
    })
  }
  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>مجوز جذب</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* عنوان */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='title'>
                  عنوان <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => <Input id='title' invalid={!!errors.title} {...field} />}
                />
                {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
              </div>
            </Col>

            {/* استان */}
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
                      store.province?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []
                    return (
                      <Select
                        id='provinceId'
                        placeholder='انتخاب استان'
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => {
                          const selectedValue = selected?.value || 0
                          field.onChange(selectedValue)

                          // ریست کردن شهر وقتی استان عوض میشه
                          reset((prev) => ({ ...prev, cityId: 0 }))

                          // گرفتن شهرها بر اساس استان
                          if (selectedValue) {
                            dispatch(GetCity(selectedValue))
                          }
                        }}
                        className={errors.provinceId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.provinceId && <FormFeedback className='d-block'>{errors.provinceId.message}</FormFeedback>}
              </div>
            </Col>

            {/* شهر */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='cityId'>
                  شهر <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='cityId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.citys?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []
                    return (
                      <Select
                        id='cityId'
                        placeholder='انتخاب شهر'
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || 0)}
                        className={errors.cityId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.cityId && <FormFeedback className='d-block'>{errors.cityId.message}</FormFeedback>}
              </div>
            </Col>

            {/* نام مدیر */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='managerFirstname'>
                  نام مدیر <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='managerFirstname'
                  control={control}
                  render={({ field }) => <Input id='managerFirstname' invalid={!!errors.managerFirstname} {...field} />}
                />
                {errors.managerFirstname && <FormFeedback>{errors.managerFirstname.message}</FormFeedback>}
              </div>
            </Col>

            {/* نام خانوادگی مدیر */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='managerLastname'>
                  نام خانوادگی مدیر <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='managerLastname'
                  control={control}
                  render={({ field }) => <Input id='managerLastname' invalid={!!errors.managerLastname} {...field} />}
                />
                {errors.managerLastname && <FormFeedback>{errors.managerLastname.message}</FormFeedback>}
              </div>
            </Col>

            {/* تاریخ قرارداد */}
            <Col lg={6}>
              <div className='mb-1 '>
                <Label for='contractDate' className='w-100'>
                  تاریخ عقد قرارداد <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='contractDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      className=''
                      locale={persian_fa}
                      inputClass={`form-control w-100 ${errors.contractDate ? 'is-invalid' : ''}`}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.contractDate && <FormFeedback>{errors.contractDate.message}</FormFeedback>}
              </div>
            </Col>

            {/* مبلغ قرارداد */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='contractPrice'>
                  مبلغ قرارداد <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='contractPrice'
                  control={control}
                  render={({ field }) => (
                    <Input type='number' id='contractPrice' invalid={!!errors.contractPrice} {...field} />
                  )}
                />
                {errors.contractPrice && <FormFeedback>{errors.contractPrice.message}</FormFeedback>}
              </div>
            </Col>
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='telephone'>
                  تلفن <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='telephone'
                  control={control}
                  render={({ field }) => <Input id='telephone' invalid={!!errors.telephone} {...field} />}
                />
                {errors.telephone && <FormFeedback>{errors.telephone.message}</FormFeedback>}
              </div>
            </Col>
            {/* آدرس */}
            <Col lg={12}>
              <div className='mb-1'>
                <Label for='address'>
                  آدرس <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => <Input type='textarea' id='address' invalid={!!errors.address} {...field} />}
                />
                {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
              </div>
            </Col>

            {/* تلفن */}

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
