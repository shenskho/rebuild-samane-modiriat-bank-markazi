import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Createlicense, Getlicenses, UploadFile } from '@store/slices/license'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import { Image } from 'react-feather'
import Select from 'react-select'
import DateObject from 'react-date-object'

const schema = yup.object({
  organizationId: yup.string().required('انتخاب دستگاه الزامی است'),
  licenseNumber: yup.string().required('شماره مجوز الزامی است'),
  issuanceDate: yup.string().required('تاریخ صدور الزامی است'),
  imageId: yup.string().required('بارگذاری تصویر الزامی است'), // ✅ just string, since after upload we store imageId
  expireDate: yup.string().required('تاریخ انقضاء الزامی است'),
  employmentCount: yup
    .number()
    .typeError('باید عدد باشد')
    .positive('عدد معتبر وارد کنید')
    .required('تعداد استخدام الزامی است')
})

export default function LicenseModal({ IsAddModal, SetIsAddModal }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.FixData)
  console.log(store)
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
      issuanceDate: toIsoYMD(data.issuanceDate),
      expireDate: toIsoYMD(data.expireDate)
    }

    console.log('licenseData (miladi)', payload)

    dispatch(Createlicense(payload)).then(() => {
      dispatch(Getlicenses()).then(() => {
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
            {/* دستگاه */}

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='organizationId'>
                  دستگاه <span className='text-danger'>*</span>
                </Label>

                <Controller
                  name='organizationId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.organizations?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []

                    return (
                      <Select
                        id='organizationId'
                        placeholder='انتخاب دستگاه'
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || '')}
                        className={errors.organizationId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.organizationId && (
                  <FormFeedback className='d-block'>{errors.organizationId.message}</FormFeedback>
                )}
              </div>
            </Col>
            {/* شماره مجوز */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='licenseNumber'>
                  شماره مجوز <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='licenseNumber'
                  control={control}
                  render={({ field }) => <Input id='licenseNumber' invalid={!!errors.licenseNumber} {...field} />}
                />
                {errors.licenseNumber && <FormFeedback>{errors.licenseNumber.message}</FormFeedback>}
              </div>
            </Col>

            {/* تاریخ صدور */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='issuanceDate'>
                  تاریخ صدور <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='issuanceDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      inputClass={`form-control ${errors.issuanceDate ? 'is-invalid' : ''}`}
                      value={field.value}
                      // onChange={(date) => field.onChange(date?.format?.('YYYY-MM-DD'))}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.issuanceDate && <FormFeedback>{errors.issuanceDate.message}</FormFeedback>}
              </div>
            </Col>

            {/* تاریخ انقضاء */}
            <Col lg={6}>
              <div className='mb-1 '>
                <Label for='expireDate' className='w-100'>
                  تاریخ انقضاء <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='expireDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      className=''
                      locale={persian_fa}
                      inputClass={`form-control w-100 ${errors.expireDate ? 'is-invalid' : ''}`}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.expireDate && <FormFeedback>{errors.expireDate.message}</FormFeedback>}
              </div>
            </Col>

            {/* تعداد استخدام */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='employmentCount'>
                  تعداد استخدام <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='employmentCount'
                  control={control}
                  render={({ field }) => (
                    <Input type='number' id='employmentCount' invalid={!!errors.employmentCount} {...field} />
                  )}
                />
                {errors.employmentCount && <FormFeedback>{errors.employmentCount.message}</FormFeedback>}
              </div>
            </Col>
            {/* تصویر مجوز */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='imageId'>
                  تصویر مجوز <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='imageId'
                  control={control}
                  render={({ field }) => {
                    const [fileName, setFileName] = React.useState('') // for showing selected file

                    const handleRemove = () => {
                      setFileName('')
                      field.onChange('') // clear value in form
                      document.getElementById('imageId').value = null // reset input
                    }

                    return (
                      <div className='d-flex align-items-center'>
                        {/* Hidden file input */}
                        <Input
                          id='imageId'
                          type='file'
                          accept='image/*'
                          style={{ display: 'none' }}
                          invalid={!!errors.imageId}
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setFileName(file.name) // show file name
                              const formData = new FormData()
                              formData.append('files', file)

                              const result = await dispatch(UploadFile(formData))
                              const imageId = result?.payload?.list[0]?.id
                              if (imageId) {
                                field.onChange(imageId) // set value in form
                              }
                            }
                          }}
                        />

                        {/* Custom button */}

                        {/* Display file name + remove icon */}
                        <div className='d-flex align-items-center justify-content-left pl-0 pr-0 form-control'>
                          <Button
                            color='primary'
                            className='m-0'
                            onClick={() => document.getElementById('imageId').click()}
                          >
                            <Image size={20} color='white' />
                          </Button>
                          <span className='text-center ml-1'>{fileName || 'فایلی انتخاب نشده'}</span>
                          {fileName && (
                            <Button color='danger' size='sm' outline className='ms-2' onClick={handleRemove}>
                              ✕
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  }}
                />
                {errors.imageId && <FormFeedback className='d-block'>{errors.imageId.message}</FormFeedback>}
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
