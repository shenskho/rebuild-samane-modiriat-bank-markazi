import React, { useEffect } from 'react'
import {
  Button,
  FormFeedback,
  Form,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  ModalFooter
} from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import DateObject from 'react-date-object'
import { UploadFile, ReadFile, EditUser } from '@store/slices/operator'

// ✅ اسکیما اعتبارسنجی ساده
const schema = yup.object({
  firstname: yup.string().required('نام الزامی است'),
  lastname: yup.string().required('نام خانوادگی الزامی است'),
  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد')
    .required('کد ملی الزامی است'),
  mobile: yup
    .string()
    .matches(/^(\+98|0)?9\d{9}$/, 'موبایل معتبر نیست')
    .required('موبایل الزامی است'),
  birthDate: yup.mixed().required('تاریخ تولد الزامی است')
})

export default function UserEditModal({ isOpen, toggle, userInfo, TicketID }) {
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      nationalCode: '',
      mobile: '',
      birthDate: null
      // بقیه فیلدها هم میتونن خالی باشن
    }
  })

  useEffect(() => {
    if (userInfo) {
      reset({
        ...userInfo,
        birthDate: userInfo.birthDate
          ? new DateObject({ date: userInfo.birthDate, calendar: gregorian }).convert(persian)
          : null,
        graduationDate: userInfo.graduationDate
          ? new DateObject({ date: userInfo.graduationDate, calendar: gregorian }).convert(persian)
          : null,
        militaryEndDate: userInfo.militaryEndDate
          ? new DateObject({ date: userInfo.militaryEndDate, calendar: gregorian }).convert(persian)
          : null,
        militaryExemptionDate: userInfo.militaryExemptionDate
          ? new DateObject({ date: userInfo.militaryExemptionDate, calendar: gregorian }).convert(persian)
          : null
      })
    }
  }, [userInfo, reset])

  // // ذخیره میلادی به YYYY-MM-DD
  const toIsoYMD = (dateObj) => {
    if (!dateObj) return null
    return faNumToEn( dateObj.convert(gregorian).format('YYYY-MM-DD'))
  }
  const faNumToEn = (faNum) => {
  if (!faNum) return "";
  return faNum.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

  const onSubmit = (data) => {
    const payload = {
      ...data,
      ticketId: TicketID,
      birthDate: toIsoYMD(data.birthDate),
      graduationDate: toIsoYMD(data.graduationDate),
      militaryEndDate: toIsoYMD(data.militaryEndDate),
      militaryExemptionDate: toIsoYMD(data.militaryExemptionDate)
    }
    dispatch(EditUser(payload)).then((response) => {
      if (response.payload) {
        toggle()
      }
    })
    console.log('payload =>', payload)
    // toggle()
  }

  const FileInput = ({ field, label }) => {
    const [fileName, setFileName] = React.useState('')
    const [preview, setPreview] = React.useState('')

    // بارگذاری تصویر قبلی از سرور
    React.useEffect(() => {
      if (field.value) {
        dispatch(ReadFile(field.value)).then((response) => {
          const base64 = response.payload?.result?.item?.content
          if (base64) setPreview(`data:image/png;base64,${base64}`)
        })
      } else {
        setPreview('')
      }
    }, [field.value])

    return (
      <div className='mt-2'>
        <Label>{label}</Label>
        <Input
          type='file'
          accept='image/*'
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) {
              setFileName(file.name)
              const formData = new FormData()
              formData.append('files', file)
              const result = await dispatch(UploadFile(formData))
              const imageId = result?.payload?.list[0]?.id
              if (imageId) field.onChange(imageId)
            }
          }}
        />
        {fileName && <small>{fileName}</small>}
        {preview && (
          <div className='mt-1'>
            <img src={preview} alt='preview' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          </div>
        )}
      </div>
    )
  }

  return (
    <Modal size='lg' isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش اطلاعات کاربری</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* مشخصات فردی */}
            <Col lg={6}>
              <Label>نام</Label>
              <Controller
                name='firstname'
                control={control}
                render={({ field }) => <Input {...field} invalid={!!errors.firstname} />}
              />
              {errors.firstname && <FormFeedback>{errors.firstname.message}</FormFeedback>}
            </Col>
            <Col lg={6}>
              <Label>نام خانوادگی</Label>
              <Controller
                name='lastname'
                control={control}
                render={({ field }) => <Input {...field} invalid={!!errors.lastname} />}
              />
              {errors.lastname && <FormFeedback>{errors.lastname.message}</FormFeedback>}
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>نام پدر</Label>
              <Controller name='fatherName' control={control} render={({ field }) => <Input {...field} />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>کد ملی</Label>
              <Controller
                name='nationalCode'
                control={control}
                render={({ field }) => <Input {...field} invalid={!!errors.nationalCode} />}
              />
              {errors.nationalCode && <FormFeedback>{errors.nationalCode.message}</FormFeedback>}
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>شماره شناسنامه</Label>
              <Controller name='shenasnameCode' control={control} render={({ field }) => <Input {...field} />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>موبایل</Label>
              <Controller
                name='mobile'
                control={control}
                render={({ field }) => <Input {...field} invalid={!!errors.mobile} />}
              />
              {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تاریخ تولد</Label>
              <Controller
                name='birthDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={field.onChange}
                    inputClass={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                  />
                )}
              />
              {errors.birthDate && <FormFeedback className='d-block'>{errors.birthDate.message}</FormFeedback>}
            </Col>

            <Col lg={6} className='mt-2'>
              <Label>تعداد فرزندان</Label>
              <Controller
                name='childrenCount'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>جنسیت</Label>
              <Controller
                name='genderType'
                control={control}
                render={({ field }) => (
                  <Input type='select' {...field}>
                    <option value=''>انتخاب کنید</option>
                    <option value={1}>مرد</option>
                    <option value={2}>زن</option>
                  </Input>
                )}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>وضعیت تأهل</Label>
              <Controller
                name='marriageState'
                control={control}
                render={({ field }) => (
                  <Input type='select' {...field}>
                    <option value=''>انتخاب کنید</option>
                    <option value={1}>مجرد</option>
                    <option value={2}>متاهل</option>
                  </Input>
                )}
              />
            </Col>

            {/* تحصیلات */}
            <Col lg={6} className='mt-2'>
              <Label>مقطع تحصیلی</Label>
              <Controller
                name='educationLevelId'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>رشته تحصیلی</Label>
              <Controller
                name='educationFieldId'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>نام دانشگاه</Label>
              <Controller name='universityName' control={control} render={({ field }) => <Input {...field} />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>معدل</Label>
              <Controller
                name='graduationAverage'
                control={control}
                render={({ field }) => <Input type='number' step='0.1' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تاریخ فارغ‌التحصیلی</Label>
              <Controller
                name='graduationDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={field.onChange}
                    inputClass='form-control'
                  />
                )}
              />
            </Col>

            {/* نظام وظیفه */}
            <Col lg={6} className='mt-2'>
              <Label>وضعیت نظام وظیفه</Label>
              <Controller
                name='militaryStateId'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>مدت خدمت (ماه)</Label>
              <Controller
                name='militaryMonths'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تاریخ پایان خدمت</Label>
              <Controller
                name='militaryEndDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={field.onChange}
                    inputClass='form-control'
                  />
                )}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تاریخ معافیت</Label>
              <Controller
                name='militaryExemptionDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={field.onChange}
                    inputClass='form-control'
                  />
                )}
              />
            </Col>

            {/* سوابق */}
            <Col lg={6} className='mt-2'>
              <Label>سابقه کار (ماه)</Label>
              <Controller
                name='workExperienceMonths'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>حافظ قرآن</Label>
              <Controller
                name='isQuranMemorize'
                control={control}
                render={({ field }) => (
                  <Input type='checkbox' checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                )}
              />
            </Col>

            {/* تصاویر */}
            <Col lg={6}>
              <Controller
                name='personalImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='تصویر پرسنلی' />}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='nationalCardImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='تصویر کارت ملی' />}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='shenasnamePage1ImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='شناسنامه صفحه ۱' />}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='shenasnamePage2ImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='شناسنامه صفحه ۲' />}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='shenasnamePage3ImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='شناسنامه صفحه ۳' />}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='shenasnameDescImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='پیوست شناسنامه' />}
              />
            </Col>

            {/* دکمه ثبت */}
          </Row>
          <Row className='w-100'>
            <Col md={6} className='mt-1'>
              <Button color='primary' className='w-100' type='submit' block disabled={!isValid}>
                ثبت تغییرات
              </Button>
            </Col>
            <Col md={6} className='mt-1'>
              <Button color='secondary' className='w-100' onClick={toggle}>
                بستن
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
