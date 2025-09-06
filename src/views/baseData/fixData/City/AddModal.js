import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { GetCity,CreateCity } from '@store/slices/fixData'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import { Image } from 'react-feather'
import Select from 'react-select'
import DateObject from 'react-date-object'

const schema = yup.object({
  provinceId: yup.string().required('انتخاب استان الزامی است'),
  title: yup.string().required(' عنوان الزامی است'),
  familySupportRule: yup.string().required('قانون حمایت از خانواده الزامی است'),
 
})
export default function LicenseModal({ IsAddModal, SetIsAddModal }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.FixData)
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

    dispatch(CreateCity(payload)).then(() => {
      dispatch(GetCity()).then(() => {
        reset() // ← این فرم رو پاک می‌کنه
        toggle() // بس
      })
    })
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}> اضافه کردن شهر</ModalHeader>
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

             <Col lg={6}>
              <div className='mb-1'>
                <Label for='familySupportRule'>
                  قانون حمایت از خانواده<span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='familySupportRule'
                  control={control}
                  render={({ field }) => <Input id='familySupportRule' invalid={!!errors.familySupportRule} {...field} />}
                />
                {errors.familySupportRule && <FormFeedback>{errors.familySupportRule.message}</FormFeedback>}
                
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
                      store.Province?.items?.map((org) => ({
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
                        className={errors.Province ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.Province && <FormFeedback className='d-block'>{errors.Province.message}</FormFeedback>}
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
