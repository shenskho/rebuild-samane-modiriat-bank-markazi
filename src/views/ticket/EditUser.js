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
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import DateObject from 'react-date-object'
import { UploadFile, ReadFile, EditUser } from '@store/slices/operator'
import {
  GetQuota,
  GetReligion,
  GetEducationLevel,
  GetEducationField,
  GetDutystatus,
  getProvince,
  GetCity,
  GetVeteran
} from '@store/slices/fixData'
import { GetJob } from '@store/slices/variableData'
import Select from 'react-select'
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
  const store = useSelector((state) => state.FixData)
  console.log('storefixData', store)
  const storeVariable = useSelector((state) => state.variableData)
  console.log('storeVariable', storeVariable)
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
    dispatch(GetQuota())
    dispatch(GetReligion())
    dispatch(GetEducationLevel()).then(() => dispatch(GetEducationField(userInfo?.educationLevelId)))
    dispatch(GetDutystatus())
    dispatch(getProvince())
    dispatch(GetCity())
    dispatch(GetVeteran())
    //////////////////variableData////////////
    dispatch(GetJob())
  }, [])

  useEffect(() => {
    if (userInfo) {
      reset({
        ...userInfo,
        religionId: userInfo.religionId || null,
        quotaId: userInfo.quotaId || null,
        educationLevelId: userInfo.educationLevelId || null,
        educationFieldId: userInfo.educationFieldId || null,
        universityTypeTitle: userInfo.universityTypeTitle || null,
        militaryStateId: userInfo.militaryStateId || null,
        selectedProvinceId: userInfo.selectedProvinceId || null,
        birthCityId: userInfo.birthCityId || null,
        residenceCityId: userInfo.residenceCityId || null,
        veteranId: userInfo.veteranId || null,
        selectedJobId: userInfo.selectedJobId || null,
        child1BirthCityId: userInfo.child1BirthCityId || null,
        child2BirthCityId: userInfo.child2BirthCityId || null,
        child3BirthCityId: userInfo.child3BirthCityId || null,
        child4BirthCityId: userInfo.child4BirthCityId || null,
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
    return faNumToEn(dateObj.convert(gregorian).format('YYYY-MM-DD'))
  }
  const faNumToEn = (faNum) => {
    if (!faNum) return ''
    return faNum.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
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
    console.log('send data to edit', payload)
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
                       <option value={3}>معیل</option>  
                  </Input>
                )}
              />
            </Col>
            {/* تحصیلات */}
            <Col lg={6} className='mt-2'>
              <Label> مقطع تحصیلی</Label>

              <Controller
                name='educationLevelId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.EducationLevel?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='مقطع تحصیلی '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.educationLevelId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.educationLevelId && (
                <FormFeedback className='d-block'>{errors.educationLevelId.message}</FormFeedback>
              )}
            </Col>
            <Col lg={6} className='mt-2'>
              <Label> رشته تحصیلی </Label>

              <Controller
                name='educationFieldId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.EducationField?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='رشته تحصیلی  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.educationFieldId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.educationFieldId && (
                <FormFeedback className='d-block'>{errors.educationFieldId.message}</FormFeedback>
              )}
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>نام دانشگاه</Label>
              <Controller name='universityTypeTitle' control={control} render={({ field }) => <Input {...field} />} />
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
              <Label> وضعیت نظام وظیفه </Label>

              <Controller
                name='militaryStateId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.dutyStatus?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='وضعیت نظام وظیفه  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.militaryStateId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.militaryStateId && (
                <FormFeedback className='d-block'>{errors.militaryStateId.message}</FormFeedback>
              )}
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
              <Label>سابقه کار (ماه)</Label>
              <Controller
                name='workExperienceMonths'
                control={control}
                render={({ field }) => <Input type='number' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label> سهمیه</Label>

              <Controller
                name='quotaId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.Quota?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='انتخاب سهمیه'
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.quotaId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.quotaId && <FormFeedback className='d-block'>{errors.quotaId.message}</FormFeedback>}
            </Col>
            <Col lg={6} className='mt-2'>
              <Label> مذهب</Label>

              <Controller
                name='religionId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.Religion?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='انتخاب مذهب'
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.religionId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.religionId && <FormFeedback className='d-block'>{errors.religionId.message}</FormFeedback>}
            </Col>
            {/* 📌 اطلاعات محل تولد */}
            <Col lg={6} className='mt-2'>
              <Label> شهر تولد</Label>

              <Controller
                name='birthCityId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.City?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='شهر تولد '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.birthCityId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.birthCityId && <FormFeedback className='d-block'>{errors.birthCityId.message}</FormFeedback>}
            </Col>
            {/* 📌 اطلاعات تماس و محل سکونت */}
            <Col lg={6} className='mt-2'>
              <Label>موبایل اضطراری</Label>
              <Controller name='emergencyMobile' control={control} render={({ field }) => <Input {...field} />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>کد پستی</Label>
              <Controller name='postalCode' control={control} render={({ field }) => <Input {...field} />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label> شهر محل سکونت</Label>

              <Controller
                name='residenceCityId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.City?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='شهر محل سکونت'
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.residenceCityId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.residenceCityId && (
                <FormFeedback className='d-block'>{errors.residenceCityId.message}</FormFeedback>
              )}
            </Col>
            {/* 📌 وضعیت سلامتی و ایثارگری */}
            <Col lg={6} className='mt-2'>
              <Label>نوع معلولیت</Label>
              <Controller name='disabilityType' control={control} render={({ field }) => <Input {...field} />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label> ایثارگر </Label>

              <Controller
                name='veteranId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.Veteran?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='انتخاب ایثارگر  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.veteranId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.veteranId && <FormFeedback className='d-block'>{errors.veteranId.message}</FormFeedback>}
            </Col>

            {/* 📌 شغل انتخابی */}

            <Col lg={6} className='mt-2'>
              <Label> شغل انتخابی </Label>

              <Controller
                name='selectedJobId'
                control={control}
                render={({ field }) => {
                  const options =
                    storeVariable.Job?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='انتخاب شغل انتخابی  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.selectedJobId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.selectedJobId && <FormFeedback className='d-block'>{errors.selectedJobId.message}</FormFeedback>}
            </Col>
            {/* 📌 سابقه کار */}
            <Col lg={4} className='mt-2'>
              <Label>سابقه کار دارد؟</Label>
              <Controller
                name='hasWorkExperience'
                control={control}
                render={({ field }) => (
                  <Input type='checkbox' checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                )}
              />
            </Col>

            <Col lg={4} className='mt-2'>
              <Label>نیاز به کمک</Label>
              <Controller
                name='needAssist'
                control={control}
                render={({ field }) => (
                  <Input type='checkbox' checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                )}
              />
            </Col>

            <Col lg={4} className='mt-2'>
              <Label>بومی استان هستید؟</Label>
              <Controller
                name='applicantIsNative'
                control={control}
                render={({ field }) => (
                  <Input type='checkbox' checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                )}
              />
            </Col>

            <Col lg={6} className='mt-2'>
              <Label> استان انتخابی </Label>

              <Controller
                name='selectedProvinceId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.Province?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='انتخاب استان '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.selectedProvinceId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.selectedProvinceId && (
                <FormFeedback className='d-block'>{errors.selectedProvinceId.message}</FormFeedback>
              )}
            </Col>
            {/* 📌 فرزندان */}

            <Col lg={6} className='mt-2'>
              <Label> شهر تولد فرزند ۱ </Label>
              <Controller
                name='child1BirthCityId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.City?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='شهر تولد فرزند ۱  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.child1BirthCityId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.child1BirthCityId && (
                <FormFeedback className='d-block'>{errors.child1BirthCityId.message}</FormFeedback>
              )}
            </Col>

            <Col lg={6} className='mt-2'>
              <Label>شهر تولد فرزند ۲</Label>
              <Controller
                name='child2BirthCityId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.City?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='شهر تولد فرزند ۲ '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.child2BirthCityId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.child2BirthCityId && (
                <FormFeedback className='d-block'>{errors.child2BirthCityId.message}</FormFeedback>
              )}
            </Col>

            <Col lg={6} className='mt-2'>
              <Label> شهر تولد فرزند ۳ </Label>

              <Controller
                name='child3BirthCityId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.City?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='شهر تولد فرزند ۳  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.child3BirthCityId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.child3BirthCityId && (
                <FormFeedback className='d-block'>{errors.child3BirthCityId.message}</FormFeedback>
              )}
            </Col>

            <Col lg={6} className='mt-2'>
              <Label> شهر تولد فرزند ۴ </Label>

              <Controller
                name='child4BirthCityId'
                control={control}
                render={({ field }) => {
                  const options =
                    store.City?.items?.map((org) => ({
                      value: org.id,
                      label: org.title
                    })) || []

                  return (
                    <Select
                      placeholder='شهر تولد فرزند ۴  '
                      options={options}
                      value={options.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.child4BirthCityId ? 'is-invalid' : ''}
                    />
                  )
                }}
              />

              {errors.child4BirthCityId && (
                <FormFeedback className='d-block'>{errors.child4BirthCityId.message}</FormFeedback>
              )}
            </Col>
         
            <Col lg={12} className='mt-2'>
              <Label>آدرس</Label>
              <Controller
                name='address'
                control={control}
                render={({ field }) => <Input type='textarea' {...field} />}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>چپ دست </Label>
              <Controller
                name='isRightHand'
                control={control}
                render={({ field }) => (
                  <Input type='checkbox' checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                )}
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
            {/* 📌 تصویر مدرک تحصیلی آخرین مقطع */}
            <Col lg={6}>
              <Controller
                name='lastCertificateImageId'
                control={control}
                render={({ field }) => <FileInput field={field} label='تصویر آخرین مدرک تحصیلی' />}
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
            {/* <Col md={6} className='mt-1'>
              <Button color='primary' className='w-100' type='submit' block disabled={!isValid}>
                ثبت تغییرات
              </Button>
            </Col> */}
            <Col md={12} className='mt-1'>
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
